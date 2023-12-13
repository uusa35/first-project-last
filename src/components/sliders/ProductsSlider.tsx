"use client";
import { Locale, countriesList } from "@/src/types";
import { Product } from "@/src/types/queries";
import Slider from "react-slick";
import { getSlidesToShow, vendorSliderSettings } from "@/src/constants";
import { useEffect, useRef, useState } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import Image from "next/image";
import ProductWidget from "../widgets/ProductWidget";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

type Props = {
  lang: Locale["lang"];
  country: countriesList;
  products: Product[];
};

export default function ({ lang, country, products }: Props) {
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
        <p>New Picks</p>
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
          {products.map((itm: Product, i: number) => (
            <ProductWidget
              product={itm}
              key={i}
              lang={lang}
              country={country}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
}
