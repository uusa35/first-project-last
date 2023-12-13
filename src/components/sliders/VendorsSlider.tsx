"use client";
import { Locale, countriesList } from "@/src/types";
import { Product, User } from "@/src/types/queries";
import Slider from "react-slick";
import { getSlidesToShow, vendorSliderSettings } from "@/src/constants";
import { useEffect, useRef, useState } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import Image from "next/image";
import ProductWidget from "../widgets/ProductWidget";
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
  const refSlider2 = useRef<Slider | null>(null);
  const { width } = useWindowSize();
  useEffect(() => {
    setSlidesToShow(getSlidesToShow(width, 2, 3, 4, 5, 7));
  }, [width]);

  const RenderArrows = () => {
    return (
      <div className='slider-arrow flex gap-x-2'>
        <button
          className='arrow-btn prev w-8 h-8 rounded-full bg-[#EEE]'
          onClick={() => refSlider2?.current?.slickPrev()}>
          <KeyboardArrowLeft />
        </button>
        <button
          className='arrow-btn next w-8 h-8 rounded-full bg-[#EEE]'
          onClick={() => refSlider2?.current?.slickNext()}>
          <KeyboardArrowRight />
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
          rlt={lang === "ar"}
          slidesToShow={slidesToShow}>
          {vendors.map((itm: User, i: number) => (
            <Link
              href={appLinks.vendor(lang, country, itm.id, itm.store_name_en)}>
              <Image
                src={itm.image}
                key={i}
                lang={lang}
                width={1000}
                height={1000}
                alt={itm.name_en ?? itm.store_name}
              />
            </Link>
          ))}
        </Slider>
      </div>
    </div>
  );
}
