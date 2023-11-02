"use client";
import { Locale } from "@/types/index";
import { Country, Membership } from "@/types/queries";
import DOMPurify from "isomorphic-dompurify";
import { getPrice } from "@/src/constants";
import Link from "next/link";
import { appLinks } from "@/src/links";
import { useAppSelector } from "@/redux/hooks";
import { isAuthenticated } from "@/redux/slices/authSlice";
import { isEmpty } from "lodash";

type Props = {
  element: Membership;
  country: Country;
  lang: Locale["lang"];
  scaleOnHover?: boolean;
  scaleMiddle?: boolean;
  showMore?: boolean;

  trans: { [key: string]: string };
};
export default function ({
  element,
  country,
  lang,
  scaleMiddle = false,
  scaleOnHover = true,
  showMore = false,

  trans,
}: Props) {
  const isAuth = useAppSelector(isAuthenticated);
  const {
    auth: { id, role, deals },
  } = useAppSelector((state) => state);
  return (
    <div
      className={`ring-gray-200 rounded-md p-8 ring-1 xl:p-10 bg-white flex flex-col justify-between gap-y-5  ${
        scaleOnHover
          ? "transform transition duration-500 hover:scale-110 hover:z-10"
          : scaleMiddle
          ? "transform transition duration-500 md:scale-110 -translate-y-2 shadow-xl"
          : "shadow-md"
      }`}>
      <div>
        <div className='flex justify-between items-center mb-3'>
          <div className='flex flex-1 justify-start items-center'>
            <h3 className={"text-gray-900 text-lg font-semibold leading-8"}>
              {element.name}
            </h3>
          </div>
          {element.is_featured && (
            <div>
              <span
                className={
                  "p-2 bg-expo-light text-expo-dark hover:text-white hover:bg-expo-dark text-center rounded-md text-xs"
                }>
                {trans.featured}
              </span>
            </div>
          )}
        </div>
        <div
          className='my-4 h-[300px] max-w-xs sm:max-w-xl md:max-w-full whitespace-pre-line text-ellipsis overflow-hidden'
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(element.description),
          }}
        />
      </div>
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

      {isAuth && !isEmpty(deals) && (
        <Link
          className={"w-full btn-transparent capitalize"}
          href={appLinks.account(lang, role.name, id, 2)}>
          {trans.upgrade_your_account}
        </Link>
      )}

      {!isAuth && (
        <Link
          className={"w-full btn-transparent capitalize"}
          href={appLinks.login(lang)}>
          {trans.subscribe_now}
        </Link>
      )}

      {showMore && (
        <Link
          href={appLinks.membershipShow(lang, element.id, element.name)}
          className={"w-full btn-transparent capitalize"}>
          {trans.more_details}
        </Link>
      )}

      {element.caption && (
        <ul role='list' className={"text-gray-600 text-sm leading-6 mt-4"}>
          <p>{element.caption}</p>
        </ul>
      )}
    </div>
  );
}
