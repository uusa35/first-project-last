"use client";
import { FC, createContext, useEffect } from "react";
import NavHeader from "@/components/header/NavHeader";
import { Locale, countriesList } from "@/types/index";
import AppFooter from "@/components/footer/AppFooter";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setLocale } from "@/redux/slices/localeSlice";
import moment from "moment";
import * as yup from "yup";
import {
  deleteToken,
  removeAreaCookie,
  setCountryCookie,
  setCountryNameCookie,
  setLang,
  setLocaleCookie,
} from "@/app/actions";
import { setCountry } from "@/redux/slices/countrySlice";
import { useLazyGetCountryByNameQuery } from "@/redux/api/countryApi";
import { useLazyGetAreasQuery } from "@/redux/api/areaApi";
import { resetArea } from "@/src/redux/slices/areaSlice";
import Image from "next/image";

type Props = {
  children: React.ReactNode;
  trans: { [key: string]: string };
  lang: Locale["lang"];
  country?: countriesList | string;
  showBg?: boolean;
};

const MainContext = createContext({});
const MainContextLayout: FC<Props> = ({
  children,
  trans,
  lang,
  country = undefined,
  showBg = false,
}) => {
  const {
    locale,
    country: { country_code },
  } = useAppSelector((state) => state);
  const pathName = usePathname();
  const dispatch = useAppDispatch();
  const [triggerGetCountryByName, { data, isSuccess }] =
    useLazyGetCountryByNameQuery();
  const [triggerGetAreas, { data: areas }] = useLazyGetAreasQuery();
  const navigation = [
    { name: trans.home, href: `/${lang}`, label: `home` },
    {
      name: trans.subscribers,
      href: `/${lang}/user?membership=subscription`,
      label: "subscription",
    },
    {
      name: trans.sponsors,
      href: `/${lang}/user?membership=sponsorship`,
      label: "sponsorship",
    },
    { name: trans.posts, href: `/${lang}/post`, label: "post" },
    { name: trans.aboutus, href: `/${lang}/aboutus`, label: "aboutus" },
    { name: trans.contactus, href: `/${lang}/contactus`, label: "contactus" },
  ];

  useEffect(() => {
    if (lang || lang !== locale.lang) {
      dispatch(setLocale(lang));
      setLocaleCookie(lang);
      setLang(lang);
      moment.locale(lang);
      yup.setLocale({
        mixed: {
          required: trans["validation.required"],
        },
        number: {
          min: ({ min }) => ({ key: trans["validation.min"], values: { min } }),
          max: ({ max }) => ({ key: trans["validation.max"], values: { max } }),
        },
        string: {
          email: trans["validation.email"],
          min: ({ min }) => ({ key: trans["validation.min"], values: min }),
          max: ({ max }) => ({ key: trans["validation.max"], values: max }),
          matches: trans["validation.matches"],
        },
      });
    }
  }, [lang]);

  // sets cookies if country changed from any page
  useEffect(() => {
    if (country !== undefined) {
      triggerGetCountryByName(country, false).then((r: any) => {
        if (r.data && r.data.data) {
          // setCountryCookie(JSON.stringify(r.data.data));
          // setCountryNameCookie(country);
          dispatch(setCountry(r.data.data));
          triggerGetAreas(undefined, false).then(() => {
            removeAreaCookie();
            dispatch(resetArea());
          });
        }
      });
    }
  }, [country]);

  return (
    <MainContext.Provider value={trans}>
      {/* nav */}
      <NavHeader lang={lang} showBg={showBg} />
      <div className='relative isolate overflow-hidden pt-14'>
        {showBg && (
          <Image
            src='https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2830&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply'
            alt='testing'
            width={1000}
            height={1000}
            className='absolute inset-0 -z-10 h-full w-full object-cover'
          />
        )}

        {/* <div
          className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'
          aria-hidden='true'>
          <div
            className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div> */}
        {children}
        {/* <div
          className='absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]'
          aria-hidden='true'> */}
        {/* <div
            className='relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]'
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}></div> */}
        {/* </div> */}
      </div>
      <AppFooter />
    </MainContext.Provider>
  );
};

export { MainContextLayout, MainContext };
