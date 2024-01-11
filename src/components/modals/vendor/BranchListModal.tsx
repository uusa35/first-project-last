"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import {
  enableLoading,
  toggleLoginModal,
} from "@/src/redux/slices/settingSlice";
import {
  showErrorToastMessage,
  showSuccessToastMessage,
} from "@/src/redux/slices/toastMessageSlice";
import { useRouter } from "next/navigation";
import { MainContext } from "@/components/layouts/MainContentLayout";
import LoadingSpinner from "@/components/LoadingSpinner";
import { EyeIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useLazyGetBranchesQuery } from "@/src/redux/api/vendorApi";
import { map } from "lodash";

type Props = {
  vendor_id: string;
  showBranchModal: boolean;
  setShowBranchModal: (v: boolean) => void;
};
export default function ({
  vendor_id,
  showBranchModal,
  setShowBranchModal,
}: Props) {
  const trans: { [key: string]: string } = useContext(MainContext);
  const {
    appSetting: { isLoading },
    locale: { lang },
    country: { code },
  } = useAppSelector((state) => state);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [triggerGetBranches, { data, isSuccess, isFetching }] =
    useLazyGetBranchesQuery();

  useEffect(() => {
    triggerGetBranches(vendor_id);
  }, [vendor_id]);

  return (
    <Transition appear show={showBranchModal} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-50'
        onClose={() => setShowBranchModal(false)}>
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
                    {trans.select_branch}
                    <XMarkIcon
                      className='absolute ltr:left-4 rtl:right-4 w-6 h-6 text-gray-600 cursor-pointer'
                      onClick={() => setShowBranchModal(false)}
                    />
                  </div>
                </Dialog.Title>
                <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm px-3'>
                  <LoadingSpinner isLoading={isFetching} />
                  {isSuccess &&
                    data?.data &&
                    map(data?.data, (b, i) => (
                      <div
                        key={i}
                        className='flex flex-row gap-x-4 py-4 border-b border-gray-200 '>
                        <div>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='15'
                            height='19'
                            viewBox='0 0 15 19'
                            fill='none'>
                            <path
                              d='M7.03281 0.847658C5.17824 0.846504 3.3966 1.56993 2.06781 2.86366C1.41836 3.49573 0.901628 4.25109 0.547894 5.08545C0.194159 5.91982 0.0105444 6.81641 0.0078125 7.72266C0.0078125 13.6047 6.39381 18.0487 6.66581 18.2347C6.77387 18.3083 6.90157 18.3476 7.03231 18.3476C7.16305 18.3476 7.29076 18.3083 7.39881 18.2347C7.67081 18.0487 14.0568 13.6047 14.0568 7.72266C14.054 6.81642 13.8704 5.91985 13.5167 5.08549C13.1629 4.25113 12.6462 3.49576 11.9968 2.86366C10.6683 1.57017 8.88703 0.846765 7.03281 0.847658ZM7.03281 5.22266C7.53666 5.2222 8.02974 5.36849 8.45181 5.64366C8.86995 5.9159 9.19754 6.3065 9.39281 6.76566C9.5858 7.22132 9.63635 7.72472 9.53781 8.20966C9.43786 8.69677 9.19401 9.14267 8.83781 9.48966C8.47804 9.8406 8.0233 10.0784 7.52981 10.1737C7.03444 10.2703 6.52168 10.2209 6.05381 10.0317C5.58949 9.84414 5.19084 9.52376 4.90781 9.11066C4.67467 8.77088 4.53084 8.37786 4.4896 7.96786C4.44835 7.55785 4.51102 7.14406 4.67181 6.76466C4.80104 6.46035 4.98934 6.1847 5.22581 5.95366C5.4642 5.72071 5.74581 5.53659 6.05481 5.41166C6.36552 5.28587 6.69761 5.22236 7.03281 5.22266Z'
                              fill='white'
                            />
                          </svg>
                        </div>
                        <div>{b.name}</div>
                      </div>
                    ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
