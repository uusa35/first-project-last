"use client";
import { MainContext } from "@/layouts/MainContentLayout";
import { useRegisterVisitorMutation } from "@/redux/api/authApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setAuth } from "@/redux/slices/authSlice";
import {
  showErrorToastMessage,
  showSuccessToastMessage,
} from "@/redux/slices/toastMessageSlice";
import { setToken } from "@/app/actions";
import { appLinks } from "@/src/links";
import { registerSchema } from "@/src/validations";
import { Country, Role } from "@/types/queries";
import { yupResolver } from "@hookform/resolvers/yup";
import { first } from "lodash";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Props = {
  role: Role["name"];
  country: Country;
};
type FormValues = {
  name: string;
  password: string;
  email: string;
  password_confirmation: string;
};

export function RegisterContent({ role, country }: Props) {
  const router = useRouter();
  const trans: { [key: string]: string } = useContext(MainContext);
  const {
    locale: { lang },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const [triggerRegisterVisitorQuery, { data, isSuccess, error }] =
    useRegisterVisitorMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: ``,
      email: ``,
      password: ``,
      password_confirmation: ``,
    },
  });

  const createAccount: SubmitHandler<FormValues> = async (data) => {
    await triggerRegisterVisitorQuery({
      ...data,
      country_id: country.id,
      role,
    }).then((r: any) => {
      if (r && r.data) {
        dispatch(
          showSuccessToastMessage({
            content: `${trans.registered_successfully}`,
          })
        );
        dispatch(setAuth(r.data));
        setToken(r.data.api_token);
        if (role === "visitor") router.push(appLinks.home(lang));
        else {
          router.push(appLinks.account(lang, role, r.data.id));
        }
      } else if (r && r.error && r.error.data) {
        dispatch(
          showErrorToastMessage({
            content: `${first(r.error.data.message)}`,
          })
        );
      }
    });
  };
  return (
    <div className='mt-10 space-y-6'>
      <form onSubmit={handleSubmit(createAccount)} className='space-y-6'>
        <div>
          <label
            htmlFor='name'
            className='block text-sm font-medium leading-6 text-gray-900 capitalize'>
            {trans.name} *
          </label>
          <div className='mt-2'>
            <input
              {...register("name")}
              id='name'
              type='text'
              autoComplete='name'
              className='block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6'
            />
          </div>
          {errors?.name?.message && (
            <span className={`text-red-700 text-xs capitalize`}>
              {errors?.name?.message}
            </span>
          )}
        </div>

        <div>
          <label
            htmlFor='email'
            className='block text-sm font-medium leading-6 text-gray-900 capitalize'>
            {trans.email_address} *
          </label>
          <div className='mt-2'>
            <input
              {...register("email")}
              id='email'
              type='email'
              autoComplete='email'
              className='block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6'
            />
          </div>
          {errors?.email?.message && (
            <span className={`text-red-700 text-xs capitalize`}>
              {errors?.email?.message}
            </span>
          )}
        </div>

        <div>
          <label
            htmlFor='password'
            className='block text-sm font-medium leading-6 text-gray-900 capitalize'>
            {trans.password} *
          </label>
          <div className='mt-2'>
            <input
              {...register("password")}
              type='password'
              id='password'
              autoComplete='current-password'
              className='block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6'
            />
          </div>
          {errors?.password?.message && (
            <span className={`text-red-700 text-xs capitalize`}>
              {errors?.password?.message}
            </span>
          )}
        </div>

        <div>
          <label
            htmlFor='password_confirmation'
            className='block text-sm font-medium leading-6 text-gray-900 capitalize'>
            {trans.confirm_password} *
          </label>
          <div className='mt-2'>
            <input
              {...register("password_confirmation")}
              id='password_confirmation'
              type='password'
              autoComplete='current-password'
              className='block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6'
            />
          </div>
          {errors?.password_confirmation?.message && (
            <span className={`text-red-700 text-xs capitalize`}>
              {errors?.password_confirmation?.message}
            </span>
          )}
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
