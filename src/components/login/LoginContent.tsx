"use client";
import { useLazyLoginQuery } from "@/redux/api/authApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setAuth } from "@/redux/slices/authSlice";
import {
  showErrorToastMessage,
  showSuccessToastMessage,
} from "@/redux/slices/toastMessageSlice";
import { appLinks } from "@/src/links";
import { Locale } from "@/types/index";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/src/validations";
import { enableLoading } from "@/redux/slices/settingSlice";
import { MainContext } from "@/layouts/MainContentLayout";
import LoadingSpinner from "@/components/LoadingSpinner";
import { setToken } from "@/app/actions";

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
  const [triggerLogin] = useLazyLoginQuery();
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

  const onSubmit: SubmitHandler<Inputs> = async (body) => {
    dispatch(enableLoading());
    await triggerLogin(body, false).then((r: any) => {
      if (r && r.data) {
        dispatch(setAuth(r.data));
        setToken(r.data.api_token);
        router.replace(`/${lang}`);
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
        className={`space-y-4 ${isLoading && "hidden"}`}
      >
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900 capitalize"
          >
            {trans.email_address}
          </label>
          <div className="mt-2">
            <input
              id="email"
              {...register("email")}
              type="email"
              className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
            />
            {errors?.email?.message && (
              <span className={`text-red-700 text-xs capitalize`}>
                {errors?.email?.message}
              </span>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-900 capitalize"
          >
            {trans.password}
          </label>
          <div className="mt-2">
            <input
              id="password"
              {...register("password")}
              type="password"
              autoComplete="current-password"
              className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
            />
            {errors?.password?.message && (
              <span className={`text-red-700 text-xs capitalize`}>
                {errors?.password?.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm leading-6">
            <Link
              href={appLinks.forgetPassword(lang)}
              className="font-semibold text-expo-dark hover:text-green-700 capitalize"
            >
              {trans.forgot_password}
            </Link>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center btn-default capitalize"
          >
            {trans.sign_in}
          </button>
        </div>
      </form>

      <div className="flex flex-col justify-center gap-x-1 mt-4">
        <div>
          <p className=" text-sm leading-6 text-gray-700">
            {trans.Dont_have_an_account}
          </p>
        </div>

        <Link
          className=" text-sm leading-6 text-expo-dark"
          href={appLinks.register(lang, "visitor")}
        >
          <p>{trans.create_an_account_as_visitor}</p>
        </Link>
        <Link
          className=" text-sm leading-6 text-expo-dark"
          href={appLinks.register(lang, "company")}
        >
          <p>{trans.create_an_account_as_subscription}</p>
        </Link>
      </div>
    </div>
  );
}
