import React from "react";
import Delete from "@/appIcons/cart/delete.svg";

type Props = {
  product: { quantity: number };
};

export default function quantityMeter({ product }: Props) {
  const handleIncDecRmvrement = ({ type }: { type: "inc" | "dec" }) => {
    if (type === "inc") {
    } else {
      // remove
      // if(product.qty === 1){
      // }
      // else{
      // }
    }
  };
  return (
    <div
      className={`flex flex-row gap-x-2 rounded-full bg-[#F7F7F7] p-1 text-picks-dark`}
    >
      <button
        onClick={() => handleIncDecRmvrement({ type: "inc" })}
        // disabled={product.quantity === data.data.stock}
        className={`${
          product.quantity === 0 && `opacity-60`
        } bg-white flex justify-center items-center w-6 h-6 rounded-full`}
      >
        +
      </button>

      <div className="flex justify-center items-center text-black w-6 h-6 rounded-full">
        {product.quantity}
      </div>

      <button
        disabled={product.quantity === 0}
        onClick={() => handleIncDecRmvrement({ type: "dec" })}
        className={`${
          product.quantity === 0 && `opacity-60`
        } bg-white  flex justify-center items-center w-6 h-6 rounded-full`}
      >
        {product.quantity === 1 ? <Delete /> : "-"}
      </button>
    </div>
  );
}
