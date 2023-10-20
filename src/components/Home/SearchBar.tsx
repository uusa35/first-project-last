"use client"
import * as React from 'react';

type Props={
  trans:{[key:string]:string}
}

export function SearchBar ({trans}: Props) {
  return (
    <div className='bg-white py-12 sm:py-12'>
        <div className='mx-auto max-w-7xl'>
          <div className='relative isolate overflow-hidden  px-6 py-14 sm:rounded-3xl sm:px-24 xl:py-32'>
            <h2 className='mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-black sm:text-4xl'>
              {trans.browse_the_companies_participating_in_the_exhibition}
            </h2>

            <form className='mx-auto mt-10 flex max-w-2xl gap-x-4'>
              <label htmlFor='email-address' className='sr-only'>
                Email address
              </label>
              <input
                id='email-address'
                name='email'
                type='email'
                autoComplete='email'
                required
                className='min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 h-14 text-black bg-gray-100 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6'
                placeholder={trans.find_the_interface}
              />
              <button
                type='submit'
                className='flex-none rounded-md bg-green-900 text-white px-3.5 py-2.5 text-sm font-semibold  shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'>
                Search Now
              </button>
            </form>
          </div>
        </div>
      </div>
  );
}
