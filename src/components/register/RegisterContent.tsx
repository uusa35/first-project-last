"use client";
import { MainContext } from "@/layouts/MainContentLayout";
import { useRegisterVisitorMutation } from "@/redux/api/authApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  showErrorToastMessage,
  showSuccessToastMessage,
} from "@/redux/slices/toastMessageSlice";
import { appLinks, setToken } from "@/src/constants";
import { Locale } from "@/types/index";
import { Role } from "@/types/queries";
import { first } from "lodash";
import Link from "next/link";
import { useContext } from "react";

type Props = {
  role: Role["name"];
};

export function RegisterContent({ role }: Props) {
  const trans: { [key: string]: string } = useContext(MainContext);
  const {
    locale: { lang },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const [triggerRegisterVisitorQuery, { data, isSuccess, error }] =
    useRegisterVisitorMutation();

  const createAccountFun = async (formData: FormData) => {
    const name = formData.get("name")?.toString();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const password_confirmation = formData.get("confirm_password")?.toString();

    if (email && password && password_confirmation && name) {
      // console.log(password, email);
      await triggerRegisterVisitorQuery({
        name,
        password,
        email,
        password_confirmation,
        country_id: 1,
        role,
      }).then((r: any) => {
        if (r.error) {
          dispatch(
            showErrorToastMessage({
              content: `${first(r.error.data.message)}`,
            })
          );
        } else {
          // set token cookie
          setToken(r.data.api_token);
          dispatch(
            showSuccessToastMessage({
              content: `${trans.registered_successfully}`,
            })
          );
          // navigate based on role to home if visitor and to complete data if company
        }
      });
    }
  };
  return (
    <div className='mt-10 space-y-6'>
      <form action={createAccountFun} className='space-y-6'>
        <div>
          <label
            htmlFor='name'
            className='block text-sm font-medium leading-6 text-gray-900 capitalize'>
            {trans.name} *
          </label>
          <div className='mt-2'>
            <input
              id='name'
              name='name'
              type='name'
              autoComplete='name'
              required
              className='block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6'
            />
          </div>
        </div>

        <div>
          <label
            htmlFor='email'
            className='block text-sm font-medium leading-6 text-gray-900 capitalize'>
            {trans.email_address} *
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
            className='block text-sm font-medium leading-6 text-gray-900 capitalize'>
            {trans.password} *
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

        <div>
          <label
            htmlFor='confirm_password'
            className='block text-sm font-medium leading-6 text-gray-900 capitalize'>
            {trans.confirm_password} *
          </label>
          <div className='mt-2'>
            <input
              id='confirm_password'
              name='confirm_password'
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
              id='Terms_conditions'
              name='Terms_conditions'
              type='checkbox'
              className='h-4 w-4 rounded border-gray-300 checked:!bg-expo-dark focus:ring-0'
            />
            <label
              htmlFor='Terms_conditions'
              className='block text-sm leading-6 text-gray-700'>
              {trans.agree_to}
              <Link
                href={appLinks.terms(lang)}
                className='font-semibold text-expo-dark hover:text-green-700 px-1'>
                {trans.the_terms_and_conditions}
              </Link>
            </label>
          </div>
        </div>

        <div>
          <button
            type='submit'
            className='flex w-full justify-center btn-default'>
            {trans.create_an_account}
          </button>
        </div>
      </form>

      <div className='flex justify-center gap-x-1'>
        <p className=' text-sm leading-6 text-gray-700'>
          {trans.already_have_an_account}
        </p>
        <Link
          className=' text-sm leading-6 text-expo-dark'
          href={appLinks.login(lang)}>
          <p>{trans.sign_in}</p>
        </Link>
      </div>
    </div>
  );
}
