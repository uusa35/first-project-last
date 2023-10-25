"use client";
import { Fragment, useContext } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Locale } from "@/types/index";
import { usePathname } from "next/navigation";
import { MainContext } from "@/layouts/MainContentLayout";
import Link from "next/link";
import { appLinks, deleteToken } from "@/src/constants";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { resetAuth } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";

type Props = {
  lang: Locale["lang"];
};
export default function ({ lang }: Props) {
  const pathName = usePathname()!;
  const trans: { [key: string]: string } = useContext(MainContext);
  const {
    auth: { id, role },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const router = useRouter();

  console.log("trans", trans);

  const handleLogout = () => {
    dispatch(resetAuth());
    deleteToken();
    router.replace(appLinks.home(lang));
  };
  return (
    <Popover className='relative'>
      <Popover.Button className='inline-flex btn-color-default items-center gap-x-1 text-sm font-semibold leading-2 capitalize'>
        <span>{trans.control_my_account}</span>
        <ChevronDownIcon className='h-5 w-5' aria-hidden='true' />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-200'
        enterFrom='opacity-0 translate-y-1'
        enterTo='opacity-100 translate-y-0'
        leave='transition ease-in duration-150'
        leaveFrom='opacity-100 translate-y-0'
        leaveTo='opacity-0 translate-y-1'>
        <Popover.Panel className='absolute rtl:left-1/2 ltr:right-1/2 z-10 mt-2 flex w-screen max-w-min rtl:-translate-x-1/4 ltr:translate-x-1/4 px-4'>
          <div className='w-60 shrink rounded-md divide-x divide-gray-100 bg-white  text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5'>
            <Link
              className='block w-full py-2 px-4  ltr:text-left rtl:text-right hover:bg-gray-200 capitalize'
              href={appLinks.account(lang, role.name, id)}>
              {trans.control_account_information}
            </Link>
            <Link
              className='block w-full py-2 px-4  ltr:text-left rtl:text-right hover:bg-gray-200 capitalize'
              href={appLinks.home(lang)}>
              {trans.back_to_home}
            </Link>
            <button
              className='block w-full py-2 px-4  ltr:text-left rtl:text-right hover:bg-gray-200 capitalize'
              onClick={() => handleLogout()}>
              {trans.logout}
            </button>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
