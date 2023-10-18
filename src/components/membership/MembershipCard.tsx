"use client";
import { Locale } from "@/types/index";
import { Country, Membership } from "@/types/queries";
import Image from "next/image";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import { MainContext } from "../MainContentLayout";
import { useContext } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setMembership } from "@/redux/slices/cartSlice";
import { isNull } from "lodash";
import { useRouter } from "next/navigation";
import { getPrice } from "@/src/constants";

type Props = {
  element: Membership;
  country: Country;
  lang: Locale["lang"];
};
export default function ({ element, country, lang }: Props) {
  const trans: { [key: string]: string } = useContext(MainContext);
  const dispatch = useAppDispatch();
  const {
    cart: {
      payment: { queryString, paymentUrl },
    },
    auth: { isAuth },
  } = useAppSelector((state) => state);
  const router = useRouter();
  // const messageId = "1";
  // const transactionId = random(999999, 9999999);
  // const merchantId = `RB0000002`;
  // const amount = element.price.toFixed(2);
  // const currencyCode = `840`;
  // const redirectUrl = `https://dev.ar-expo.ru/${lang}/order/result/${transactionId}`;
  // const toBeHashed = `ZGFiMzdmNGZhOWIxZDJjOTljOWZiMGE1${amount}${currencyCode}${capitalize(
  //   lang
  // )}${merchantId}${messageId}${redirectUrl}${transactionId}`;
  // const hashed: string = sha256(toBeHashed);
  // const query = `MessageID=${messageId}&TransactionID=${transactionId}&MerchantID=${merchantId}&Amount=${amount}&Language=${capitalize(
  //   lang
  // )}&CurrencyISOCode=${currencyCode}&ResponseBackURL=${redirectUrl}&SecureHash=${hashed}
  //   `;
  // console.log("price", amount);

  const handleSubscribe = (e: Membership) => {
    // will check auth first ==> go to company register
    // else set to cart
    if (isAuth) {
      dispatch(setMembership({ membership: e, country, lang }));
    } else {
      router.push(`/${lang}/login`);
    }
  };

  return (
    <div className={" ring-gray-400 rounded-3xl p-8 ring-1 xl:p-10"}>
      <h3 className={"text-gray-900 text-lg font-semibold leading-8"}>
        {element.name}
      </h3>
      <div
        className='  h-[200px] overflow-hidden text-gray-600 mt-4 text-sm leading-6'
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
          "w-full btn-color-default focus-visible:outline-green-600 mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        }>
        {isAuth ? trans.register_now_to_subscribe : trans.subscribe_now}
      </button>
      <ul
        role='list'
        className={"text-gray-600 mt-8 space-y-3 text-sm leading-6 xl:mt-10"}>
        <p>{element.caption}</p>
      </ul>
      {!isNull(queryString) && isAuth && (
        <form
          action={`${paymentUrl}${queryString}`}
          className={"border-4 bg-blue-600"}
          method='post'
          target='_blank'>
          <button type='submit'>submit</button>
        </form>
      )}
    </div>
  );
}
