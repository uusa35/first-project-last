"use client";
import { getPrice } from "@/src/constants";
import { Locale } from "@/types/index";
import { Country, Order } from "@/types/queries";
import { MainContext } from "../layouts/MainContentLayout";
import { useContext } from "react";

type Props = {
  order: Order;
  country: Country;
  dollarCountry: Country;
  lang: Locale["lang"];
};
export default function ({
  order,
  country,
  lang,
  dollarCountry,
}: Props): React.ReactNode {
  const trans: any = useContext(MainContext);

  return (
    <dl className='space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-500 capitalize'>
      <div className='flex justify-between'>
        <dt>{trans.total}</dt>
        <dd className='text-gray-900'>
          {getPrice(order.total, country).toFixed(2)} {country.currency_symbol}
        </dd>
      </div>

      <div className='flex justify-between'>
        <dt>{trans.discount}</dt>
        <dd className='text-gray-900'>
          {getPrice(order.discount, country).toFixed(2)}{" "}
          {country.currency_symbol}
        </dd>
      </div>

      <div className='flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900'>
        <dt className='text-base'>{trans.net_total}</dt>
        <dd className='text-base'>
          {getPrice(order.net_total, country).toFixed(2)}{" "}
          {country.currency_symbol}
        </dd>
      </div>
      {lang !== "en" && (
        <div className='flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900'>
          <dt className='text-base'>
            {trans.net_total} ({trans[dollarCountry.country_code]})
          </dt>
          <dd className='text-base'>
            {getPrice(order.net_total, dollarCountry).toFixed(2)}{" "}
            {dollarCountry.currency_symbol}
          </dd>
        </div>
      )}
    </dl>
  );
}
