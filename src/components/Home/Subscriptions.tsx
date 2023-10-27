import * as React from "react";
import { PersonOutlineOutlined } from "@/src/constants";

type Props = {
  trans: { [key: string]: string };
};

export function Subscriptions({ trans }: Props) {
  return (
    <div className="bg-white py-12 sm:py-12 capitalize">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <dl className="mt-16 grid grid-cols-2 p-2 md:p-8 bg-expo-green  overflow-hidden rounded-2xl text-center lg:grid-cols-4">
            <div className="col-span-1 flex flex-1 flex-row  justify-evenly items-center h-40 px-4 md:px-8 border-gray-400 ltr:border-r rtl:border-l ">
              <PersonOutlineOutlined className="material-icon-lg border-blue-800 text-expo-dark " />
              <div className="flex flex-col  p-2  border-gray-400 ">
                <dt className="text-sm font-semibold break-all  leading-6 text-gray-600">
                  {trans.subscribers}
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">
                  {100}
                </dd>
              </div>
            </div>

            <div className="col-span-1 flex flex-1 flex-row  justify-evenly items-center h-40 border-gray-400 border-hidden lg:border-solid md:ltr:border-r md:rtl:border-l">
              <PersonOutlineOutlined className="material-icon-lg border-blue-800 text-expo-dark " />
              <div className="flex flex-col  p-2 pe-8  border-gray-400 ">
                <dt className="text-sm font-semibold break-all  leading-6 text-gray-600">
                  {trans.subscribers}
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">
                  {100}
                </dd>
              </div>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
