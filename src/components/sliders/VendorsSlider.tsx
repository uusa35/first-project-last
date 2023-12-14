"use client";
import React, { useRef } from "react";
import Slider from "react-slick";
import { vendorSliderSettings } from "@/src/constants";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import Link from "next/link";
import { appLinks } from "@/src/links";
import VendorWidget from "../widgets/VendorWidget";
import { Locale, countriesList } from "@/src/types";
import { User } from "@/src/types/queries";

type Props = {
  vendors: User[];
  lang: Locale["lang"];
  country: countriesList;
  title: string;
};

export default function ({ vendors, lang, country, title }: Props) {
  const refSlider = useRef<Slider | null>(null);

  const settings: any = {
    dots: false,
    speed: 500,
    infinite: false,
    slidesToScroll: 1,
    arrows: false,
    rtl: lang === "ar",
    responsive: [
      {
        breakpoint: 5000,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1250,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const RenderArrows = () => {
    return (
      <div
        className={`slider-arrow flex gap-x-2 ${
          lang === "ar" && "flex-row-reverse"
        }`}
        dir={lang === "ar" ? "rtl" : "ltr"}
      >
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
