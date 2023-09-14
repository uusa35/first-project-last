"use client";
import { FC, createContext } from "react";
import SideMenu from "./SideMenu";
import MainAside from "./MainAside";

type Props = {
  children: React.ReactNode;
  trans: {};
};
const MainContext = createContext({});
const MainContextLayout: FC<Props> = ({ children, trans }) => {
  return (
    <MainContext.Provider value={trans}>
      {/* <div className='flex flex-row'>
        <SideMenu /> */}
        {/* <NavHeader lang={params.lang} /> */}
        {/* <main className='w-full md:w-1/2 lg:w-5/12 xl:w-1/3 min-h-screen '>
          <section className='mx-auto flex justify-center items-center mt-14 px-4 sm:px-6 lg:px-8 lg:py-6 '> */}
            {children}
          {/* </section>
        </main>
        <MainAside />
      </div> */}
    </MainContext.Provider>
  );
};

export { MainContextLayout, MainContext };
