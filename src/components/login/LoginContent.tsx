"use client";
import { useLoginMutation } from "@/redux/api/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/slices/authSlice";
import { showErrorToastMessage } from "@/redux/slices/toastMessageSlice";
import { appLinks } from "@/src/constants";
import { Locale } from "@/types/index";
import { first } from "lodash";
import Link from "next/link";
import { router, useRouter } from "next/navigation";
import * as React from "react";

type LoginProps = {
  lang: Locale["lang"];
  trans: { [key: string]: string };
};

export function LoginContent({ lang, trans }: LoginProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [triggerLoginQuery, { data, isSuccess, error }] = useLoginMutation();

  const loginFun = async (formData: FormData) => {
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (email && password) {
      console.log(password, email);
      await triggerLoginQuery({ password, email }).then((r: any) => {
        if (r.error) {
          dispatch(
            showErrorToastMessage({
              content: `${first(r.error.data.message)}`,
            })
          );
        } else {
          dispatch(setUser(r.data));
          return router.back();
        }
      });
    }
  };

  return (
    <div className='space-y-6'>
      <form action={loginFun} className='space-y-6'>
        <div>
          <label
            htmlFor='email'
            className='block text-sm font-medium leading-6 text-gray-900'>
            {trans.email_address}
          </label>
          <div className='mt-2'>
            <input
              id='email'
              name='email'
              type='email'
              autoComplete='email'
              required
              className='block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6'
            />
          </div>
        </div>

        <div>
          <label
            htmlFor='password'
            className='block text-sm font-medium leading-6 text-gray-900'>
            {trans.password}
          </label>
          <div className='mt-2'>
            <input
              id='password'
              name='password'
              type='password'
              autoComplete='current-password'
              required
              className='block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6'
            />
          </div>
        </div>

        <div className='flex items-center justify-between'>
          <div className='flex gap-x-3 items-center'>
            <input
              id='remember-me'
              name='remember-me'
              type='checkbox'
              className='h-4 w-4 rounded border-gray-300 checked:!bg-expo-dark focus:ring-0'
            />
            <label
              htmlFor='remember-me'
              className='block text-sm leading-6 text-gray-700'>
              {trans.remember_me_for_days}
            </label>
          </div>

          <div className='text-sm leading-6'>
            <Link
              href='#'
              className='font-semibold text-expo-dark hover:text-green-700'>
              {trans.forgot_password}
            </Link>
          </div>
        </div>

        <div>
          <button
            type='submit'
            className='flex w-full justify-center btn-color-default'>
            {trans.sign_in}
          </button>
        </div>
      </form>

      <div className='flex justify-center gap-x-1'>
        <p className=' text-sm leading-6 text-gray-700'>
          {trans.Dont_have_an_account}
        </p>
        <Link
          className=' text-sm leading-6 text-expo-dark'
          href={appLinks.register(lang, "visitor")}>
          <p>{trans.create_an_account}</p>
        </Link>
      </div>
    </div>
  );
}
