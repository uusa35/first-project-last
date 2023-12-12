"use client";
import Favourite from "@/appIcons/landing/favourite.svg";
import NotFavourite from "@/appIcons/landing/not_favourite.svg";
import { appLinks } from "@/src/links";
import { Locale, countriesList } from "@/src/types";
import { Product } from "@/src/types/queries";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  product: Product;
  lang: Locale["lang"];
  country: countriesList;
};

export default function ProductWidget({ product, lang, country }: Props) {
  return (
    <div className='relative rtl:text-right ltr:text-left'>
      <Image
        alt={product.name}
        src={product.image}
        width={1000}
        height={1000}
        className='w-full h-auto aspect-[2/1] object-contain rounded-lg'
      />
      <div className='w-full h-auto aspect-[2/1] absolute bg-black bg-opacity-20 top-0 bottom-0 left-0 right-0 rounded-lg py-3 px-2'>
        <div className='flex justify-between items-center'>
          <Link
            href={appLinks.offer(
              lang,
              country,
              product.id.toString(),
              product.name
            )}>
            <p className='rounded-xl px-2 py-1 bg-picks-dark h-fit text-xs font-light text-white'>
              Open Now
            </p>
          </Link>
          {product.favorite ? (
            <Favourite className='h-7 w-7' />
          ) : (
            <NotFavourite className='h-7 w-7' />
          )}
        </div>
      </div>
      <Link
        href={appLinks.offer(
          lang,
          country,
          product.id.toString(),
          product.name
        )}
        className='mt-2 space-y-2 '>
        <p className='font-extrabold mt-4'>
          {product.name} <span>{product.percentage}</span>
        </p>
        <p className='truncate'>{product.description}</p>
      </Link>
    </div>
  );
}
