"use client";
import React, { useContext, useRef } from "react";
import Slider from "react-slick";
import { vendorSliderSettings } from "@/src/constants";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import Link from "next/link";
import { appLinks } from "@/src/links";
import { Locale, countriesList } from "@/src/types";
import { User } from "@/types/queries";
import VendorWidget from "@/components/widgets/VendorWidget";
import { MainContext } from "../layouts/MainContentLayout";

type Props = {
  vendors: User[];
  lang: Locale["lang"];
  country: countriesList;
  title: string;
};

export default function ({ vendors, lang, country, title }: Props) {
  const trans: { [key: string]: string } = useContext(MainContext);
  const refSlider = useRef<Slider | null>(null);

  const RenderArrows = () => {
    return (
      <div className='slider-arrow flex gap-x-2'>
        <button
          className='arrow-btn prev bg-[#EEE]'
          onClick={() => refSlider?.current?.slickPrev()}>
          <KeyboardArrowLeft className='' />
        </button>
        <button
          className='arrow-btn next bg-[#EEE]'
          onClick={() => refSlider?.current?.slickNext()}>
          <KeyboardArrowRight className='' />
        </button>
      </div>
    );
  };
  return (
    <div className='my-5'>
      <div className='flex justify-between mb-3'>
        <p className='slider-title'>{trans[title]}</p>
        <div className='flex items-center gap-x-3 text-sm'>
          <p>{trans.see_all}</p>
          <RenderArrows />
        </div>
      </div>
      <div>
        <Slider
          {...vendorSliderSettings}
          ref={(c) => (refSlider.current = c)}
          rtl={lang === "ar"}>
          {vendors &&
            vendors.map((itm) => (
              <Link
                key={itm.id}
                href={appLinks.vendor(
                  lang,
                  country,
                  itm.id.toString(),
                  itm.store_name_en
                )}>
                <VendorWidget vendor={itm} lang={lang} country={country} />
              </Link>
            ))}
        </Slider>
      </div>
    </div>
  );
}
