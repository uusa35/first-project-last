"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import {
  enableLoading,
  hideProductModal,
  toggleForgetPasswordModal,
  toggleRegisterModal,
  toggleVerficationModal,
} from "@/src/redux/slices/settingSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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
import Slider from "react-slick";
import {
  EyeIcon,
  HeartIcon,
  ShareIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { setAuthentication } from "@/src/redux/slices/authSlice";
import {
  useGetProductQuery,
  useLazyGetProductQuery,
} from "@/src/redux/api/productApi";
import Image from "next/image";
import { map } from "lodash";

type Inputs = {
  phone: string;
  phone_country_code: string;
  password: string;
  session_id?: string;
};

const notificationMethods = [
  { id: "email", title: "Email" },
  { id: "sms", title: "Phone (SMS)" },
  { id: "push", title: "Push notification" },
];

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
  }>(10);

  const settings: any = {
    dots: true,
    speed: 500,
    infinite: true,
    slidesToScroll: 1,
    arrows: true,
  };

  const onSubmit: SubmitHandler<Inputs> = async (body) => {
    dispatch(enableLoading());
  };

  return (
    <Transition appear show={false} as={Fragment}>
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
        <div className='fixed inset-0 w-screen '>
          <div className='flex h-full items-center justify-center pt-12 md:p-12'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'>
              <Dialog.Panel className='w-full h-full  md:h-3/4 md:max-w-[80%] lg:max-w-[60vh] transform rounded-t-2xl md:rounded-2xl bg-white  py-6  text-left align-middle shadow-xl transition-all'>
                <Dialog.Title
                  as='div'
                  className='flex flex-row w-full justify-between items-center  text-lg font-medium leading-6 text-gray-900 capitalize  pb-4 px-4'>
                  <div className='flex  ltr:left-4 rtl:right-4  '>
                    <XMarkIcon
                      className='w-6 h-6 text-gray-600 cursor-pointer'
                      onClick={() => dispatch(hideProductModal())}
                    />
                  </div>
                  <div
                    className={`flex  flex-row justify-between items-center w-auto gap-x-4  ltr:right-4 ltr:left-4 border-4 border-green-800`}>
                    <div>
                      <HeartIcon className='w-6 h-6 text-black' />
                    </div>
                    <div>
                      <ShareIcon className='w-6 h-6 text-black' />
                    </div>
                  </div>
                </Dialog.Title>

                <div className=' relative sm:mx-auto overflow-x-auto w-full h-[60vh] '>
                  <LoadingSpinner isLoading={!isSuccess} />
                  {isSuccess && (
                    <div>
                      <div className=' overflow-y-auto h-full md:h-[60%] px-4  pb-[10%]'>
                        <div className='justify-center items-center '>
                          <Slider {...settings}>
                            {data.data.images &&
                              map(data.data.images, (img, i) => (
                                <Image
                                  key={i}
                                  src={img}
                                  width={500}
                                  height={400}
                                  alt={data.data.name}
                                  className='w-full h-auto aspect-[5/3]'
                                />
                              ))}
                          </Slider>
                        </div>

                        <div className='pt-4'>
                          <div className='flex flex-col gap-y-2'>
                            <h1 className='text-2xl'>{data.data.name}</h1>
                            <p className='text-md text-gray-400'>
                              {data.data.description}
                            </p>
                            <div className='flex flex-row justify-start items-center gap-x-4'>
                              <div className='bg-picks-dark text-white rounded-full px-4 py-2'>
                                {data.data.new_price}
                              </div>
                              <div className='line-through text-gray-400'>
                                {data.data.price}
                              </div>
                              <div>
                                {data.data.percentage} {trans.off}
                              </div>
                            </div>
                          </div>
                          <div className='divide-y divide-gray-400 py-4 gap-y-4'>
                            <div>
                              <div className='flex flex-1 justify-between items-center'>
                                <div>
                                  <label className='text-base font-semibold text-gray-900'>
                                    Notifications
                                  </label>
                                  <p className='text-sm text-gray-400'>
                                    How do you prefer to receive notifications?
                                  </p>
                                </div>
                                <div className='bg-gray-200 p-2 text-sm rounded-2xl text-gray-600'>
                                  {trans.required}
                                </div>
                              </div>

                              <fieldset className='mt-4'>
                                <legend className='sr-only'>
                                  Notification method
                                </legend>
                                <div className='space-y-4'>
                                  {notificationMethods.map(
                                    (notificationMethod) => (
                                      <div
                                        key={notificationMethod.id}
                                        className='flex items-center'>
                                        <input
                                          id={notificationMethod.id}
                                          name='notification-method'
                                          type='radio'
                                          defaultChecked={
                                            notificationMethod.id === "email"
                                          }
                                          className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                                        />
                                        <label
                                          htmlFor={notificationMethod.id}
                                          className='ml-3 block text-sm font-medium leading-6 text-gray-900'>
                                          {notificationMethod.title}
                                        </label>
                                      </div>
                                    )
                                  )}
                                </div>
                              </fieldset>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* footer */}
                      <div
                        className={`fixed bottom-0 bg-orange-400 w-full flex flex-row justify-between items-center   md:rounded-b-2xl p-4 border-t border-gray-200`}>
                        <div className={`flex flex-row gap-x-4`}>
                          <div>+</div>
                          <div>1</div>
                          <div>-</div>
                        </div>
                        <button className='btn btn-default'>add to cart</button>
                      </div>
                    </div>
                  )}
                </div>
                {/* footer  */}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
