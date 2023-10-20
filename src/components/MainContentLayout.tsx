"use client";
import { FC, createContext } from "react";
import NavHeader from "./header/NavHeader";
import { Locale } from "@/types/index";
import {
  ThemeProvider,
  Button,
  Carousel,
  Typography,
} from "@material-tailwind/react";
import AppFooter from "./footer/AppFooter";
import { usePathname } from "next/navigation";
export { Button, Carousel, Typography };


type Props = {
  children: React.ReactNode;
  trans: { [key: string]: string };
  lang: Locale["lang"];
  searchParams: { [key: string]: string } | string;
};

const MainContext = createContext({});
const MainContextLayout: FC<Props> = ({
  children,
  trans,
  lang,
  searchParams = ``,
}) => {
  const pathName = usePathname();
  console.log(pathName)
  const navigation = [
    { name: trans.home, href: `/${lang}` },
    { name: trans.subscribers, href: `/${lang}/user?membership=subscription` },
    { name: trans.sponsors, href: `/${lang}/user?membership=sponsorship` },
    { name: trans.posts, href: `/${lang}/post` },
    { name: trans.aboutus, href: `/${lang}/aboutus` },
    { name: trans.contactus, href: `/${lang}/contactus` },
  ];
  return (
    <MainContext.Provider value={trans}>
      <ThemeProvider>
        {/* nav & slider */}
        <NavHeader
          lang={lang}
          searchParams={searchParams}
          mainPages={navigation}
        />
        <div>{children}</div>
        {!pathName?.includes("login")&& <AppFooter mainPages={navigation} />}
        
      </ThemeProvider>
    </MainContext.Provider>
  );
};

export { MainContextLayout, MainContext };
