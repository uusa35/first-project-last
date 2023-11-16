"use client";
import { MainContext } from "@/layouts/MainContentLayout";
import Right from "@/appIcons/account/white_right.svg";
import { useContext } from "react";

export default function ({ active_tab }: { active_tab: string }) {
  const trans: { [key: string]: string } = useContext(MainContext);

  return (
    <nav aria-label='Progress'>
      <div
        className={`grid grid-cols-3  border-t  border-l border-r md:border border-gray-200 rounded-md`}>
        <div className='col-span-full md:col-span-1  flex justify-start items-center border-b md:rtl:border-l md:ltr:border-r border-gray-200 p-4'>
          <div className='flex flex-row justify-center items-center gap-x-3'>
            <div
              className={`flex justify-center items-center w-7 h-7 rounded-full border-2 text-sm  ${
                active_tab === "2"
                  ? "border-expo-dark text-expo-dark"
                  : "bg-expo-dark"
              }`}>
              {active_tab === "2" ? (
                <span className='pt-1'>01</span>
              ) : (
                <Right />
              )}
            </div>
            <div>{trans.basic_information}</div>
          </div>
        </div>
        <div className='col-span-full md:col-span-1  flex justify-start items-center border-b md:rtl:border-l md:ltr:border-r border-gray-200 p-4'>
          <div className='flex flex-row justify-center items-center gap-x-3'>
            <div
              className={`flex justify-center items-center w-7 h-7 rounded-full border-2 text-sm  ${
                parseInt(active_tab) < 3
                  ? " border-gray-300 text-gray-500"
                  : parseInt(active_tab) >= 3 && parseInt(active_tab) < 8
                  ? "border-expo-dark text-expo-dark"
                  : "bg-expo-dark"
              }`}>
              {parseInt(active_tab) < 8 ? (
                <span className='pt-1'>02</span>
              ) : (
                <Right />
              )}
            </div>
            <div>{trans.company_information}</div>
          </div>
        </div>
        <div className='col-span-full md:col-span-1  flex justify-start items-center border-b md:rtl:border-l md:ltr:border-r border-gray-200 p-4'>
          <div className='flex flex-row justify-center items-center gap-x-3'>
            <div
              className={`flex justify-center items-center w-7 h-7 rounded-full border-2 text-sm ${
                parseInt(active_tab) < 8
                  ? " border-gray-300 text-gray-500"
                  : "border-expo-dark text-expo-dark"
                // parseInt(active_tab) >= 3 && parseInt(active_tab) < 8
                // ? "border-expo-dark text-expo-dark"
                // : "bg-expo-dark"
              }`}>
              {parseInt(active_tab) < 9 ? (
                <span className='pt-1'>03</span>
              ) : (
                <Right />
              )}
            </div>
            <div>{trans.subtype}</div>
          </div>
        </div>
      </div>
    </nav>
  );
}
