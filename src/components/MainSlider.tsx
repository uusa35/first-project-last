"use client";
import { tajawal } from "@/utils/helpers";
import Image from "next/image";
import { Locale } from "@/types/index";
import { Slide } from "@/types/queries";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type Props = {
  slides: Slide[];
  lang: Locale["lang"];
};
export default async function ({ slides, lang }: Props) {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      // spaceBetween={0}
      autoplay
      slidesPerView={1}
      dir={`${lang === "ar" ? "ltr" : "rtl"}`}
      navigation
      pagination={{ clickable: true }}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}>
      {slides.map((s: Slide, i: number) => (
        <SwiperSlide key={i}>
          <Image
            width='1000'
            height='200'
            src={s.image}
            alt={`${process.env.NEXT_PUBLIC_BASE_URL}`}
            className='h-full w-full object-cover'
          />
          <div className='relative '>
            <div className=' absolute mx-6 xl:mx-24 inset-x-0 bottom-12 xl:bottom-20 '>
              <h1 className='rtl:text-right ltr:text-left text-xl lg:text-2xl xl:text-4xl'>
                {s.name}
              </h1>
              <h4 className='rtl:text-right ltr:text-left text-base lg:text-xl xl:text-2xl mt-6'>
                {s.description}
              </h4>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
