"use client";
import { Locale, countriesList } from "@/src/types";
import { User } from "@/src/types/queries";
import Slider from "react-slick";
import { getSlidesToShow, vendorSliderSettings } from "@/src/constants";
import { useEffect, useRef, useState } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import Image from "next/image";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import Link from "next/link";
import { appLinks } from "@/src/links";

type Props = {
  lang: Locale["lang"];
  country: countriesList;
  vendors: User[];
};

export default function ({ lang, country, vendors }: Props) {
  const [slidesToShow, setSlidesToShow] = useState<number>(10);
  const refSlider = useRef<Slider | null>(null);
  const { width } = useWindowSize();
  useEffect(() => {
    setSlidesToShow(getSlidesToShow(width, 2, 3, 4, 5, vendors.length));
  }, [width]);

  const RenderArrows = () => {
    return (
      <div className='slider-arrow flex gap-x-2'>
        <button
          className='arrow-btn prev w-8 h-8 rounded-full bg-[#EEE]'
          onClick={() => refSlider?.current?.slickPrev()}>
          <KeyboardArrowLeft className='rtl:rotate-180' />
        </button>
        <button
          className='arrow-btn next w-8 h-8 rounded-full bg-[#EEE]'
          onClick={() => refSlider?.current?.slickNext()}>
          <KeyboardArrowRight className='rtl:rotate-180' />
        </button>
      </div>
    );
  };

  return (
    <div className='my-5'>
      <div className='flex justify-between mb-3'>
        <p>Vendors</p>
        <div className='flex gap-x-3'>
          <p>See all</p>
          <RenderArrows />
        </div>
      </div>
      <div>
        <Slider
          {...vendorSliderSettings}
          ref={(c) => (refSlider.current = c)}
          rlt={lang === "ar"}
          slidesToShow={slidesToShow}>
          {vendors.map((itm: User, i: number) => (
            <Link
              href={appLinks.vendor(
                lang,
                country,
                itm.id.toString(),
                itm.store_name_en
              )}>
              <Image
                src={itm.image}
                key={i}
                lang={lang}
                width={1000}
                height={1000}
                alt={itm.name_en ?? itm.store_name}
              />
              <h1>{itm.store_name}</h1>
            </Link>
          ))}
        </Slider>
      </div>
    </div>
  );
}
