"use client";
import { useContext } from "react";
import { MainContext } from "@/components/layouts/MainContentLayout";
import { filter, flatten, indexOf, map, pick, pickBy } from "lodash";
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
      <div className='flex flex-1 justify-between items-center'>
        <div>
          <label className='text-base font-semibold text-gray-900'>
            {group.name}
          </label>
          <p className='text-sm text-gray-400'>
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
            <div className='space-y-5 flex justify-between items-center'>
              <div className='relative flex items-start'>
                <div className='flex h-6 items-center'>
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
                <div className='ml-3 text-sm leading-6'>
                  <label
                    htmlFor='comments'
                    className='font-medium text-gray-900'>
                    {c.name}
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
