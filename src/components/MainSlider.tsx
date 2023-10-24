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
          <div className='absolute -bottom-10  lg:-bottom-32 lg:rtl:right-20 lg:ltr:left-20  grid h-full w-full items-center'>
            <div className='w-3/4 ps-12 md:w-2/4 md:ps-20 lg:ps-32'>
              <div>{s.name}</div>
              <div>{s.description}</div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
