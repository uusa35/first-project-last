import Link from "next/link";
import * as React from "react";
import { Locale } from "@/types/index";
import Image from "next/image";
import JoinusBg from "@/appImages/home/joinus.jpg";

type Props = {
  trans: { [key: string]: string };
  lang: Locale["lang"];
};

export function RegisterAs({ trans, lang }: Props) {
  return (
    <div className='relative bg-expo-green capitalize'>
      <div className='relative h-80 overflow-hidden bg-expo-green md:absolute md:left-0 md:h-full md:w-1/3 lg:w-1/2'>
        <Image
          className='h-full w-full object-cover brightness-50  saturate-150 '
          src={JoinusBg}
          alt=''
          width={300}
          height={300}
        />
        <svg
          viewBox='0 0 926 676'
          aria-hidden='true'
          className='absolute -bottom-24 left-24 w-[57.875rem] transform-gpu blur-[118px]'>
          <path
            fill='url(#60c3c621-93e0-4a09-a0e6-4c228a0116d8)'
            fillOpacity='.4'
            d='m254.325 516.708-90.89 158.331L0 436.427l254.325 80.281 163.691-285.15c1.048 131.759 36.144 345.144 168.149 144.613C751.171 125.508 707.17-93.823 826.603 41.15c95.546 107.978 104.766 294.048 97.432 373.585L685.481 297.694l16.974 360.474-448.13-141.46Z'
          />
          <defs>
            <linearGradient
              id='60c3c621-93e0-4a09-a0e6-4c228a0116d8'
              x1='926.392'
              x2='-109.635'
              y1='.176'
              y2='321.024'
              gradientUnits='userSpaceOnUse'>
              <stop stopColor='#776FFF' />
              <stop offset={1} stopColor='#FF4694' />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className='relative mx-auto max-w-7xl py-24 sm:py-32 lg:px-8 lg:py-40'>
        <div className='pl-6 pr-6 md:ml-auto md:w-2/3 md:pl-16 lg:w-1/2 lg:pl-24 lg:pr-0 xl:pl-32'>
          <h2 className=' font-semibold leading-8 text-lg text-black'>
            {trans.joinus}
          </h2>
          <p className='mt-2 text-3xl font-bold leading-8 tracking-tight text-black line-clamp-2 sm:text-4xl'>
            {trans.joinus_and_get_many_features}
          </p>
          <p className='mt-6 text-base leading-8 line-clamp-2 text-gray-800'>
            {trans.get_to_know_all_kind_of_subscriptions_and_sponsorships}
          </p>
          <div className="mt-8 w-full">
            <Link
              href={`/${lang}/register/company`}
              className="inline-flex justify-center btn-default w-full"
            >
              {trans.register_as_subscription}
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <Link
              className="text-center btn-dark-hover"
              href={`/${lang}/register/company`}
            >
              {trans.register_as_sponsorship}
            </Link>
            <Link
              className="text-center btn-dark-hover"
              href={`/${lang}/register/visitor`}
            >
              {trans.register_as_visitor}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
