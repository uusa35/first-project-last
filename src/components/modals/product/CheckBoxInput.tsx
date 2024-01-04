"use client";
import { useContext } from "react";
import { MainContext } from "@/components/layouts/MainContentLayout";

export default function ({ group }: { group: any }) {
  const trans: { [key: string]: string } = useContext(MainContext);
  return (
    <div className='py-3'>
      <div className='flex flex-1 justify-between items-center'>
        <div>
          <label className='text-base font-semibold text-gray-900'>
            {group.name}
          </label>
          <p className='text-sm text-gray-400'>
            Select up to {group.max_number} & min {group.min_number}
          </p>
        </div>
        <div className='bg-gray-200 p-2 text-sm rounded-2xl text-gray-600 capitalize'>
          {trans[group.selection_type]}
        </div>
      </div>
      <fieldset className='mt-4'>
        <legend className='sr-only'>Notifications</legend>
        <div className='space-y-5'>
          <div className='relative flex items-start'>
            <div className='flex h-6 items-center'>
              <input
                id='comments'
                aria-describedby='comments-description'
                name='comments'
                type='checkbox'
                className='h-4 w-4 rounded border-gray-300 text-picks-dark focus:ring-picks-dark'
              />
            </div>
            <div className='ml-3 text-sm leading-6'>
              <label htmlFor='comments' className='font-medium text-gray-900'>
                New comments
              </label>{" "}
              <span id='comments-description' className='text-gray-500'>
                <span className='sr-only'>New comments </span>
                so you always know what's happening.
              </span>
            </div>
          </div>
          <div className='relative flex items-start'>
            <div className='flex h-6 items-center'>
              <input
                id='candidates'
                aria-describedby='candidates-description'
                name='candidates'
                type='checkbox'
                className='h-4 w-4 rounded border-gray-300 text-picks-dark focus:ring-picks-dark'
              />
            </div>
            <div className='ml-3 text-sm leading-6'>
              <label htmlFor='candidates' className='font-medium text-gray-900'>
                New candidates
              </label>{" "}
              <span id='candidates-description' className='text-gray-500'>
                <span className='sr-only'>New candidates </span>
                who apply for any open postings.
              </span>
            </div>
          </div>
          <div className='relative flex items-start'>
            <div className='flex h-6 items-center'>
              <input
                id='offers'
                aria-describedby='offers-description'
                name='offers'
                type='checkbox'
                className='h-4 w-4 rounded border-gray-300 text-picks-dark focus:ring-picks-dark'
              />
            </div>
            <div className='ml-3 text-sm leading-6'>
              <label htmlFor='offers' className='font-medium text-gray-900'>
                Offers
              </label>{" "}
              <span id='offers-description' className='text-gray-500'>
                <span className='sr-only'>Offers </span>
                when they are accepted or rejected by candidates.
              </span>
            </div>
          </div>
        </div>
      </fieldset>
    </div>
  );
}
