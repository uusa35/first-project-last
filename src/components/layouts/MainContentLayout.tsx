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

type Props = {
  children: React.ReactNode;
  trans: { [key: string]: string };
  showMiddleNav?: boolean;
};

const MainContext = createContext({});
const MainContextLayout: FC<Props> = ({
  children,
  trans,
  showMiddleNav = false,
}) => {
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
  const navigation = [
    { name: trans.home, href: `/${lang}`, label: `home` },
    {
      name: trans.subscribers,
      href: `/${lang}/user?membership=subscription`,
      label: "subscription",
    },
    {
      name: trans.sponsors,
      href: `/${lang}/user?membership=sponsorship`,
      label: "sponsorship",
    },
    { name: trans.posts, href: `/${lang}/post`, label: "post" },
    { name: trans.aboutus, href: `/${lang}/aboutus`, label: "aboutus" },
    { name: trans.contactus, href: `/${lang}/contactus`, label: "contactus" },
  ];

  useEffect(() => {
    if (lang || lang !== locale.lang) {
      dispatch(setLocale(lang));
      setLocaleCookie(lang);
      setLang(lang);
      moment.locale(lang);
      yup.setLocale({
        mixed: {
          required: trans["validation.required"],
        },
        number: {
          min: ({ min }) => ({ key: trans["validation.min"], values: { min } }),
          max: ({ max }) => ({ key: trans["validation.max"], values: { max } }),
        },
        string: {
          email: trans["validation.email"],
          min: ({ min }) => ({ key: trans["validation.min"], values: min }),
          max: ({ max }) => ({ key: trans["validation.max"], values: max }),
          matches: trans["validation.matches"],
        },
      });
    }
  }, [lang]);

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
          // if no area // if area.country.id !== currrent country
          if (
            area.country.id !== id &&
            serverArea !== undefined &&
            serverArea.country
          ) {
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
    <MainContext.Provider value={trans}>
      {/* nav */}
      <NavHeader showMiddleNav={showMiddleNav} />
      <Suspense>
        <LoginModal />
        <RegisterModal />
        <ForgetPasswordModal />
        <VerificationModal />
        <ChangePasswordModal />
        <ProductModal />
      </Suspense>
      <div className='relative isolate overflow-hidden pt-14 py-8'>
        {children}
      </div>
      <AppFooter />
    </MainContext.Provider>
  );
};

export { MainContextLayout, MainContext };
