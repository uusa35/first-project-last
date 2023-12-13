"use client";
import { Slide } from "@/src/types/queries";
import { adsSliderSettings } from "@/src/constants";
import { Locale, countriesList } from "@/src/types";
import Slider from "react-slick";
import { getSlidesToShow } from "@/src/constants";
import { useEffect, useState } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import Image from "next/image";

type Props = {
  lang: Locale["lang"];
  country: countriesList;
  slides: Slide[];
};
export default function ({ lang, country, slides }: Props) {
  const [slidesToShow, setSlidesToShow] = useState<number>(4);
  const { width } = useWindowSize();
  useEffect(() => {
    setSlidesToShow(getSlidesToShow(width, 1, 2, 3, 3, slides.length));
  }, [width]);

  return (
    <div className='my-10'>
      <Slider
        {...adsSliderSettings}
        rtl={lang === "ar"}
        slidesToShow={slidesToShow}>
        {slides.map((s: Slide) => (
          <Image
            key={s.id}
            alt={"slider"}
            src={s.image}
            width={1000}
            height={1000}
            className='w-full h-auto aspect-[2/1] object-fill object-bottom'
          />
        ))}
      </Slider>
    </div>
  );
}
