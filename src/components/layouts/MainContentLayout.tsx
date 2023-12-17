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
  setAreaCookie,
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
import { resetArea, setArea } from "@/src/redux/slices/areaSlice";
import Image from "next/image";
import LoginModal from "@/components/models/LoginModal";
import RegisterModal from "../models/RegisterModal";
import ForgetPasswordModal from "../models/ForgetPasswordModal";
import VerificationModal from "../models/VerificationModal";
import { AppQueryResult, Area, Country } from "@/src/types/queries";
import { first } from "lodash";

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
    }
  }, [lang]);

  // sets cookies if country changed from any page
  useEffect(() => {
    if (country !== undefined) {
      triggerGetCountryByName(country, false).then((r: any) => {
        if (r.data && r.data.data) {
          dispatch(setCountry(r.data.data));
        }
      });
    }
  }, [country]);

  useEffect(() => {
    if (country === country_code) {
      triggerGetAreas(undefined, false).then((r: any) => {
        if (r && r.data && r.data.success && r.data.data) {
          const serverArea: Area | undefined = first(r.data.data);
          console.log("serverArea =====>", serverArea);
          // if no area // if area.country.id !== currrent country
          if (
            area.country.id !== id &&
            serverArea !== undefined &&
            serverArea.country
          ) {
            dispatch(setArea(serverArea));
            setAreaCookie(JSON.stringify(serverArea));
          }
        }
      });
    } else {
      removeAreaCookie();
      dispatch(resetArea());
    }
  }, [country_code, id, country]);

  console.log("country_code", country_code, id);

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
