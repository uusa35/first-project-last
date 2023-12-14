"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import {
  enableLoading,
  toggleForgetPasswordModal,
  toggleRegisterModal,
  toggleVerficationModal,
} from "@/src/redux/slices/settingSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, verificySchema } from "@/src/validations";
import {
  showErrorToastMessage,
  showSuccessToastMessage,
} from "@/src/redux/slices/toastMessageSlice";
import { setAuth } from "@/app/actions";
import { useRouter } from "next/navigation";
import { useLazyLoginQuery, useLazyVerifyQuery } from "@/src/redux/api/authApi";
import { MainContext } from "@/components/layouts/MainContentLayout";
import LoadingSpinner from "@/components/LoadingSpinner";
import { AppQueryResult, Country } from "@/src/types/queries";
import { useLazyGetCountriesQuery } from "@/src/redux/api/countryApi";
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
  const [
    triggerGetCountries,
    { data: countries, isSuccess: countriesSuccess },
  ] = useLazyGetCountriesQuery<{
    data: AppQueryResult<Country[]>;
    isSuccess: boolean;
  }>();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
    getValues,
    setValues,
  }: any = useForm<any>({
    resolver: yupResolver(verificySchema),
    defaultValues: {
      phone_country_code: calling_code,
      phone: ``,
      code: ``,
      type: "register",
    },
  });

  useEffect(() => {
    triggerGetCountries();
  }, []);

  const onSubmit: SubmitHandler<Inputs> = async (body) => {
    dispatch(enableLoading());
    await triggerVerifiy(body, false).then((r: any) => {
      if (r && r.error.data) {
        dispatch(
          showErrorToastMessage({
            content: `${r.error.data.message}`,
          })
        );
      } else {
        setAuth(JSON.stringify(r.data.data));
        dispatch(showSuccessToastMessage({ content: trans.process_success }));
        dispatch(toggleVerficationModal());
        return router.replace(`/${lang}`);
      }
    });
  };

  const handleChangeOtp = (enteredOtp: string) => {
    setOtp(toEn(enteredOtp));
    setValues("code", otp);
  };

  return (
    <Transition appear show={showVerificationModal} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-10'
        onClose={() => dispatch(toggleVerficationModal())}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <div className='fixed inset-0 bg-black/25' />
        </Transition.Child>
        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'>
              <Dialog.Panel className='w-full max-w-lg transform overflow-hidden rounded-2xl bg-white py-6 text-left align-middle shadow-xl transition-all'>
                <Dialog.Title
                  as='h3'
                  className='text-lg font-medium leading-6 text-gray-900'>
                  <div className=' capitalize flex flex-row justify-center items-center border-b border-gray-200 pb-4'>
                    {trans.login}
                    <XMarkIcon
                      className='absolute ltr:left-4 rtl:right-4 w-6 h-6 text-gray-600'
                      onClick={() => dispatch(toggleVerficationModal())}
                    />
                  </div>
                </Dialog.Title>
                <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                  <LoadingSpinner isLoading={isLoading} />
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={`space-y-4 ${isLoading && "hidden"}`}>
                    <div>
                      <h1>OTP Verification</h1>
                      <p>
                        {
                          trans.plz_enter_the_6_digits_code_that_was_sent_to_number
                        }{" "}
                        +9656577
                      </p>
                    </div>
                    <div>
                      <div className='mt-2 flex flex-row'>
                        <div className='flex flex-row justify-between items-center gap-x-2'>
                          <OtpInput
                            value={otp}
                            onChange={handleChangeOtp}
                            numInputs={4}
                            successStyle='success'
                            inputStyle={{
                              backgroundColor: "#F5F5F5",
                              width: "70px",
                              height: "70px",
                              margin: "10px",
                              borderRadius: "10px",
                              caretColor: "#DC2626",
                              fontSize: "30px",
                              outline: "none",
                              borderColor: "transparent",
                            }}
                            containerStyle={{
                              justifyContent: "center",
                            }}
                          />
                        </div>
                        {errors?.code?.message && (
                          <span className={`text-red-700 text-xs capitalize`}>
                            {trans[errors?.password?.message]}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className='flex items-center justify-between'>
                      <div className='text-sm leading-6'>
                        <button
                          type='button'
                          onClick={() => dispatch(toggleForgetPasswordModal())}
                          className='font-semibold text-expo-dark hover:text-green-700 capitalize'>
                          {trans.forgot_password}
                        </button>
                      </div>
                    </div>
                    <div>
                      <button
                        type='submit'
                        className='flex w-full justify-center btn-default capitalize'>
                        {trans.sign_in}
                      </button>
                    </div>
                  </form>
                  <div className='capitalize mt-10 text-center text-sm text-gray-500'>
                    {trans.dont_have_an_account}
                    <button
                      onClick={() => dispatch(toggleVerficationModal())}
                      className='capitalize px-2 font-semibold leading-6 text-picks-dark hover:text-gray-500'>
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
