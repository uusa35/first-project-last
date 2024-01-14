import test from "@/appImages/test.webp";
import Image from "next/image";
import React from "react";

type Props = {};

export default function ProductCart({}: Props) {
  return (
    <div className="py-5">
      <div className="flex justify-between items-center gap-x-5">
        <div>
          <p>French Fries</p>
          <p>Medium</p>
          <p>"Please do not add ketchup or any other..”</p>
        </div>
        <Image
          className=" w-1/4 h-auto aspect-square"
          src={test.src}
          alt="cart product"
          width={100}
          height={100}
        />
      </div>

      <div className="flex justify-between items-center">
        <p>quantity meter</p>
        <p>2.00 KD</p>
      </div>
    </div>
  );
}
