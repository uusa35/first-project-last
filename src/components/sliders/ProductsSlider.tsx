"use client";
import React, { useRef } from "react";
import Slider from "react-slick";
import { Locale, countriesList } from "@/src/types";
import { Product } from "@/types/queries";
import ProductWidget from "@/components/widgets/ProductWidget";
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

type Props = {
  products: Product[];
  lang: Locale["lang"];
  country: countriesList;
  title: string;
};

export default function ({ products, lang, country, title }: Props) {
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
      <div className='slider-arrow flex gap-x-2'>
        <button
          className='arrow-btn next  p-3 rounded-full bg-white'
          onClick={() => refSlider?.current?.slickPrev()}>
          <ChevronLeftIcon className='rtl:rotate-180 w-4 h-4 font-extralight' />
        </button>
        <button
          className='arrow-btn next  p-3 rounded-full bg-white'
          onClick={() => refSlider?.current?.slickNext()}>
          <ChevronRightIcon className='rtl:rotate-180 w-4 h-4' />
        </button>
      </div>
    );
  };
  return (
    <div className='my-5'>
      <div className='flex justify-between mb-3'>
        <p>{title}</p>
        <div className='flex items-center gap-x-3'>
          <p>See all</p>
          <RenderArrows />
        </div>
      </div>
      <div>
        <Slider {...settings} ref={(c) => (refSlider.current = c)}>
          {products &&
            products.map((itm: Product, i: number) => (
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
