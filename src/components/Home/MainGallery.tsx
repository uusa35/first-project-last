"use client";
import * as React from "react";
import Image from "next/image";
import { AppQueryResult, ImageType, Setting } from "@/types/queries";
import Carousel from "better-react-carousel";

type Props = {
  images: ImageType[];
  trans: { [key: string]: string };
  setting: Setting;
};

export function MainGallery({ trans, images, setting }: Props) {
  return (
    <div className='py-12 sm:py-10 capitalize'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto  lg:mx-0 mb-10'>
          <h2 className='text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
            {trans.gallery}
          </h2>
          <p className='mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600'>
            {trans.through_this_section_you_can_browse_the_latest_news}
          </p>
        </div>
        <Carousel cols={5} rows={1} gap={10}>
          {images.map((img: any, i: number) => (
            <Carousel.Item key={i}>
              <Image
                className='aspect-[3/2] w-full rounded-2xl object-cover'
                src={img.image}
                alt={setting.name}
                width={200}
                height={200}
              />
              {/* <p>{img.name}</p> */}
            </Carousel.Item>
          ))}
        </Carousel>
        {/* <ul
          role="list"
          className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4"
        >
          {images.data.map((img: any, i: number) => (
            <li key={i}>
              <Image
                className="aspect-[3/2] w-full rounded-2xl object-cover"
                src={img.image}
                alt={setting.name}
                width={200}
                height={200}
              />
              {img.name && (
                <>
                  <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">
                    {img.name}
                  </h3>
                  <p className="text-base leading-8 text-gray-600">
                    {img.caption}
                  </p>
                </>
              )}
            </li>
          ))}
        </ul> */}
      </div>
    </div>
  );
}
