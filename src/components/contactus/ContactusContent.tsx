"use client";
import { useLazySendContactusQuery } from "@/redux/api";
import { useAppDispatch } from "@/redux/hooks";
import {
  showErrorToastMessage,
  showSuccessToastMessage,
} from "@/redux/slices/toastMessageSlice";
import { apiUrl, baseUrl } from "@/src/constants";
import { Locale } from "@/types/index";
import { FormEvent } from "react";

type Props = {
  lang: Locale["lang"];
};

export default function ({ lang }: Props) {
  const dispatch = useAppDispatch();
  const [triggerSendContactus, { data, error }] = useLazySendContactusQuery();
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const formDataObject = Object.fromEntries(formData);
    await triggerSendContactus({ lang, body: formDataObject }).then(
      (r: any) => {
        if (r.error && r.error.data) {
          dispatch(showErrorToastMessage({ content: r.error.data.message }));
        } else {
          dispatch(showSuccessToastMessage({ content: r.data?.message }));
          form.reset();
        }
      }
    );
  };

  return (
    <form onSubmit={onSubmit} method='POST' className='mt-16'>
      <div className='grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2'>
        <div className='sm:col-span-2'>
          <label
            htmlFor='name'
            className='block text-sm font-semibold leading-6 text-gray-900'>
            First name
          </label>
          <div className='mt-2.5'>
            <input
              type='text'
              name='name'
              id='name'
              autoComplete='given-name'
              className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />
          </div>
        </div>

        <div className='sm:col-span-2'>
          <label
            htmlFor='email'
            className='block text-sm font-semibold leading-6 text-gray-900'>
            Email
          </label>
          <div className='mt-2.5'>
            <input
              id='email'
              name='email'
              type='email'
              autoComplete='email'
              className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />
          </div>
        </div>

        <div className='sm:col-span-2'>
          <div className='flex justify-between text-sm leading-6'>
            <label
              htmlFor='phone'
              className='block font-semibold text-gray-900'>
              Phone
            </label>
            <p id='phone-description' className='text-gray-400'>
              Optional
            </p>
          </div>
          <div className='mt-2.5'>
            <input
              type='string'
              name='phone'
              id='phone'
              autoComplete='tel'
              aria-describedby='phone-description'
              className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />
          </div>
        </div>
        <div className='sm:col-span-2'>
          <div className='flex justify-between text-sm leading-6'>
            <label
              htmlFor='message'
              className='block text-sm font-semibold leading-6 text-gray-900'>
              How can we help you?
            </label>
            <p id='message-description' className='text-gray-400'>
              Max 500 characters
            </p>
          </div>
          <div className='mt-2.5'>
            <textarea
              id='message'
              name='message'
              rows={4}
              aria-describedby='message-description'
              className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              defaultValue={""}
            />
          </div>
        </div>
      </div>
      <div className='mt-10 flex justify-end border-t border-gray-900/10 pt-8'>
        <button
          type='submit'
          className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
          Send message
        </button>
      </div>
    </form>
  );
}
