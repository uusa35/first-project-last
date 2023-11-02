"use client";
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
      // onSlideChange={() => console.log("slide change")}
      // onSwiper={(swiper) => console.log(swiper)}
    >
      {slides.map((s: Slide, i: number) => (
        <SwiperSlide key={i}>
          <Image
            width='1000'
            height='500'
            src={s.image}
            alt={`${process.env.NEXT_PUBLIC_BASE_URL}`}
            className='h-full w-full object-cover relative'
          />
          <div className='absolute top-0 w-full h-full bg-[#4c4c4c29] text-white px-10 py-5 flex items-end'>
            <div className='mb-10 px-5 w-full text-end'>
              <h1 className='text-md lg:text-2xl xl:text-4xl capitalize'>
                {s.name}
              </h1>
              <h4 className='text-sm lg:text-xl xl:text-2xl mt-1 lg:mt-6 capitalize'>
                {s.description}
              </h4>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
