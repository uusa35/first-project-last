"use client";
import SideMenu from "@/components/SideMenu";
import type { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import { imageUrl, logoBlured, suppressText } from "@/src/constants";
import { useTranslation } from "react-i18next";
import { map, range } from "lodash";
import TextTrans from "../TextTrans";
import HomeSection from "./HomeSection";
import { MainContext } from "../MainContentLayout";
import { useContext, useEffect } from "react";
import Image from "next/image";
import Logo from "@/appImages/logo.png";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setMethod, toggleMethod } from "@/redux/slices/settingSlice";
export default function HomeContent({
  users,
  nationalEvents,
  nationalEvent,
}: {
  users: any;
  nationalEvents: any;
  nationalEvent: any;
  lang: Locale;
}) {
  const { home, translation }: any = useContext(MainContext);
  const { method } = useAppSelector((state) => state.setting);
  const dispatch = useAppDispatch();
  console.log("the method", method);

  useEffect(() => {}, [method]);
  return (
    <div className='container space-y-8 flex w-full flex-col justify-center items-center'>
      <div>
        <h1 className='text-3xl font-bold capitalize'>
          {translation} : {home.main}
        </h1>
        <p className='text-3xl font-bold capitalize' suppressHydrationWarning>
          From the state : {method}
        </p>
        <button onClick={() => dispatch(toggleMethod(undefined))}>
          toggle method
        </button>
      </div>

      {/* Dont remove any code below plz. leave (it's hidden already and wont affect ur work) */}
      <div className='w-full p-8  bg-orange-500 rounded-md'>
        <h1>From SSR : users</h1>
        {map(users.data, (u, i) => (
          <div key={i}>
            <TextTrans ar={u.name_ar} en={u.name_en} />
          </div>
        ))}
      </div>
      <div className='w-full p-8  bg-orange-500 rounded-md'>
        <h1>From SSR : National Events</h1>
        {map(nationalEvents.data, (u, i) => (
          <div key={i}>
            <TextTrans ar={u.name_ar} en={u.name_en} />
          </div>
        ))}
      </div>
      <div className='w-full p-8  bg-orange-500 rounded-md'>
        <h1>From SSR : NationalEvent Id : {nationalEvent.id}</h1>
        <TextTrans ar={nationalEvent.name_ar} en={nationalEvent.name_en} />
      </div>
      <HomeSection />
    </div>
  );
}
