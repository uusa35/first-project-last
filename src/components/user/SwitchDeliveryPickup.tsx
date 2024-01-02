"use client";
import { setOrderType } from "@/app/actions";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { changeOrderType } from "@/src/redux/slices/settingSlice";
import { useContext } from "react";
import { MainContext } from "@/components/layouts/MainContentLayout";
import { Locale } from "@/src/types";

export default function () {
  const trans: { [key: string]: string } = useContext(MainContext);
  const locales: Locale["lang"][] = ["ar", "en"];
  const {
    locale,

    country: { country_code },
    appSetting: { orderType, sideMenuOpen },
    auth: { token },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const handleOrderType = async (orderType: "pickup" | "delivery") => {
    await setOrderType(orderType).then(() =>
      dispatch(changeOrderType(orderType))
    );
  };
  return (
    <div className='col-span-1  '>
      <div className='flex flex-row p-2 rounded-full bg-gray-100 w-full 2xl:w-1/2 '>
        <button
          className={`w-1/2 px-6 py-4 text-black rounded-full capitalize ${
            orderType === "pickup" ? "bg-white" : "bg-gray-100"
          }`}
          onClick={() => handleOrderType("pickup")}>
          {trans.pickup}
        </button>
        <button
          className={`w-1/2 px-6 py-4 text-black rounded-full capitalize ${
            orderType === "delivery" ? "bg-white" : "bg-gray-100"
          }`}
          onClick={() => handleOrderType("delivery")}>
          {trans.delivery}
        </button>
      </div>
      <div className='border rounded-xl mt-8'>
        <div className='h-60'>
          <iframe
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9549.963108841797!2d47.99048711974636!3d29.37601091875663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fcf8495dc80511d%3A0x2154751b67362718!2sOriental%20Restaurant%20Head%20Office!5e0!3m2!1sen!2skw!4v1704181535631!5m2!1sen!2skw'
            style={{
              border: 0,
              width: "100%",
              height: "100%",
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
            }}
            loading='lazy'></iframe>
        </div>
        <div className='flex flex-col w-full divide-y divide-gray-100 px-8'>
          <div className='py-8'>city</div>
          <div className='py-8'>city</div>
          <div className='py-8'>city</div>
        </div>
      </div>
    </div>
  );
}
