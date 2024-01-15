"use client";
import { MainContext } from "@/components/layouts/MainContentLayout";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { addProductChoice } from "@/src/redux/slices/productSlice";
import { filter, flatten, indexOf, map, pickBy } from "lodash";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

const notificationMethods = [
  { id: "email", title: "Email" },
  { id: "sms", title: "Phone (SMS)" },
  { id: "push", title: "Push notification" },
];
type Props = {
  group: any;
};
export default function ({ group }: Props) {
  const { t } = useTranslation("trans");
  const dispatch = useAppDispatch();
  const {
    product: { selections },
  } = useAppSelector((state) => state);
  // console.log("selections====>", pickBy(selections, "choices.id"));
  return (
    <div className='py-3'>
      <div className='flex flex-1 justify-between items-center'>
        <div>
          <label className='text-base font-semibold text-gray-900'>
            {group.name} - {group.id}
          </label>
          <p className='text-sm text-gray-400 hidden'>
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
      <fieldset className='mt-4'>
        <legend className='sr-only'>Notification method</legend>
        <div className='space-y-4'>
          {map(group.choices, (c: any, i) => (
            <div key={i} className='flex justify-between items-center'>
              <div className='flex flex-row justify-start items-center space-x-2'>
                <input
                  id={c.id}
                  onChange={(e) =>
                    dispatch(
                      addProductChoice({
                        group_id: group.id,
                        choice_id: c.id,
                        qty: 1,
                        multi:
                          (group.input_type === "checkbox" &&
                            group.max_number > 1) ||
                          (group.input_input_type !== "checkbox" &&
                            group.max_number > 1),
                        required: group.selection_type !== "optional",
                        min: group.min_number,
                        max: group.max_number,
                      })
                    )
                  }
                  name={group.id}
                  value={c.id}
                  type='radio'
                  defaultChecked={
                    indexOf(
                      map(
                        flatten(map(filter(selections, "choices"), "choices")),
                        "choice_id"
                      ),
                      c.id
                    ) >= 0
                  }
                  className='h-4 w-4  border-gray-300 text-picks-dark focus:ring-picks-dark'
                />
                <label
                  htmlFor={c.id}
                  className='ps-2 block text-sm font-medium leading-6 text-gray-900'>
                  {c.name}
                </label>
              </div>
              <div>{c.price_format}</div>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
