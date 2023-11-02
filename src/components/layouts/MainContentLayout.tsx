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
import { isNull } from "lodash";
import { deleteToken, setLang, setLocaleCookie, setToken } from "@/app/actions";

type Props = {
  children: React.ReactNode;
  trans: { [key: string]: string };
  lang: Locale["lang"];
  setting: Setting;
};

const MainContext = createContext({});
const MainContextLayout: FC<Props> = ({ children, trans, lang, setting }) => {
  const {
    locale,
    auth: { api_token },
  } = useAppSelector((state) => state);
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

  useEffect(() => {
    if (isNull(api_token)) {
      deleteToken();
    } else {
      setToken(api_token);
    }
  }, [api_token]);

  return (
    <MainContext.Provider value={trans}>
      {/* nav & slider */}
      <NavHeader lang={lang} mainPages={navigation} setting={setting} />
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
