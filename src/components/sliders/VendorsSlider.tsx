"use client";
import { Locale, countriesList } from "@/src/types";
import { User } from "@/src/types/queries";
import Slider from "react-slick";
import { getSlidesToShow, vendorSliderSettings } from "@/src/constants";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import Link from "next/link";
import { appLinks } from "@/src/links";
import VendorWidget from "../widgets/VendorWidget";

type Props = {
  lang: Locale["lang"];
  country: countriesList;
  vendors: User[];
  title: string;
};

export default function ({ vendors, lang, country, title }: Props) {
  const refSlider = useRef<Slider | null>(null);

  const RenderArrows = () => {
    return (
      <div className="slider-arrow flex gap-x-2">
        <button
          className="arrow-btn prev w-8 h-8 rounded-full bg-[#EEE]"
          onClick={() => refSlider?.current?.slickPrev()}
        >
          <KeyboardArrowLeft />
        </button>
        <button
          className="arrow-btn next w-8 h-8 rounded-full bg-[#EEE]"
          onClick={() => refSlider?.current?.slickNext()}
        >
          <KeyboardArrowRight />
        </button>
      </div>
    );
  };

  return (
    <div className="my-5">
      <div className="flex justify-between mb-3">
        <p>{title}</p>
        <div className="flex items-center gap-x-3">
          <p>See all</p>
          <RenderArrows />
        </div>
      </div>
      <div>
        <Slider
          {...vendorSliderSettings}
          ref={(c) => (refSlider.current = c)}
          rtl={lang === "ar"}
        >
          {vendors &&
            vendors.map((itm) => (
              <Link
                key={itm.id}
                href={appLinks.vendor(
                  lang,
                  country,
                  itm.id.toString(),
                  itm.store_name_en
                )}
              >
                <VendorWidget vendor={itm} lang={lang} country={country} />
              </Link>
            ))}
        </Slider>
      </div>
    </div>
  );
}
