"use client";
import { FC, Suspense, createContext } from "react";
import NavHeader from "./header/NavHeader";
import { Locale } from "@/types/index";
import {
  ThemeProvider,
  Button,
  Carousel,
  Typography,
} from "@material-tailwind/react";
import AppFooter from "./footer/AppFooter";
import { Setting } from "@/types/queries";
export { Button, Carousel, Typography };

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
  return (
    <MainContext.Provider value={trans}>
      {/* <ThemeProvider> */}
      {/* nav & slider */}

      <NavHeader
        lang={lang}
        searchParams={searchParams}
        mainPages={navigation}
        setting={setting}
      />
      <div>{children}</div>

      {/* <AppFooter
          mainPages={navigation}
          lang={lang}
          trans={trans}
          setting={setting}
        /> */}
      {/* </ThemeProvider> */}
    </MainContext.Provider>
  );
};

export { MainContextLayout, MainContext };
