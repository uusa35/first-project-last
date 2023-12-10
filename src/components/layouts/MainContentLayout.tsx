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

type Props = {
  children: React.ReactNode;
  trans: { [key: string]: string };
  lang: Locale["lang"];
  country?: countriesList;
};

const MainContext = createContext({});
const MainContextLayout: FC<Props> = ({
  children,
  trans,
  lang,
  country = undefined,
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
        if (
          r.data &&
          r.data.data &&
          (country_code !== country || lang !== locale.lang)
        ) {
          setCountryCookie(JSON.stringify(r.data.data));
          setCountryNameCookie(country);
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
      <NavHeader lang={lang} />
      <div>{children}</div>
      <AppFooter />
    </MainContext.Provider>
  );
};

export { MainContextLayout, MainContext };
