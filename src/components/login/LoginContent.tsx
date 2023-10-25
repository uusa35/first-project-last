"use client";
import { useLoginMutation } from "@/redux/api/authApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUser } from "@/redux/slices/authSlice";
import { showErrorToastMessage } from "@/redux/slices/toastMessageSlice";
import { appLinks } from "@/src/constants";
import { Locale } from "@/types/index";
import { first } from "lodash";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/src/validations";
import { disableLoading, enableLoading } from "@/redux/slices/settingSlice";
import { MainContext } from "../MainContentLayout";
import LoadingSpinner from "../LoadingSpinner";

type LoginProps = {
  lang: Locale["lang"];
  trans: { [key: string]: string };
};
type Inputs = {
  email: string;
  password: string;
};

export function LoginContent({ lang }: LoginProps) {
  const trans: { [key: string]: string } = useContext(MainContext);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    appSetting: { isLoading },
  } = useAppSelector((state) => state);
  const [triggerLoginQuery, { data, isSuccess, error }] = useLoginMutation();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  }: any = useForm<any>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: ``,
      password: ``,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (body: any) => {
    dispatch(enableLoading());
    const { email, password } = body;
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
          reset();
          router.back();
        }
        dispatch(disableLoading());
      });
    }
  };

  return (
    <div className='space-y-6'>
      <LoadingSpinner isLoading={isLoading} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`space-y-6 ${isLoading && "hidden"}`}>
        <div>
          <label
            htmlFor='email'
            className='block text-sm font-medium leading-6 text-gray-900'>
            {trans.email_address}
          </label>
          <div className='mt-2'>
            <input
              id='email'
              {...register("name")}
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
              {...register("name")}
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
