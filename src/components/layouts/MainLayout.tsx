"use client";
import React, { FC, ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setLocale } from "@/redux/slices/localeSlice";
import ToastAppContainer from "@/components/ToastAppContainer";
import moment from "moment";
import * as yup from "yup";
import type { Locale } from "@/i18n.config";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "@/i18n/i18next.d";
// import i18next from "i18next";
// import { useTranslation } from "react-i18next";

type Props = {
  children: ReactNode | undefined;
  lang: Locale;
};

type Handler = (...evts: any[]) => void;

const MainLayout: FC<Props> = ({ lang, children }): React.ReactNode => {
  const { locale } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (lang !== locale.lang) {
      dispatch(setLocale(lang));
      moment.locale(lang);
      yup.setLocale({
        mixed: {
          required: "validation.required",
        },
        number: {
          min: ({ min }) => ({ key: "validation.min", values: { min } }),
          max: ({ max }) => ({ key: "validation.max", values: { max } }),
        },
        string: {
          email: "validation.email",
          min: ({ min }) => ({ key: `validation.min`, values: min }),
          max: ({ max }) => ({ key: "validation.max", values: max }),
          matches: "validation.matches",
        },
      });
    }
  }, [lang]);

  return (
    <div className={`w-full`}>
      {children}
      <ToastContainer
        position={locale.isRTL ? "top-left" : "top-right"}
        bodyClassName={() =>
          "flex flex-1 flex-row font-tajwal-medium items-center"
        }
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={locale.isRTL}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
        transition={Slide}
        limit={1}
      />
    </div>
  );
};

export default MainLayout;
