"use client";

import { useContext } from "react";
import ShowMore from "@/appIcons/green_left_arrow.svg";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

export default function (): React.ReactNode {
  const {
    locale: { lang },
  } = useAppSelector((state) => state);
  const trans: { [key: string]: string } = useContext(MainContext);
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className='hidden absolute rtl:right-0 ltr:left-0 md:flex md:ms-2 flex-row justify-start items-center gap-x-4 mt-8 btn-transparent'>
      <ShowMore
        className={`w-6 h-6 text-expo-dark ${lang === "ar" && "rotate-180"}`}
      />
      <div className='text-black text-sm lg:text-md capitalize  '>
        {trans.back}
      </div>
    </button>
  );
}
