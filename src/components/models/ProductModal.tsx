"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import {
  enableLoading,
  hideProductModal,
  toggleForgetPasswordModal,
  toggleProductModal,
  toggleRegisterModal,
  toggleVerficationModal,
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
import {
  useLazyLoginQuery,
  useLazyResendOtpQuery,
} from "@/src/redux/api/authApi";
import { MainContext } from "@/components/layouts/MainContentLayout";
import LoadingSpinner from "@/components/LoadingSpinner";
import { AppQueryResult, Country, Product } from "@/src/types/queries";
import { useGetCountriesQuery } from "@/src/redux/api/countryApi";
import { EyeIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { setAuthentication } from "@/src/redux/slices/authSlice";
import {
  useGetProductQuery,
  useLazyGetProductQuery,
} from "@/src/redux/api/productApi";

type Inputs = {
  phone: string;
  phone_country_code: string;
  password: string;
  session_id?: string;
};

export default function () {
  const trans: { [key: string]: string } = useContext(MainContext);
  const {
    appSetting: { showProductModal, isLoading, session_id },
    locale: { lang },
    country: { code },
  } = useAppSelector((state) => state);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data, isSuccess, isFetching } = useGetProductQuery<{
    data: AppQueryResult<Product>;
    isSuccess: boolean;
    isFetching: boolean;
  }>(showProductModal.id);

  const onSubmit: SubmitHandler<Inputs> = async (body) => {
    dispatch(enableLoading());
  };

  console.log("the product from modal", data);

  return (
    <Transition appear show={showProductModal.enabled} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-50'
        onClose={() => dispatch(hideProductModal())}>
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
              <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white py-6 text-left align-middle shadow-xl transition-all'>
                <Dialog.Title
                  as='h3'
                  className='text-lg font-medium leading-6 text-gray-900'>
                  <div className=' capitalize flex flex-row justify-center items-center border-b border-gray-200 pb-4'>
                    product name here
                    <XMarkIcon
                      className='absolute ltr:left-4 rtl:right-4 w-6 h-6 text-gray-600 cursor-pointer'
                      onClick={() => dispatch(hideProductModal())}
                    />
                  </div>
                </Dialog.Title>
                <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm px-6 lg:px-8'>
                  <LoadingSpinner isLoading={isLoading} />
                  {isSuccess && (
                    <div>
                      <ul>
                        <li>Product name : {data.data.name}</li>
                        <li>product description : {data.data.description}</li>
                        <li>product price : {data.data.price}</li>
                      </ul>
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
