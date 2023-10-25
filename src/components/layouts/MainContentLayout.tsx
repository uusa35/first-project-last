"use client";
import { FC, createContext, useEffect } from "react";
import NavHeader from "@/components/header/NavHeader";
import { Locale } from "@/types/index";

import AppFooter from "@/components/footer/AppFooter";
import { usePathname } from "next/navigation";
import { Setting } from "@/types/queries";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setLocale } from "@/redux/slices/localeSlice";
import moment from "moment";
import * as yup from "yup";

type Props = {
  children: React.ReactNode;
  trans: { [key: string]: string };
  lang: Locale["lang"];
  searchParams: { [key: string]: string } | string;
  setting: Setting;
};

const MainContext = createContext({});
const MainContextLayout: FC<Props> = ({
  children,
  trans,
  lang,
  searchParams = ``,
  setting,
}) => {
  const { locale } = useAppSelector((state) => state);
  const pathName = usePathname();
  const dispatch = useAppDispatch();
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
    if (lang !== locale.lang) {
      dispatch(setLocale(lang));
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

  return (
    <MainContext.Provider value={trans}>
      {/* nav & slider */}
      <NavHeader
        lang={lang}
        searchParams={searchParams}
        mainPages={navigation}
        setting={setting}
      />
      <div>{children}</div>
      <AppFooter
        mainPages={navigation}
        lang={lang}
        trans={trans}
        setting={setting}
      />
    </MainContext.Provider>
  );
};

export { MainContextLayout, MainContext };
