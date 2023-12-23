"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import {
  enableLoading,
  toggleForgetPasswordModal,
  toggleRegisterModal,
  toggleVerficationModal,
} from "@/src/redux/slices/settingSlice";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, verificySchema } from "@/src/validations";
import {
  showErrorToastMessage,
  showSuccessToastMessage,
} from "@/src/redux/slices/toastMessageSlice";
import { getAuth, setAuth } from "@/app/actions";
import { useRouter } from "next/navigation";
import {
  useLazyLoginQuery,
  useLazyResendOtpQuery,
  useLazyVerifyQuery,
} from "@/src/redux/api/authApi";
import { MainContext } from "@/components/layouts/MainContentLayout";
import LoadingSpinner from "@/components/LoadingSpinner";
import { AppQueryResult, Country } from "@/src/types/queries";
import {
  useGetCountriesQuery,
  useLazyGetCountriesQuery,
} from "@/src/redux/api/countryApi";
import { EyeIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { map, range } from "lodash";
import OtpInput from "react18-input-otp";
import { toEn } from "@/src/constants";

type Inputs = {
  phone: string;
  phone_country_code: string;
  code: string;
  type: "register" | "reset";
};

export default function () {
  const trans: { [key: string]: string } = useContext(MainContext);
  const {
    appSetting: { showVerificationModal, isLoading, session_id },
    locale: { lang },
    country: {
      code: { calling_code },
    },
  } = useAppSelector((state) => state);
  const [otp, setOtp] = useState<string>(``);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [triggerVerifiy] = useLazyVerifyQuery();
  const [triggerResendOtp] = useLazyResendOtpQuery();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
    getValues,
    setValues,
    setValue,
    control,
  }: any = useForm<any>({
    resolver: yupResolver(verificySchema),
    defaultValues: {
      // phone_country_code: calling_code,
      // phone: ``,
      code: ``,
      type: "register",
    },
  });

  const closeModal = () => {
    dispatch(toggleVerficationModal());
    reset();
  };
  const onSubmit: SubmitHandler<Inputs> = async (body) => {
    let auth = await getAuth();
    // console.log({ body });
    dispatch(enableLoading());
    await triggerVerifiy(
      {
        ...body,
        phone_country_code: auth.phone_country_code,
        phone: auth.phone,
      },
      false
    ).then((r: any) => {
      if (r && r.error?.data) {
        dispatch(
          showErrorToastMessage({
            content: `${r.error?.data?.message}`,
          })
        );
      } else {
        // console.log({ r });
        setAuth(JSON.stringify(r.data.data));
        dispatch(showSuccessToastMessage({ content: r.data?.message }));
        // dispatch(toggleVerficationModal());
        closeModal();
        return router.replace(`/${lang}`);
      }
    });
  };

  // const handleChangeOtp = (enteredOtp: string) => {
  //   console.log({ enteredOtp });
  //   setOtp(toEn(enteredOtp));
  //   setValues("code", enteredOtp);
  // };

  // console.log({ errors }, getValues("code"));

  const getPhone = useMemo(async () => {
    let auth = await getAuth();
    return (
      <span className="text-black font-semibold">
        {auth?.phone_country_code} {auth?.phone}
      </span>
    );
  }, []);

  
  const ResendOtp = async () => {
    let auth = await getAuth();
    triggerResendOtp({
      phone_country_code: auth.phone_country_code,
      phone: auth.phone,
      type: "register",
    }).then((r: any) => {
      // console.log({ r });

      if (r && r.error?.data) {
        dispatch(
          showErrorToastMessage({
            content: `${r.error?.data?.message}`,
          })
        );
      } else {
        dispatch(
          showSuccessToastMessage({
            content: `${r?.data?.message}`,
          })
        );
      }
    });
  };

  return (
    <Transition appear show={showVerificationModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                  <div className=" capitalize flex flex-row justify-center items-center border-b border-gray-200 pb-4 text-xl">
                    {trans.verification_code}
                    <XMarkIcon
                      className="absolute ltr:left-4 rtl:right-4 w-6 h-6 text-gray-600"
                      onClick={closeModal}
                    />
                  </div>
                </Dialog.Title>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm px-5 md:px-0">
                  <LoadingSpinner isLoading={isLoading} />
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={`space-y-4 ${isLoading && "hidden"}`}
                  >
                    <div>
                      <p className="font-semibold mb-3 text-xl">
                        {trans.verification_code}
                      </p>
                      <p className="text-picks-text-gray text-base">
                        {
                          trans.plz_enter_the_6_digits_code_that_was_sent_to_number
                        }
                        {getPhone}
                        {/* {getAuth().then((r) => {
                          return (
                            <span className="text-black font-semibold">
                              {r?.phone_country_code} {r?.phone}
                            </span>
                          );
                        })} */}
                      </p>
                    </div>
                    <div>
                      <div className="mt-5 flex flex-row">
                        <div className="flex flex-row justify-between items-center gap-x-2">
                          <Controller
                            render={({
                              field: { onChange, onBlur, value },
                            }) => {
                              // console.log({ value }, getValues("code"));
                              return (
                                <OtpInput
                                  value={value}
                                  onChange={(e: string) => {
                                    // console.log(e);
                                    setValue("code", e);
                                    return onChange(e);
                                  }}
                                  numInputs={6}
                                  successStyle="success"
                                  inputStyle={{
                                    backgroundColor: "#F5F5F5",
                                    width: "100%",
                                    height: "auto",
                                    aspectRatio: "1/1",
                                    // margin: "10px",
                                    borderRadius: "10px",
                                    caretColor: "#DC2626",
                                    // fontSize: "30px",
                                    outline: "none",
                                    borderColor: "transparent",
                                  }}
                                  containerStyle={{
                                    justifyContent: "center",
                                    columnGap: "1rem",
                                  }}
                                  inputProps={{ name: "code" }}
                                />
                              );
                            }}
                            name="code"
                            control={control}
                          />
                        </div>
                        {errors?.code?.message && (
                          <span className={`text-red-700 text-xs capitalize`}>
                            {trans[errors?.password?.message]}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* <div className="flex items-center justify-between">
                      <div className="text-sm leading-6">
                        <button
                          type="button"
                          onClick={() => dispatch(toggleForgetPasswordModal())}
                          className="font-semibold text-expo-dark hover:text-green-700 capitalize"
                        >
                          {trans.forgot_password}
                        </button>
                      </div>
                    </div> */}

                    <div>
                      <button
                        type="submit"
                        className="flex w-full justify-center btn-default capitalize"
                      >
                        {trans.confirm}
                      </button>
                    </div>
                  </form>
                  <div className="capitalize mt-10 text-center text-sm text-gray-500">
                    {trans.didnot_receive_the_code_yet}
                    <button
                      onClick={ResendOtp}
                      className="capitalize px-2 font-semibold leading-6 text-picks-dark hover:text-gray-500"
                    >
                      {trans.resend}
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
