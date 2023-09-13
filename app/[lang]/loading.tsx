"use client";
import type { Locale } from "@/i18n.config";
import { useParams } from "next/navigation";
import Logo from "@/appImages/logo.png";
import { logoBlured } from "@/src/constants";
import Image from "next/image";

type Props = {
  params: { lang: Locale };
};

export default function Loading() {
  const { lang } = useParams();
  return (
    <div className='h-screen w-screen flex justify-center items-center'>
      <div className='w-1/12 p-2 shadow-xl rounded-xl border border-gray-100'>
        <Image
          className='w-full h-auto object-contain'
          src={Logo}
          alt='seazen'
          fill={false}
          placeholder='blur'
          loading='lazy'
          blurDataURL={logoBlured}
        />
      </div>
    </div>
  );
}
