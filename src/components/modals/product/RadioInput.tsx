"use client";
import { MainContext } from "@/components/layouts/MainContentLayout";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { addProductChoice } from "@/src/redux/slices/productSlice";
import { pickBy } from "lodash";
import { useContext } from "react";

const notificationMethods = [
  { id: "email", title: "Email" },
  { id: "sms", title: "Phone (SMS)" },
  { id: "push", title: "Push notification" },
];
type Props = {
  group: any;
};
export default function ({ group }: Props) {
  const trans: { [key: string]: string } = useContext(MainContext);
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
            {group.name}
          </label>
          <p className='text-sm text-gray-400 hidden'>
            Select up to {group.max_number} & min {group.min_number}
          </p>
        </div>
        <div className='bg-gray-200 p-2 text-sm rounded-2xl text-gray-600 capitalize'>
          {trans[group.selection_type]}
        </div>
      </div>
      <fieldset className='mt-4'>
        <legend className='sr-only'>Notification method</legend>
        <div className='space-y-4'>
          {group.choices.map((c: any) => (
            <div key={c.id} className='flex justify-between items-center'>
              <div className='flex flex-row justify-start items-center space-x-2'>
                <input
                  id={c.id}
                  onChange={(e) =>
                    dispatch(
                      addProductChoice({
                        group_id: group.id,
                        choice_id: c.id,
                        qty: 1,
                        multi: group.input_type !== "radio",
                      })
                    )
                  }
                  name={group.id}
                  value={c.id}
                  type='radio'
                  defaultChecked={c.id === "email"}
                  className='h-4 w-4 border-gray-300 text-picks-dark focus:ring-picks-dark'
                />
                <label
                  htmlFor={c.id}
                  className='ml-3 block text-sm font-medium leading-6 text-gray-900'>
                  {c.name}
                </label>
              </div>
              <div>{c.price}</div>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
