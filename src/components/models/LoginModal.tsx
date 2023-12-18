"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import {
  enableLoading,
  toggleForgetPasswordModal,
  toggleLoginModal,
  toggleRegisterModal,
} from "@/src/redux/slices/settingSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/src/validations";
import {
  showErrorToastMessage,
  showSuccessToastMessage,
} from "@/src/redux/slices/toastMessageSlice";
import { setAuth } from "@/app/actions";
import { useRouter } from "next/navigation";
import { useLazyLoginQuery } from "@/src/redux/api/authApi";
import { MainContext } from "@/components/layouts/MainContentLayout";
import LoadingSpinner from "@/components/LoadingSpinner";
import { AppQueryResult, Country } from "@/src/types/queries";
import {
  useGetCountriesQuery,
  useLazyGetCountriesQuery,
} from "@/src/redux/api/countryApi";
import { EyeIcon, XMarkIcon } from "@heroicons/react/24/outline";

type Inputs = {
  phone: string;
  phone_country_code: string;
  password: string;
  session_id?: string;
};

export default function () {
  const trans: { [key: string]: string } = useContext(MainContext);
  const {
    appSetting: { showLoginModal, isLoading, session_id },
    locale: { lang },
    country: { code },
  } = useAppSelector((state) => state);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState<"text" | "password">(
    "password"
  );
  const [triggerLogin] = useLazyLoginQuery();
  const { data: countries, isSuccess: countriesSuccess } =
    useGetCountriesQuery();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
    getValues,
  }: any = useForm<any>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      phone_country_code: code,
      phone: ``,
      password: ``,
      session_id: session_id,
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (body) => {
    dispatch(enableLoading());
    await triggerLogin(body, false).then((r: any) => {
      if (r && r.error.data) {
        dispatch(
          showErrorToastMessage({
            content: `${r.error.data.message}`,
          })
        );
      } else {
        setAuth(JSON.stringify(r.data.data));
        dispatch(showSuccessToastMessage({ content: trans.process_success }));
        dispatch(toggleLoginModal());
        return router.replace(`/${lang}`);
      }
    });
  };

  const toggleShowPassword = () =>
    setShowPassword(showPassword === "text" ? "password" : "text");

  return (
    <Transition appear show={showLoginModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => dispatch(toggleLoginModal())}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white py-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  <div className=" capitalize flex flex-row justify-center items-center border-b border-gray-200 pb-4">
                    {trans.login}
                    <XMarkIcon
                      className="absolute ltr:left-4 rtl:right-4 w-6 h-6 text-gray-600"
                      onClick={() => dispatch(toggleLoginModal())}
                    />
                  </div>
                </Dialog.Title>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                  <LoadingSpinner isLoading={isLoading} />
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={`space-y-4 ${isLoading && "hidden"}`}
                  >
                    <div>
                      <label
                        id="phone_country_code"
                        className="ltr:text-left rtl:text-right block text-sm font-medium leading-6 text-gray-900 capitalize"
                      >
                        {trans.phone_number}
                      </label>
                      <div className="mt-2">
                        <div className="flex flex-row gap-x-3">
                          <select
                            id="phone_country_code"
                            defaultValue={code}
                            {...register("phone_country_code")}
                            className="block w-1/3 rounded-md border-0 py-2.5 text-gray-900 shadow-sm bg-stone-100 focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:max-w-xs sm:text-sm sm:leading-6"
                          >
                            {countriesSuccess &&
                              countries.data?.map((c: Country, i: number) => (
                                <option value={c.code} key={i}>
                                  {`${c.code} (${c.country_code})`}
                                </option>
                              ))}
                          </select>
                          <input
                            id="phone"
                            {...register("phone")}
                            type="text"
                            className="ltr:text-left rtl:text-right block w-full rounded-md border-0 py-2.5 shadow-sm bg-stone-100 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6"
                          />
                        </div>
                        {errors?.phone?.message && (
                          <span className={`text-red-700 text-xs capitalize`}>
                            {trans[errors?.phone?.message]}
                          </span>
                        )}
                        {errors?.phone_country_code?.message && (
                          <span className={`text-red-700 text-xs capitalize`}>
                            {trans[errors?.phone_country_code?.message]}
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
                      <div className="mt-2 relative flex flex-row">
                        <input
                          id="password"
                          {...register("password")}
                          type={showPassword}
                          className="ltr:text-left rtl:text-right block w-full rounded-md border-0 py-2.5 shadow-sm bg-stone-100 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6"
                        />
                        <EyeIcon
                          className="absolute top-1.5 ltr:right-4 rtl:left-4 w-6 h-6 text-gray-600 hover:text-gray-900"
                          onClick={() => toggleShowPassword()}
                        />
                      </div>
                      {errors?.password?.message && (
                        <span className={`text-red-700 text-xs capitalize`}>
                          {trans[errors?.password?.message]}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm leading-6">
                        <button
                          type="button"
                          onClick={() => dispatch(toggleForgetPasswordModal())}
                          className="font-semibold text-expo-dark hover:text-green-700 capitalize"
                        >
                          {trans.forgot_password}
                        </button>
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

                  <div className="capitalize mt-10 text-center text-sm text-gray-500">
                    {trans.dont_have_an_account}
                    <button
                      onClick={() => dispatch(toggleRegisterModal())}
                      className="capitalize px-2 font-semibold leading-6 text-picks-dark hover:text-gray-500"
                    >
                      {trans.signup}
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
