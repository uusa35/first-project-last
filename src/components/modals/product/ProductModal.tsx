"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import {
  decraseQty,
  hideProductModal,
  increaseQty,
  setProductOriginalGroups,
} from "@/src/redux/slices/productSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  showErrorToastMessage,
  showSuccessToastMessage,
} from "@/src/redux/slices/toastMessageSlice";
import { useParams, usePathname, useRouter } from "next/navigation";
import { MainContext } from "@/components/layouts/MainContentLayout";
import LoadingSpinner from "@/components/LoadingSpinner";
import { AppQueryResult, Product } from "@/src/types/queries";
import Slider from "react-slick";
import { HeartIcon, ShareIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useGetProductQuery } from "@/src/redux/api/productApi";
import Image from "next/image";
import { map, capitalize, get, isEmpty } from "lodash";
import CheckBoxInput from "@/components/modals/product/CheckBoxInput";
import RadioInput from "@/components/modals/product/RadioInput";
import { addToCartSchema } from "@/src/validations";
import { RWebShare } from "react-web-share";
import { appLinks } from "@/src/links";
import { Locale, countriesList } from "@/src/types";
import { useTranslation } from "react-i18next";

type Inputs = {
  phone: string;
  phone_country_code: string;
  password: string;
  session_id?: string;
};

export default function () {
  const { t } = useTranslation("trans");
  const trans: { [key: string]: string } = useContext(MainContext);
  const params: { lang: Locale["lang"]; country?: countriesList } | any =
    useParams!();
  const pathName = usePathname()!;
  const { lang } = params;
  const {
    appSetting: { showProductModal, isLoading, session_id },
    product: { id, selections, quantity, enabled },
    country: { code },
  } = useAppSelector((state) => state);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data, isSuccess, isFetching, error } = useGetProductQuery<{
    data: AppQueryResult<Product>;
    isSuccess: boolean;
    isFetching: boolean;
    error: any;
  }>(190);
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

  const settings: any = {
    dots: true,
    speed: 500,
    infinite: true,
    slidesToScroll: 1,
    arrows: true,
  };

  const onSubmit: SubmitHandler<Inputs> = async (body) => {
    if (isEmpty(errors)) {
      reset();
      // dispatch(enableLoading());
    }
  };

  useEffect(() => {
    if (isSuccess && data?.data?.groups) {
      dispatch(setProductOriginalGroups(data?.data?.groups));
    }
  }, []);

  useEffect(() => {
    setValue("groups", selections);
  }, [selections]);

  return (
    <Transition appear show={enabled} as={Fragment}>
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
              <Dialog.Panel className='w-full h-full  md:h-3/4 md:max-w-[80%] lg:max-w-[60%] xxl:max-w-[40%] transform rounded-t-2xl md:rounded-2xl bg-white  py-6  text-left align-middle shadow-xl transition-all'>
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
                      <RWebShare
                        data={{
                          text: data?.data?.name,
                          url: `https://${
                            window.location.hostname
                          }${appLinks.vendor(
                            lang,
                            params?.country,
                            data?.data?.vendor?.id?.toString(),
                            data?.data?.name
                          )}`,
                          title: capitalize(trans.picks),
                        }}>
                        <ShareIcon className='w-6 h-6 text-black' />
                      </RWebShare>
                    </div>
                  </div>
                  <h1>{t("price")}</h1>
                </Dialog.Title>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className='relative sm:mx-auto overflow-x-auto w-full h-full bg-white  rounded-2xl'>
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
                            <h1 className='text-2xl ltr:text-left rtl:text-right'>
                              {data.data.name} - {data.data.id}
                            </h1>
                            <p className='text-md text-gray-400 ltr:text-left rtl:text-right'>
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
                            <ul className='flex flex-col gap-y-2 text-red-700'>
                              {map(errors, (v) => (
                                <li className='capitalize'>{v.message}</li>
                              ))}
                            </ul>

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
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* footer */}
                  {isSuccess && (
                    <div
                      className={`fixed bottom-0 md:-bottom-10 w-full flex flex-row justify-between items-center   rounded-b-2xl p-4 border-t border-gray-200 bg-white`}>
                      <div className={`flex flex-row gap-x-2`}>
                        <button
                          disabled={quantity === 0}
                          onClick={() => dispatch(decraseQty())}
                          className={`${
                            quantity === 0 && `opacity-60`
                          } bg-picks-dark  flex justify-center items-center text-white w-6 h-6 rounded-full`}>
                          -
                        </button>
                        <div className='flex justify-center items-center text-black w-6 h-6 rounded-full'>
                          {quantity}
                        </div>
                        <button
                          onClick={() => dispatch(increaseQty())}
                          disabled={quantity === data.data.stock}
                          className={`${
                            quantity === data.data.stock && `opacity-60`
                          } bg-picks-dark  flex justify-center items-center text-white w-6 h-6 rounded-full`}>
                          +
                        </button>
                      </div>
                      <button className='btn btn-default' type={"submit"}>
                        {trans.add_to_cart}
                      </button>
                    </div>
                  )}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
