"use client";
import { FC, createContext } from "react";
import NavHeader from "./NavHeader";
import { Locale } from "../types";

type Props = {
  children: React.ReactNode;
  trans: {};
  lang: Locale["lang"];
};

const MainContext = createContext({});
const MainContextLayout: FC<Props> = ({ children, trans , lang}) => {
  return (
    <MainContext.Provider value={trans}>
      {/* nav & slider */}
      <NavHeader lang={lang} />
      <div>{children}</div>
    </MainContext.Provider>
  );
};

export { MainContextLayout, MainContext };
