"use client";
import { setOrderType } from "@/app/actions";
import { useAppDispatch } from "@/src/redux/hooks";
import { changeOrderType } from "@/src/redux/slices/settingSlice";

export default function () {
  const dispatch = useAppDispatch();
  const handleOrderType = async (orderType: "pickup" | "delivery") => {
    await setOrderType(orderType).then(() =>
      dispatch(changeOrderType(orderType))
    );
  };
  return (
    <div className='flex justify-evenly items-center'>
      <button className='btn-default' onClick={() => handleOrderType("pickup")}>
        pickup
      </button>
      <button
        className='btn-default'
        onClick={() => handleOrderType("delivery")}>
        delivery
      </button>
    </div>
  );
}
