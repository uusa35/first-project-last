"use client";
import React, { FC, ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setLocale } from "@/redux/slices/localeSlice";
import ToastAppContainer from "@/components/ToastAppContainer";
import moment from "moment";
import * as yup from "yup";
import type { Locale } from "@/i18n.config";
import { Setting } from "@/types/queries";

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
    }
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
  }, [lang]);

  return (
    <div className={`w-full`}>
      {children}
      <ToastAppContainer />
    </div>
  );
};

export default MainLayout;
