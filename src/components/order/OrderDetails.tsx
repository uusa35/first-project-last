"use client";
import { getPrice } from "@/src/constants";
import { Locale } from "@/types/index";
import { Country, Order } from "@/types/queries";
import { MainContext } from "../MainContentLayout";
import { useContext } from "react";

type Props = {
  order: Order;
  country: Country;
  lang: Locale["lang"];
};
export default function ({ order, country, lang }: Props): React.ReactNode {
  const { total, net_total, discount }: any = useContext(MainContext);
  const currentCountry = country[0];
  return (
    <dl className='space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-500 capitalize'>
      <div className='flex justify-between'>
        <dt>{total}</dt>
        <dd className='text-gray-900'>
          {getPrice(order.total, currentCountry).toFixed(2)}{" "}
          {currentCountry.currency_symbol}
        </dd>
      </div>

      <div className='flex justify-between'>
        <dt>{discount}</dt>
        <dd className='text-gray-900'>
          {getPrice(order.discount, currentCountry).toFixed(2)}{" "}
          {currentCountry.currency_symbol}
        </dd>
      </div>

      <div className='flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900'>
        <dt className='text-base'>{net_total}</dt>
        <dd className='text-base'>
          {getPrice(order.net_total, currentCountry).toFixed(2)}{" "}
          {currentCountry.currency_symbol}
        </dd>
      </div>
    </dl>
  );
}
