"use client";
import React, { FC, ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import type { Locale } from "@/i18n.config";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import i18n from "@/i18n/i18next";
import { I18nextProvider } from "react-i18next";
import { resetApp } from "@/src/redux/slices/versionSlice";
type Props = {
  children: ReactNode | undefined;
  lang: Locale;
};

const MainLayout: FC<Props> = ({ lang, children }): React.ReactNode => {
  const {
    locale: { isRTL },
    version,
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (
      process.env.NEXT_PUBLIC_APP_VERSION &&
      version !== process.env.NEXT_PUBLIC_APP_VERSION
    ) {
      dispatch(resetApp());
    }
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <div className={`w-full`}>
        {children}
        <ToastContainer
          position={isRTL ? "top-left" : "top-right"}
          bodyClassName={() =>
            "flex flex-1 flex-row font-picks-medium items-center"
          }
          toastClassName={`font-picks-medium opacity-90`}
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={isRTL}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='colored'
          transition={Slide}
          limit={1}
        />
      </div>
    </I18nextProvider>
  );
};

export default MainLayout;
