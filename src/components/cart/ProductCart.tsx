import test from "@/appImages/test.webp";
import Image from "next/image";
import React from "react";
import QuantityMeter from "../QuantityMeter";

type Props = {};

export default function ProductCart({}: Props) {
  return (
    <div className="py-5">
      <div className="flex justify-between items-center gap-x-5 overflow-hidden">
        <div className="max-w-[70%]">
          <p className="text-semibold truncate">
            French Fries
          </p>
          <p className="text-picks-text-gray text-xs truncate">Medium</p>
          <p className="text-picks-text-gray text-xs truncate">
            "Please do not add ketchup or any other..”
          </p>
        </div>
        <Image
          className="w-[70px] h-[70px] aspect-[auto 70 / 70]"
          src={test.src}
          alt="cart product"
          width={100}
          height={100}
        />
      </div>

      <div className="flex justify-between items-center pt-5">
        <QuantityMeter product={{ quantity: 1 }} />
        <p>2.00 KD</p>
      </div>
    </div>
  );
}
