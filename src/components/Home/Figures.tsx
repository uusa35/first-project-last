import * as React from "react";
import { PersonOutlineOutlined } from "@/src/constants";
import Person from "@/appIcons/home/person.svg";
import OfficeBag from "@/appIcons/home/bag.svg";
import Qupe from "@/appIcons/home/qupe.svg";
import Group from "@/appIcons/home/group.svg";

type Props = {
  trans: { [key: string]: string };
};

export function Figures({ trans }: Props) {
  return (
    <div className="bg-white py-12 sm:py-12 capitalize">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <dl className="mt-16 grid grid-cols-2 p-2 md:p-8 bg-expo-green  overflow-hidden rounded-2xl text-center lg:grid-cols-4">
            <div className="col-span-1 flex flex-1 flex-row  justify-evenly items-center h-40 px-4 md:px-8 border-gray-400 ltr:border-r rtl:border-l ">
              <Person className="w-16 h-16" />
              <div className="flex flex-col  p-2  border-gray-400 ">
                <dt className="text-sm font-semibold break-all  leading-6 text-gray-600">
                  {trans.subscribers}
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">
                  {52}
                </dd>
              </div>
            </div>

            <div className="col-span-1 flex flex-1 flex-row  justify-evenly items-center h-40 border-gray-400 border-hidden lg:border-solid md:ltr:border-r md:rtl:border-l">
              <OfficeBag className="w-16 h-16" />
              <div className="flex flex-col  p-2 pe-8  border-gray-400 ">
                <dt className="text-sm font-semibold break-all  leading-6 text-gray-600">
                  {trans.subscribers}
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">
                  {45}
                </dd>
              </div>
            </div>

            <div className="col-span-1 flex flex-1 flex-row  justify-evenly items-center h-40 border-gray-400 border-hidden lg:border-solid md:ltr:border-r md:rtl:border-l">
              <Qupe className="w-16 h-16" />
              <div className="flex flex-col  p-2 pe-8  border-gray-400 ">
                <dt className="text-sm font-semibold break-all  leading-6 text-gray-600">
                  {trans.subscribers}
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">
                  {`2345+`}
                </dd>
              </div>
            </div>

            <div className="col-span-1 flex flex-1 flex-row  justify-evenly items-center h-40">
              <Group className="w-16 h-16" />
              <div className="flex flex-col  p-2 pe-8  border-gray-400 ">
                <dt className="text-sm font-semibold break-all  leading-6 text-gray-600">
                  {trans.subscribers}
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">
                  {`36+`}
                </dd>
              </div>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
