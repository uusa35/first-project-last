"use client";
import type { Locale } from "@/i18n.config";
import { useParams } from "next/navigation";
import Logo from "@/appImages/logo.svg";

type Props = {
  params: { lang: Locale };
};

export default function Loading() {
  const { lang }: any = useParams();

  return (
    <div className='h-screen w-screen flex justify-center items-center'>
      <div className='w-1/3 md:w-20 xl:w-24 p-2'>
        <Logo className='h-8 w-36 text-white' />
      </div>
    </div>
  );
}
