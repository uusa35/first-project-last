"use client";
import { FC, Suspense, createContext, useEffect } from "react";
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
import {
  useLazyGetCountriesQuery,
  useLazyGetCountryByNameQuery,
} from "@/redux/api/countryApi";
import { useLazyGetAreasQuery } from "@/redux/api/areaApi";
import { resetArea } from "@/src/redux/slices/areaSlice";
import Image from "next/image";
import LoginModal from "@/components/models/LoginModal";
import RegisterModal from "../models/RegisterModal";
import ForgetPasswordModal from "../models/ForgetPasswordModal";
import VerificationModal from "../models/VerificationModal";
import { AppQueryResult, Country } from "@/src/types/queries";

type Props = {
  children: React.ReactNode;
  trans: { [key: string]: string };
  lang: Locale["lang"];
  country: countriesList;
  showMiddleNav?: boolean;
};

const MainContext = createContext({});
const MainContextLayout: FC<Props> = ({
  children,
  trans,
  lang,
  country,
  showMiddleNav = false,
}) => {
  const {
    locale,
    country: { country_code, id },
    area,
  } = useAppSelector((state) => state);
  const pathName = usePathname();
  const dispatch = useAppDispatch();
  const [triggerGetCountryByName, { data, isSuccess }] =
    useLazyGetCountryByNameQuery();
  const [
    triggerGetCountries,
    { data: countries, isSuccess: countriesSuccess },
  ] = useLazyGetCountriesQuery<{
    data: AppQueryResult<Country[]>;
    isSuccess: boolean;
  }>();

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
      triggerGetCountries(undefined, false);
    }
  }, [lang]);

  // sets cookies if country changed from any page
  useEffect(() => {
    // if (country !== undefined && (country !== country_code || id === 0)) {
    if (country !== undefined) {
      console.log("fired from useEffect");
      triggerGetCountryByName(country, false).then((r: any) => {
        if (r.data && r.data.data) {
          dispatch(setCountry(r.data.data));
          triggerGetAreas(undefined, lang !== locale.lang).then(() => {
            if (area.country.id !== r.data.data.id) {
              removeAreaCookie();
              dispatch(resetArea());
            }
          });
        }
      });
    }
  }, [country]);

  return (
    <MainContext.Provider value={trans}>
      {/* nav */}
      <NavHeader lang={lang} showMiddleNav={showMiddleNav} country={country} />
      <Suspense>
        <LoginModal />
        <RegisterModal />
        <ForgetPasswordModal />
        <VerificationModal />
      </Suspense>
      <div className='relative isolate overflow-hidden pt-14 py-8'>
        {children}
      </div>
      <AppFooter />
    </MainContext.Provider>
  );
};

export { MainContextLayout, MainContext };
