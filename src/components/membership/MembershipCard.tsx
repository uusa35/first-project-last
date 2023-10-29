"use client";
import { Locale } from "@/types/index";
import { Country, Membership } from "@/types/queries";
import DOMPurify from "isomorphic-dompurify";
import { MainContext } from "@/layouts/MainContentLayout";
import { useContext } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { getPrice } from "@/src/constants";
import { isAuthenticated } from "@/redux/slices/authSlice";

type Props = {
  element: Membership;
  country: Country;
  lang: Locale["lang"];
};
export default function ({ element, country, lang }: Props) {
  const trans: { [key: string]: string } = useContext(MainContext);
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(isAuthenticated);
  const {
    cart: {
      payment: { queryString, paymentUrl },
    },
  } = useAppSelector((state) => state);
  const router = useRouter();

  const handleSubscribe = (e: Membership) => {
    if (isAuth) {
      router.push(`/${lang}/cart/${e.id}`);
    } else {
      router.push(`/${lang}/login`);
    }
  };

  return (
    <div
      className={
        " ring-gray-200 rounded-md p-8 ring-1 xl:p-10 bg-white transform transition duration-500 hover:scale-110 hover:z-10"
      }>
      <h3 className={"text-gray-900 text-lg font-semibold leading-8"}>
        {element.name}
      </h3>
      <div
        className='h-[200px] max-w-xs sm:max-w-xl md:max-w-full whitespace-pre-line text-ellipsis overflow-hidden'
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(element.description),
        }}
      />
      <div className='flex flex-1 flex-row gap-x-3 justify-start items-end'>
        {element.on_sale && (
          <p className='mt-6  flex items-baseline gap-x-1'>
            <span className={"text-red-800 text-4xl font-bold tracking-tight"}>
              {getPrice(element.sale_price, country).toFixed(2)}
            </span>
            <span className={"text-red-900 text-lg font-semibold leading-6"}>
              {country.currency_symbol}
            </span>
          </p>
        )}
        <p className='mt-6  flex items-baseline gap-x-1'>
          <span
            className={`text-gray-900 ${
              element.on_sale ? `text-xl line-through` : `text-4xl`
            }  font-bold tracking-tight`}>
            {getPrice(element.price, country).toFixed(2)}
          </span>
          <span className={"text-gray-600 text-lg font-semibold leading-6"}>
            {country.currency_symbol}
          </span>
        </p>
      </div>

      <button
        type='button'
        onClick={() => handleSubscribe(element)}
        className={
          "w-full text-expo-dark border border-expo-dark focus-visible:outline-green-600 mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        }>
        {isAuth ? trans.register_now_to_subscribe : trans.subscribe_now}
      </button>
      {/* <ul
        role="list"
        className={"text-gray-600 mt-8 space-y-3 text-sm leading-6 xl:mt-10"}
      >
        <p>{element.caption}</p>
      </ul> */}
    </div>
  );
}
