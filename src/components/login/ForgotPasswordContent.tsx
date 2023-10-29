"use client";
import {
  useLazyForgotPasswordQuery,
  useLazyLoginQuery,
} from "@/redux/api/authApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setAuth } from "@/redux/slices/authSlice";
import {
  showErrorToastMessage,
  showSuccessToastMessage,
} from "@/redux/slices/toastMessageSlice";
import { appLinks, setToken } from "@/src/constants";
import { Locale } from "@/types/index";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotPasswordSchema, loginSchema } from "@/src/validations";
import { disableLoading, enableLoading } from "@/redux/slices/settingSlice";
import { MainContext } from "@/layouts/MainContentLayout";
import LoadingSpinner from "@/components/LoadingSpinner";

type Props = {
  lang: Locale["lang"];
};
type Inputs = {
  email: string;
  password: string;
};

export default function ({ lang }: Props) {
  const trans: { [key: string]: string } = useContext(MainContext);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    appSetting: { isLoading },
  } = useAppSelector((state) => state);
  const [triggerForgotPassword] = useLazyForgotPasswordQuery();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  }: any = useForm<any>({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: {
      email: ``,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (body) => {
    dispatch(enableLoading());
    await triggerForgotPassword(body).then((r: any) => {
      if (r && r.data) {
        dispatch(showSuccessToastMessage({ content: trans.process_success }));
        dispatch(disableLoading());
        return router.push(`/${lang}`);
      } else if (r && r.error && r.error.data) {
        dispatch(
          showErrorToastMessage({
            content: `${r.error.data.message}`,
          })
        );
      }
    });
  };

  return (
    <div>
      <LoadingSpinner isLoading={isLoading} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`space-y-4 ${isLoading && "hidden"}`}>
        <div>
          <label
            htmlFor='email'
            className='block text-sm font-medium leading-6 text-gray-900 capitalize'>
            {trans.email_address}
          </label>
          <div className='mt-2'>
            <input
              id='email'
              {...register("email")}
              type='email'
              className='block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6'
            />
            {errors?.email?.message && (
              <span className={`text-red-700 text-xs capitalize`}>
                {errors?.email?.message}
              </span>
            )}
          </div>
        </div>

        <div>
          <button
            type='submit'
            className='flex w-full justify-center btn-default capitalize'>
            {trans.submit}
          </button>
        </div>
      </form>

      <div className='flex justify-center gap-x-1 mt-4'>
        <div>
          <p className=' text-sm leading-6 text-gray-700'>
            {trans.Dont_have_an_account}
          </p>
        </div>

        <Link
          className=' text-sm leading-6 text-expo-dark'
          href={appLinks.register(lang, "visitor")}>
          <p>{trans.create_an_account}</p>
        </Link>
      </div>
    </div>
  );
}
