"use client";
import { useContext } from "react";
import { MainContext } from "@/components/layouts/MainContentLayout";
import { filter, flatten, indexOf, map } from "lodash";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { addProductChoice } from "@/src/redux/slices/productSlice";

export default function ({ group }: { group: any }) {
  const trans: { [key: string]: string } = useContext(MainContext);
  const dispatch = useAppDispatch();
  const {
    product: { selections },
  } = useAppSelector((state) => state);

  return (
    <div className='py-3'>
      <div className='flex pb-2 flex-1 justify-between items-center'>
        <div className='flex flex-col '>
          <label className='text-base text-gray-900 ltr:text-left rtl:text-right'>
            {group.name} - {group.id}
          </label>
          <p className='text-sm text-gray-400 ltr:text-left rtl:text-right'>
            {trans.select_up_to} {trans.max} {group.max_number} {trans.and}{" "}
            {trans.min} {group.min_number}
          </p>
        </div>
        <div className='bg-gray-200 p-2 text-sm rounded-2xl text-gray-600 capitalize'>
          {trans[group.selection_type]}
        </div>
      </div>
      {group.choices &&
        map(group.choices, (c, i) => (
          <fieldset key={i}>
            <div className='gap-y-4 py-1 flex justify-between items-center'>
              <div className='relative flex items-start'>
                <div className='flex items-center'>
                  <input
                    id='comments'
                    aria-describedby='comments-description'
                    name={group.id}
                    onChange={(e) =>
                      dispatch(
                        addProductChoice({
                          group_id: group.id,
                          choice_id: c.id,
                          qty: 1,
                          multi: group.input_type !== "radio",
                          required: group.selection_type !== "optional",
                          min: group.min_number,
                          max: group.max_number,
                        })
                      )
                    }
                    type='checkbox'
                    checked={
                      indexOf(
                        map(
                          flatten(
                            map(filter(selections, "choices"), "choices")
                          ),
                          "choice_id"
                        ),
                        c.id
                      ) >= 0
                    }
                    className='h-4 w-4 rounded border-gray-300 text-picks-dark focus:ring-picks-dark'
                  />
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
              <div>{c.price}</div>
            </div>
          </fieldset>
        ))}
    </div>
  );
}
