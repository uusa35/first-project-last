import Favourite from "@/appIcons/landing/favourite.svg";
import NotFavourite from "@/appIcons/landing/not_favourite.svg";
import { Product } from "@/src/types/queries";
import Image from "next/image";
import React from "react";

type Props = {
  product: Product;
};

export default function ProductWidget({ product }: Props) {
  return (
    <div className="relative">
      <Image
        alt={product.name}
        src={product.image}
        width={1000}
        height={1000}
        className="w-full h-auto aspect-[2/1] rounded-lg"
      />
      <div className="w-full h-auto aspect-[2/1] absolute bg-black bg-opacity-20 top-0 bottom-0 left-0 right-0 rounded-lg py-3 px-2">
        <div className="flex justify-between items-center">
          <p className="rounded-xl px-2 py-1 bg-picks-dark h-fit text-xs font-light">
            Open Now
          </p>
          {product.favorite ? (
            <Favourite className="h-7 w-7" />
          ) : (
            <NotFavourite className="h-7 w-7" />
          )}
        </div>
      </div>
      <div className="mt-2">
        <p>
          {product.name} <span>{product.percentage}</span>
        </p>
        <p>{product.description}</p>
      </div>
    </div>
  );
}
