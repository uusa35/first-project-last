"use client";
import Flash from "@/appIcons/landing/flash.svg";
import { Product } from "@/src/types/queries";
import Image from "next/image";
import React, { useContext } from "react";
import FavouriteWidget from "@/components/widgets/FavouriteWidget";
import { Locale, countriesList } from "@/src/types";
import { MainContext } from "../layouts/MainContentLayout";
import Link from "next/link";
import { appLinks } from "@/src/links";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { useParams } from "next/navigation";
import {
  hideProductModal,
  showProductModal,
} from "@/src/redux/slices/settingSlice";
import { useLazyGetProductQuery } from "@/src/redux/api/productApi";

type Props = {
  product: Product;
};

export default function OfferWidget({ product }: Props) {
  const trans: { [key: string]: string } = useContext(MainContext);
  const dispatch = useAppDispatch();
  const params: { lang: Locale["lang"]; country?: countriesList } | any =
    useParams!();
  const { lang } = params;
  const [triggerGetProduct, { data, isSuccess, isFetching }] =
    useLazyGetProductQuery();

  const handleClick = async (id: number) => {
    await triggerGetProduct(id, true).then((r) => {
      if (r.data && r.data.success) {
        dispatch(showProductModal(id));
      } else {
        dispatch(hideProductModal());
      }
    });
  };

  return (
    <div>
      <div className='relative rtl:text-right ltr:text-left'>
        <div
          onClick={() => handleClick(product.id)}
          // href={appLinks.offer(
          //   lang,
          //   params?.country,
          //   product.id.toString(),
          //   product.name
          // )}
        >
          <Image
            alt={product.name || ""}
            src={product.image}
            width={1000}
            height={1000}
            className='w-full h-auto aspect-[2/1] object-cover rounded-lg'
          />
        </div>
        <div className='w-full h-auto aspect-[2/1] absolute bg-black bg-opacity-20 top-0 bottom-0 left-0 right-0 rounded-lg py-3 px-2'>
          <div className='flex flex-col justify-between items-end h-[80%]'>
            <div className='flex justify-between items-center w-full'>
              <div>
                <div>
                  {/* timer */}
                  {/* <p>{product.}</p> */}
                </div>
                <div>
                  <p className='rounded-full bg-[#FF8A59] text-xs text-white px-2 py-px pt-1'>
                    {product.percentage}
                  </p>
                </div>
              </div>
              <FavouriteWidget isFav={product.favorite} />
            </div>

            {/* offer type */}
            <div className='flex items-center gap-x-1 rounded-full bg-[#232323] text-xs text-white px-2 py-px pt-1 w-fit'>
              <Flash />
              <p>{trans["️flash_offer"]}</p>
            </div>
          </div>
        </div>
        <div onClick={() => handleClick(product.id)}>
          <div className='bg-white -mt-[10%] rounded-lg p-3 relative w-full space-y-2'>
            <p className='card-title'>{product.name}</p>
            <p className='card-desc'>{product.description}</p>
            {/* price */}
            <div
              className='text-sm text-picks-text-gray flex gap-x-2 items-center flex-wrap'
              dir={lang === "ar" ? "rtl" : "ltr"}>
              <p className='bg-picks-dark text-white rounded-full px-2 py-px pt-1'>
                {product.new_price}
              </p>
              <p className='line-through'>{product.price}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
