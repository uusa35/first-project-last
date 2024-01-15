"use client";
import { FC, Suspense, createContext, useEffect } from "react";
import NavHeader from "@/components/header/NavHeader";
import { Locale, countriesList } from "@/types/index";
import AppFooter from "@/components/footer/AppFooter";
import { useParams, usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setLocale } from "@/redux/slices/localeSlice";
import moment from "moment";
import * as yup from "yup";
import {
  getAreaCookie,
  removeAreaCookie,
  setAreaCookie,
  setLang,
  setLocaleCookie,
} from "@/app/actions";
import { setCountry } from "@/redux/slices/countrySlice";
import {
  useLazyGetCountriesQuery,
  useLazyGetCountryByNameQuery,
} from "@/redux/api/countryApi";
import { useLazyGetAreasQuery } from "@/redux/api/areaApi";
import { resetArea, setArea } from "@/src/redux/slices/areaSlice";
import LoginModal from "@/src/components/modals/LoginModal";
import RegisterModal from "@/src/components/modals/RegisterModal";
import ForgetPasswordModal from "@/src/components/modals/ForgetPasswordModal";
import VerificationModal from "@/src/components/modals/VerificationModal";
import ChangePasswordModal from "@/src/components/modals/ChangePasswordModal";
import { AppQueryResult, Area, Country } from "@/src/types/queries";
import { first } from "lodash";
import { toggleSideMenu } from "@/src/redux/slices/settingSlice";
import CartMenu from "@/components/header/CartMenu";
import ProductModal from "@/src/components/modals/product/ProductModal";
import { hideProductModal } from "@/src/redux/slices/productSlice";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "@/components/LoadingSpinner";

type Props = {
  children: React.ReactNode;

  showMiddleNav?: boolean;
};

const MainContext = createContext({});
const MainContextLayout: FC<Props> = ({
  children,

  showMiddleNav = false,
}) => {
  const [t, i18n] = useTranslation("trans");
  const {
    locale,
    country: { country_code, id },
    area,
  } = useAppSelector((state) => state);
  const params: { lang: Locale["lang"]; country?: countriesList } | any =
    useParams!();
  const { lang } = params;
  const pathName = usePathname();
  const dispatch = useAppDispatch();
  const [triggerGetCountryByName, { data, isSuccess }] =
    useLazyGetCountryByNameQuery();
  const [
    triggerGetCountries,
    { data: countries, isSuccess: countriesSuccess },
  ] = useLazyGetCountriesQuery<{
    data: AppQueryResult<Country[]>;
    isSuccess: boolean;
  }>();
  const [triggerGetAreas, { data: areas }] = useLazyGetAreasQuery();

  useEffect(() => {
    if (lang || lang !== locale.lang) {
      dispatch(setLocale(lang));
      i18n.changeLanguage(lang);
      setLocaleCookie(lang);
      setLang(lang);
      moment.locale(lang);
      yup.setLocale({
        mixed: {
          required: () => t("validation.required"),
        },
        number: {
          min: ({ min }) => ({ key: t("validation.min"), values: { min } }),
          max: ({ max }) => ({ key: t("validation.max"), values: { max } }),
        },
        string: {
          email: () => t("validation.email"),
          min: ({ min }) => ({ key: t("validation.min"), values: min }),
          max: ({ max }) => ({ key: t("validation.max"), values: max }),
          matches: () => t("validation.matches"),
        },
      });
    }
  }, [lang, locale.lang]);

  // sets cookies if country changed from any page
  useEffect(() => {
    if (params?.country !== undefined) {
      triggerGetCountryByName(params?.country, false).then((r: any) => {
        if (r.data && r.data.data) {
          dispatch(setCountry(r.data.data));
        }
      });
    }
  }, [params?.country]);

  useEffect(() => {
    dispatch(toggleSideMenu(false));
    dispatch(hideProductModal());
  }, []);

  useEffect(() => {
    if (params?.country === country_code) {
      triggerGetAreas(id, false).then((r: any) => {
        if (r && r.data && r.data.success && r.data.data) {
          const serverArea: Area | undefined = first(r.data.data);
          const cookieArea: any = getAreaCookie();
          // if no area // if area.country.id !== currrent country
          if (cookieArea && cookieArea.id && cookieArea.country.id === id) {
            dispatch(setArea(cookieArea));
          } else if (area.id !== 0 && area.country.id === id) {
            dispatch(setArea(area));
            setAreaCookie(JSON.stringify(area));
          } else if (serverArea && serverArea.country.id === id) {
            dispatch(setArea(serverArea));
            setAreaCookie(JSON.stringify(serverArea));
          }
        }
      });
    } else {
      removeAreaCookie();
      dispatch(resetArea());
    }
  }, [id, lang]);

  return (
    <>
      {/* nav */}
      <NavHeader showMiddleNav={showMiddleNav} />
      <LoginModal />
      <RegisterModal />
      <ForgetPasswordModal />
      <VerificationModal />
      <ChangePasswordModal />
      <ProductModal />
      <div className='relative isolate overflow-hidden pt-14 py-8'>
        {children}
      </div>
      <AppFooter />
    </>
  );
};

export { MainContextLayout, MainContext };
