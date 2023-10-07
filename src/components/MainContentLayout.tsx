"use client";
import { FC, createContext } from "react";
import NavHeader from "./NavHeader";
import { Locale } from "@/types/index";
import {
  ThemeProvider,
  Button,
  Carousel,
  Typography,
} from "@material-tailwind/react";
export { Button, Carousel, Typography };

type Props = {
  children: React.ReactNode;
  trans: {};
  lang: Locale["lang"];
};

const MainContext = createContext({});
const MainContextLayout: FC<Props> = ({ children, trans, lang }) => {
  return (
    <MainContext.Provider value={trans}>
      <ThemeProvider>
        {/* nav & slider */}
        <NavHeader lang={lang} />
        <div>{children}</div>
      </ThemeProvider>
    </MainContext.Provider>
  );
};

export { MainContextLayout, MainContext };
