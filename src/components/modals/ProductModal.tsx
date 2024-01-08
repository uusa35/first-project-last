"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { enableLoading } from "@/src/redux/slices/settingSlice";
import {
  hideProductModal,
  setProductGroups,
} from "@/src/redux/slices/productSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  showErrorToastMessage,
  showSuccessToastMessage,
} from "@/src/redux/slices/toastMessageSlice";
import { useRouter } from "next/navigation";
import { MainContext } from "@/components/layouts/MainContentLayout";
import LoadingSpinner from "@/components/LoadingSpinner";
import { AppQueryResult, Product } from "@/src/types/queries";
import Slider from "react-slick";
import { HeartIcon, ShareIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useGetProductQuery } from "@/src/redux/api/productApi";
import Image from "next/image";
import { filter, map } from "lodash";
import CheckBoxInput from "@/components/modals/product/CheckBoxInput";
import RadioInput from "@/components/modals/product/RadioInput";
import { addToCartSchema, contactusSchema } from "@/src/validations";

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
    product: { selections },
    locale: { lang },
    country: { code },
  } = useAppSelector((state) => state);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data, isSuccess, isFetching } = useGetProductQuery<{
    data: AppQueryResult<Product>;
    isSuccess: boolean;
    isFetching: boolean;
  }>(63);
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    getValue,
    getValues,
    formState: { errors },
  }: any = useForm<any>({
    resolver: yupResolver(addToCartSchema(data?.data?.groups, trans)),
    defaultValues: {
      offer_id: data?.data?.id,
      quantity: 1,
      vendor_id: data?.data?.vendor?.id,
      notes: "hello",
      groups: selections,
    },
  });

  console.log("errors", errors);
  console.log("getValues", getValues("groups"));
  console.log("state sections", selections);

  const settings: any = {
    dots: true,
    speed: 500,
    infinite: true,
    slidesToScroll: 1,
    arrows: true,
  };

  const onSubmit: SubmitHandler<Inputs> = async (body) => {
    console.log("body", body);
    // dispatch(enableLoading());
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setProductGroups(data?.data?.groups));
    }
  }, []);

  return (
    <Transition appear show={true} as={Fragment}>
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
          <div className='flex h-full items-center justify-center pt-12 md:p-12 '>
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
                    className={`flex  flex-row justify-between items-center w-auto gap-x-4  ltr:right-4 ltr:left-4`}>
                    <div>
                      <HeartIcon className='w-6 h-6 text-black' />
                    </div>
                    <div>
                      <ShareIcon className='w-6 h-6 text-black' />
                    </div>
                  </div>
                </Dialog.Title>

                <div className=' relative sm:mx-auto overflow-x-auto w-full h-full bg-white  rounded-2xl'>
                  <LoadingSpinner isLoading={!isSuccess} />
                  {isSuccess && (
                    <div>
                      <div className=' overflow-y-auto h-full md:h-[60%] px-4  pb-[20%] md:pb-[10%]'>
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
                            <h1 className='text-2xl'>
                              {data.data.name} - {data.data.id}
                            </h1>
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
                              <div className='text-orange-600 capitalize'>
                                {data.data.percentage}
                                <span className=''>{trans.off}</span>
                              </div>
                            </div>
                          </div>
                          <div className='flex flex-col   divide-y divide-gray-200 py-2 '>
                            <form onSubmit={handleSubmit(onSubmit)}>
                              {data.data.groups &&
                                map(data.data.groups, (g: any, i) => (
                                  <div key={i}>
                                    {g.input_type === "radio" ? (
                                      <RadioInput group={g} />
                                    ) : (
                                      <CheckBoxInput group={g} />
                                    )}
                                  </div>
                                ))}
                              <button type='submit' className='btn-default'>
                                submitttt
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* footer */}
                  <div
                    className={`fixed bottom-0 md:-bottom-10 w-full flex flex-row justify-between items-center   rounded-b-2xl p-4 border-t border-gray-200 bg-white`}>
                    <div className={`flex flex-row gap-x-4`}>
                      <div>+</div>
                      <div>1</div>
                      <div>-</div>
                    </div>
                    <button className='btn btn-default'>add to cart</button>
                  </div>
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
