"use client";
import { ReactNode, useContext } from "react";
import RightArrow from "@/appIcons/landing/right_arrow.svg";
import downloadApp from "@/appImages/landing_download_app.png";
import Image, { StaticImageData } from "next/image";
import No_order_calls from "@/appIcons/landing/no_order_calls.svg";
import Flash_offers from "@/appIcons/landing/flash_offers.svg";
import Tracking_orders from "@/appIcons/landing/tracking_orders.svg";
import GooglePlay from "@/appIcons/landing/download_google_play.svg";
import AppleStore from "@/appIcons/landing/download_apple_store.svg";
import AppGallery from "@/appIcons/landing/download_app_gallery.svg";
import about_us from "@/appImages/about_us.png";
import get_started from "@/appImages/get_started.jpg";
import { MainContext } from "../layouts/MainContentLayout";

type Props = {};

export default function DownloadAppSection({}: Props) {
  const trans: { [key: string]: string } = useContext(MainContext);

  const FeatureComponent = ({
    icon,
    title,
    text,
  }: {
    icon: ReactNode;
    title: string;
    text: string;
  }) => {
    return (
      <div className='flex gap-x-8 mb-7'>
        {icon}
        <div className='w-2/3'>
          <p className='font-semibold'>{title}</p>
          <p className='text-sm md:text-md text-gray-600 my-1 leading-loose'>
            {text}
          </p>
        </div>
      </div>
    );
  };

  const CardComponent = ({
    title,
    text,
    imageSrc,
    btnText,
  }: {
    title: string;
    text: string;
    imageSrc: StaticImageData;
    btnText: string;
  }) => {
    return (
      <div className='text-white w-full h-auto aspect-[1/1] max-w-[50rem] max-h-[25rem] rounded-lg relative'>
        <Image
          alt='about_us'
          src={imageSrc}
          width={1000}
          height={1000}
          className='w-full h-full rounded-lg'
          unoptimized
        />
        {/* overlay */}
        <div className='flex items-end rounded-lg absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50'>
          <div className='p-5 h-fit'>
            <p className='text-lg font-semibold'>{title}</p>
            <p className='text-sm py-2'>{text}</p>
            <button className='flex items-center gap-x-2 rounded-lg p-2 bg-white text-black'>
              <span className='whitespace-nowrap'>{btnText}</span>
              <RightArrow stroke='#02C9C0' />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='bg-white p-2 md:p-10'>
      {/* download app section*/}
      <div className='grid grid-cols-1  md:grid-cols-2 place-items-center  gap-x-3 max-h-[auto]  md:max-h-[100vh]'>
        {/* text */}
        <div className='col-span-1 order-2 md:order-1'>
          <div className='order-2 md:order-1 h-full flex flex-col justify-center max-w-[50rem]'>
            <p className='text-xl font-semibold mb-5'>
              Discover the new <span className='text-picks-dark'>Picks</span>{" "}
              app
            </p>
            <FeatureComponent
              icon={<Flash_offers className='w-14 h-14' />}
              title='Flash & Daliy offers'
              text=' No specific day or specific time! Our offers are available
                  throughout the week on all items and restaurants.'
            />

            <FeatureComponent
              icon={<No_order_calls className='w-14 h-14' />}
              title='Flash & Daliy offers'
              text=' No specific day or specific time! Our offers are available
                  throughout the week on all items and restaurants.'
            />

            <FeatureComponent
              icon={<Tracking_orders className='w-14 h-14' />}
              title='Flash & Daliy offers'
              text=' No specific day or specific time! Our offers are available
                  throughout the week on all items and restaurants.'
            />

            <div className='flex gap-x-3 items-center w-full'>
              <button>
                <GooglePlay className='w-full h-24' />
              </button>
              <button>
                <AppleStore className='w-full h-24' />
              </button>
              <button>
                <AppGallery className='w-full h-24' />
              </button>
            </div>
          </div>
        </div>

        {/* image */}
        <div className='col-span-1 order-1 md:order-2 flex justify-center md:justify-end'>
          <Image
            alt='download app'
            src={downloadApp}
            width={1000}
            height={1000}
            className='w-auto md:w-[550px] h-auto object-cover'
          />
        </div>
      </div>

      {/* aboutus getstarted */}
      <div className='grid grid-cols-2 gap-x-5 place-items-center'>
        <CardComponent
          title='Partner with us'
          imageSrc={get_started}
          text='Join Picks and reach more customers than ever.
We handle delivery, so you can focus on the food.'
          btnText='Get started'
        />
        <CardComponent
          title='Everything you crave, delivered.'
          imageSrc={about_us}
          text=' Looking for your breakfast,snaks or any food offers near to
                  you ,we bring all of this closer to you with just a click of a
                  button.'
          btnText='About us'
        />
      </div>
    </div>
  );
}
