"use client";
import React, { useRef } from "react";
import Slider from "react-slick";
import { vendorSliderSettings } from "@/src/constants";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import Link from "next/link";
import { appLinks } from "@/src/links";
import { Locale, countriesList } from "@/src/types";
import { User } from "@/types/queries";
import VendorWidget from "@/components/widgets/VendorWidget";
import { MainContext } from "@/components/layouts/MainContentLayout";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";

type Props = {
  vendors: User[];

  title: string;
};

export default function ({ vendors, title }: Props) {
  const { t } = useTranslation("trans");
  const params: { lang: Locale["lang"]; country?: countriesList } | any =
    useParams!();
  const { lang } = params;
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
        <p className='slider-title'>{t(title)}</p>
        <div className='flex items-center gap-x-3 text-sm capitalize'>
          <p>{t("see_all")}</p>
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
                  params?.country,
                  itm.id.toString(),
                  itm.store_name_en
                )}>
                <VendorWidget vendor={itm} />
              </Link>
            ))}
        </Slider>
      </div>
    </div>
  );
}
