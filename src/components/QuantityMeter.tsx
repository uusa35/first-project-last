import React from 'react'

type Props = {
  product: number;
};

export default function QuantityMeter({ product }: Props) {
    const handleIncDecRmvrement=({type}:{type:"inc"| "dec"})=>{
        if(type === "inc"){

        }else{
            // remove
            // if(product.qty === 1){

            // }
            
            // else{

            // }
        }
    }
  return (
    <div className={`flex items-center gap-x-2`}>
      <div
        onClick={() => {}}
        className="rounded-full text-white cursor-pointer  w-5 h-5 flex items-center justify-center base-mobile-lg-desktop"
      >
        -
      </div>
      <label className="flex items-center px-1">{product}</label>
      <div
        onClick={() => {}}
        className="rounded-full text-white cursor-pointer w-5 h-5 flex items-center justify-center base-mobile-lg-desktop"
      >
        +
      </div>
    </div>
  );
}