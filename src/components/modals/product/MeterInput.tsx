"use client";
import { useContext, useState } from "react";
import { MainContext } from "@/components/layouts/MainContentLayout";
import { filter, first, flatten, indexOf, isUndefined, map } from "lodash";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { addProductChoice } from "@/src/redux/slices/productSlice";
import { useTranslation } from "react-i18next";

export default function ({ group }: { group: any }) {
  const { t } = useTranslation("trans");
  const [quantity, setQuantity] = useState<number>(0);

  const dispatch = useAppDispatch();
  const {
    product: { selections },
  } = useAppSelector((state) => state);
  // console.log("selections", selections);

  const meterBtn = (g: any, c: any, type: string) => {
    const currentChoice = first(
      filter(map(selections, "choices"), (choice) => choice.id === c.id)
    );
    // console.log("currentChoice", currentChoice);
    // console.log("the choice", c);
    if (type === "sub") {
      return (
        <button
          // disabled={!c || currentChoice?.quantity < c.quantity}
          onClick={() =>
            dispatch(
              addProductChoice({
                group_id: g.id,
                choice_id: c.id,
                qty: !isUndefined(currentChoice)
                  ? currentChoice.quantity - 1 >= g.min_number
                    ? currentChoice.quantity - 1
                    : 1
                  : 0,
                multi: true,
                required: g.selection_type !== "optional",
                min: g.min_number,
                max: g.max_number,
              })
            )
          }
          className={`${
            currentChoice?.quantity < c.quantity && `opacity-60`
          } bg-picks-dark  flex justify-center items-center text-white w-6 h-6 rounded-full hover:bg-picks-light`}>
          -
        </button>
      );
    } else {
      console.log(
        "adding",
        c.id + !isUndefined(currentChoice) &&
          currentChoice?.quantity >= g.max_number
      );
      return (
        <button
          disabled={
            !isUndefined(currentChoice) &&
            currentChoice?.quantity >= g.max_number
          }
          onClick={() =>
            dispatch(
              addProductChoice({
                group_id: g.id,
                choice_id: c.id,
                qty: !isUndefined(currentChoice)
                  ? currentChoice.quantity + 1 <= g.max_number
                    ? currentChoice.quantity + 1
                    : 1
                  : 1,
                multi: true,
                required: g.selection_type !== "optional",
                min: g.min_number,
                max: g.max_number,
              })
            )
          }
          className={`${
            currentChoice &&
            currentChoice?.quantity >= g.max_number &&
            `bg-red-600`
          } bg-picks-dark  flex justify-center items-center text-white w-6 h-6 rounded-full hover:bg-picks-light`}>
          +
        </button>
      );
    }
  };

  return (
    <div className='py-3'>
      <div className='flex pb-2 flex-1 justify-between items-center'>
        <div className='flex flex-col '>
          <label className='text-base text-gra)y-900 ltr:text-left rtl:text-right'>
            {group.name} - {group.id} - {group.input_type}
          </label>
          <p className='text-sm text-gray-400 ltr:text-left rtl:text-right'>
            {t("select_up_to", {
              max: group.max_number,
              min: group.min_number,
            })}
          </p>
        </div>
        <div className='bg-gray-200 p-2 text-sm rounded-2xl text-gray-600 capitalize'>
          {t(group.selection_type)}
        </div>
      </div>
      {group.choices &&
        map(group.choices, (c, i) => {
          // console.log(
          //   "reult",

          //   first(
          //     filter(
          //       flatten(map(selections, "choices")),
          //       (choice) => choice.choice_id === c.id
          //     )
          //   )
          // );
          return (
            <fieldset key={i}>
              <div className='gap-y-4 py-1 flex justify-between items-center'>
                <div className='relative flex items-start'>
                  <div className='flex items-center'>
                    <div className={`flex flex-row gap-x-2`}>
                      {meterBtn(group, c, "add")}
                      <div className='flex justify-center items-center text-black w-6 h-6 rounded-full'>
                        {first(
                          filter(
                            flatten(map(selections, "choices")),
                            (choice) => choice.choice_id === c.id
                          )
                        )?.quantity ?? 0}
                      </div>
                      {meterBtn(group, c, "sub")}
                    </div>
                  </div>
                  <div className='ps-2 text-sm leading-6'>
                    <label
                      htmlFor='comments'
                      className='font-medium text-gray-900'>
                      {c.name} - {c.id}
                    </label>{" "}
                    <span className='text-gray-500 hidden'>
                      <span className='sr-only'>New comments </span>
                      so you always know what's happening.
                    </span>
                  </div>
                </div>
                <div>{c.price_format}</div>
              </div>
            </fieldset>
          );
        })}
    </div>
  );
}
