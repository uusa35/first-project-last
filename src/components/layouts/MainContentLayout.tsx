"use client";
import { FC, createContext, useEffect } from "react";
import NavHeader from "@/components/header/NavHeader";
import { Locale, countriesList } from "@/types/index";
import { useParams, usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setLocale } from "@/redux/slices/localeSlice";
import moment from "moment";
import * as yup from "yup";
import {
  getAreaCookie,
  getCountryCookie,
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
import { first, isUndefined } from "lodash";
import { toggleSideMenu } from "@/src/redux/slices/settingSlice";
import ProductModal from "@/src/components/modals/product/ProductModal";
import { hideProductModal } from "@/src/redux/slices/productSlice";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";
import { useCookies } from "react-cookie";

const DynamicAppFooter = dynamic(
  () => import("@/components/footer/AppFooter"),
  {
    ssr: false,
    // loading: () => <LoadingSpinner isLoading={true} />,
  }
);
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
  const [cookies] = useCookies();
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
  }, [lang, locale.lang]);

  // sets cookies if country changed from any page
  useEffect(() => {
    if (params && params.country !== undefined) {
      triggerGetCountryByName(params.country, false).then((r: any) => {
        if (r.data && r.data.data) {
          dispatch(setCountry(r.data.data));
          // country cookie already set by Middleware
        }
      });
    }
  }, [params?.country]);

  useEffect(() => {
    dispatch(hideProductModal());
    dispatch(toggleSideMenu(false));
  }, []);

  useEffect(() => {
    const cookieArea = cookies.NEXT_AREA;
    if (!cookieArea || area.id === 0) {
      triggerGetAreas(id, false).then((r: any) => {
        if (r && r.data && r.data.success && r.data.data) {
          const serverArea: Area | undefined = first(r.data.data);
          const countryCookie = cookies.NEXT_COUNTRY;
          // if no area // if area.country.id !== currrent country
          if (
            countryCookie &&
            countryCookie.id &&
            countryCookie.id === id &&
            serverArea
          ) {
            console.log("case 1 area");
            dispatch(setArea(serverArea));
          }
        }
      });
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
      <DynamicAppFooter />
    </>
  );
};

export { MainContextLayout, MainContext };
