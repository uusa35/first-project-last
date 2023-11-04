"use client";
import Image from "next/image";
import {ImageType, Setting } from "@/types/queries";
import Carousel from "better-react-carousel";
import Link from "next/link";
import DownloadPdf from "@/appIcons/home/download_pdf.svg";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { useContext } from "react";
import { MainContext } from "@/layouts/MainContentLayout";

type Props = {
  images: ImageType[];
  setting: Setting;
  message?: string;
};

export function MainGallery({ images, setting, message }: Props) {
  const trans: { [key: string]: string } = useContext(MainContext);
  return (
    <div className="py-12 sm:py-10 capitalize">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto  lg:mx-0 mb-10">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {trans.gallery}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
            {message ??
              trans.through_this_section_you_can_browse_the_latest_news}
          </p>
        </div>
        <Carousel cols={5} rows={1} gap={10}>
          {images.map((img: any, i: number) => (
            <Carousel.Item key={i}>
              <Zoom>
                <Image
                  className="aspect-[3/2] w-full rounded-2xl object-cover"
                  src={img.image}
                  alt={setting.name}
                  width={200}
                  height={200}
                />
              </Zoom>
              {/* <p>{img.name}</p> */}
            </Carousel.Item>
          ))}
        </Carousel>

        <div className='pt-10 flex justify-center'>
          <Link
            href={"#"}
            className='btn-default w-fit flex items-center gap-x-2'>
            {trans.download_the_exhibition_brochure}
            <DownloadPdf />
          </Link>
        </div>
      </div>
    </div>
  );
}
