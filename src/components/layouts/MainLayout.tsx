"use client";
import React, { FC, ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import type { Locale } from "@/i18n.config";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { isNull } from "lodash";
import { showWarningToastMessage } from "@/redux/slices/toastMessageSlice";

type Props = {
  children: ReactNode | undefined;
  lang: Locale;
};

const MainLayout: FC<Props> = ({ lang, children }): React.ReactNode => {
  const {
    locale,
    auth: { api_token, id },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  return (
    <div className={`w-full`}>
      {children}
      <ToastContainer
        position={locale.isRTL ? "top-left" : "top-right"}
        bodyClassName={() =>
          "flex flex-1 flex-row font-expo-medium items-center"
        }
        toastClassName={`font-expo-medium opacity-90`}
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
