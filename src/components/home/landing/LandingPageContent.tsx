"use client";
import {
  getAreaCookie,
  setAreaCookie,
  setCountryCookie,
  setCountryNameCookie,
} from "@/mainApp/actions";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setArea } from "@/redux/slices/areaSlice";
import { Area, Country } from "@/types/queries";
import {  useContext, useEffect, useState } from "react";
import Search from "@/appIcons/landing/search.svg";
import { Autocomplete, TextField } from "@mui/material";
import { first, isEmpty } from "lodash";
import GetLocation from "@/appIcons/landing/get_location.svg";
import RightArrow from "@/appIcons/landing/right_arrow.svg";
import Avatar from "@/appIcons/landing/avatar.svg";
import Image from "next/image";
import { MainContext } from "@/components/layouts/MainContentLayout";
import DownloadAppSection from "@/components/home/DownloadAppSection";
import { useRouter } from "next/navigation";
import { appLinks } from "@/src/links";
import {
  useGetAreasQuery,
  useLazyGetAreasQuery,
} from "@/src/redux/api/areaApi";
import AboutUsGetStarted from "@/components/home/AboutUsGetStarted";
import LoadingSpinner from "@/components/LoadingSpinner";
import { setCountry } from "@/src/redux/slices/countrySlice";
import LandingPageBgImage from "@/appImages/head.png";

type Props = {
  countries: Country[];
};
export default function ({ countries }: Props) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    locale: { lang },
    country,
    area,
  } = useAppSelector((state) => state);
  const trans: { [key: string]: string } = useContext(MainContext);
  const [allCountries, setAllCountries] = useState<
    { label: string; id: number }[]
  >([]);
  const [allAreas, setAllAreas] = useState<{ label: string; id: number }[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<
    | {
        label: string;
        id: number;
      }
    | undefined
  >();
  const [selectedArea, setSelectedArea] = useState<
    | {
        label: string;
        id: number;
      }
    | undefined
    | ""
  >();
  const [triggerGetAreas, { data: areas, isSuccess: areaSuccess, isFetching }] =
    useLazyGetAreasQuery();

  const handleSetCountry = async (c: { label: string; id: number } | null) => {
    if (c && c.id && countries) {
      setSelectedCountry(c);
      const selectedCountry = countries.filter((itm) => itm.id === c?.id)[0];
      await triggerGetAreas(selectedCountry.id.toString(), false);
      await setCountryCookie(JSON.stringify(selectedCountry));
      await setCountryNameCookie(selectedCountry.country_code);
      dispatch(setCountry(selectedCountry));
    }
  };

  const handleSetArea = async (
    a: { label: string; id: number } | null | ""
  ) => {
    setSelectedArea(a || undefined);
    if (a && a.id && areas && areas?.data) {
      const selectedArea = areas?.data.filter((itm) => itm.id === a?.id)[0];
      await setAreaCookie(JSON.stringify(selectedArea)).then(() =>
        dispatch(setArea(selectedArea))
      );
    }
  };

  useEffect(() => {
    let mappedCountries = countries.map((itm) => {
      return { label: itm.name, id: itm.id };
    });
    setAllCountries(mappedCountries);
    if (country.id && allCountries.length === 0) {
      setSelectedCountry(
        mappedCountries.filter((itm) => itm.id === country.id)[0]
      );
    }
  }, [countries]);

  useEffect(() => {
    triggerGetAreas(country.id.toString(), false).then((r: any) => {
      if (r && r.data && r.data.success && r.data.data) {
        const serverArea: Area | undefined = first(r.data.data);
        const cookieArea: any = getAreaCookie();
        let mappedAreas = r.data.data.map((itm: Area) => {
          return { label: itm.name, id: itm.id };
        });
        setAllAreas(mappedAreas);
        if (
          cookieArea &&
          cookieArea.id &&
          cookieArea.country.id === country.id
        ) {
          dispatch(setArea(cookieArea));
          setSelectedArea(
            mappedAreas.filter(
              (itm: { id: number; label: string }) => itm.id === cookieArea.id
            )[0]
          );
        } else if (area.id !== 0 && area.country.id === country.id) {
          dispatch(setArea(area));
          setAreaCookie(JSON.stringify(area));
          setSelectedArea(
            mappedAreas.filter(
              (itm: { id: number; label: string }) => itm.id === area.id
            )[0]
          );
        } else if (serverArea && serverArea.country.id === country.id) {
          dispatch(setArea(serverArea));
          setAreaCookie(JSON.stringify(serverArea));
          setSelectedArea(
            mappedAreas.filter(
              (itm: { id: number; label: string }) => itm.id === serverArea.id
            )[0]
          );
        }
      }
    });
  }, [country]);

  return (
    <>
      <Image
        src={LandingPageBgImage}
        alt='testing'
        width={1000}
        height={1000}
        className='absolute inset-0 -z-10 h-[90vh] w-full object-cover'
      />
      <div className='mx-auto max-w-3xl w-full   text-white flex flex-col  justify-center items-center h-[90vh]'>
        {!isEmpty(allCountries) && areaSuccess ? (
          <>
            <p className='mb-5 text-3xl font-semibold text-center px-5 capitalize'>
              {trans.landing_title1}
              <span className='text-picks-dark capitalize'>
                {trans.delivered}
              </span>
            </p>
            {/* select country*/}
            <div className='flex w-full flex-col sm:flex-row justify-center items-center '>
              <div className='flex flex-col w-1/2 sm:w-auto gap-y-4 sm:gap-y-0 sm:flex-row justify-center items-center mb-4 sm:mb-0 sm:me-4 rounded-lg '>
                {/* contry select */}
                <div className='col-span-6 gap-x-2 py-2 px-3 bg-white rounded-lg sm:ltr:rounded-r-none sm:rtl:rounded-l-none w-full'>
                  <div className='flex gap-x-2 items-center pt-2'>
                    <Search />
                    <Autocomplete
                      size='small'
                      className='outline-none '
                      disablePortal
                      id='combo-box-demo'
                      options={allCountries}
                      value={selectedCountry}
                      onChange={(e, newval) => {
                        handleSetCountry(newval);
                      }}
                      sx={{ minWidth: 200 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={trans.select_country}
                          className='font-picks-medium capitalize text-left'
                        />
                      )}
                    />
                  </div>
                </div>

                {/* area select */}
                {!isEmpty(allAreas) && (
                  <div className='col-span-5 flex flex-row gap-x-2 py-2 px-3 bg-white rounded-lg sm:ltr:rounded-l-none sm:rtl:rounded-r-none w-full'>
                    <div className='flex gap-x-2 items-center pt-2'>
                      <Search />
                      <Autocomplete
                        dir={lang === "ar" ? "rtl" : "ltr"}
                        disabled={isFetching}
                        size='small'
                        className='outline-none font-picks-medium'
                        disablePortal
                        id='combo-box-demo'
                        options={allAreas}
                        value={selectedArea}
                        onChange={(e, newval) => {
                          handleSetArea(newval);
                        }}
                        sx={{ minWidth: 200 }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={trans.select_area}
                            className='font-picks-medium capitalize text-left'
                          />
                        )}
                      />
                    </div>
                  </div>
                )}
                <div className='hidden sm:col-span-1 '>
                  <GetLocation className='pt-2 text-2xl' />
                </div>
              </div>

              {/* btn */}
              <button
                disabled={!country && !area}
                onClick={() =>
                  router.push(appLinks.home(lang, country.country_code))
                }
                className='col-span-1 flex w-1/2 sm:w-auto items-center gap-x-2 rounded-lg bg-picks-dark hover:bg-picks-medium px-4 py-5'>
                <span className='whitespace-nowrap capitalize'>
                  {trans.lets_go}
                </span>
                <RightArrow className='rtl:rotate-180' />
              </button>
            </div>
          </>
        ) : (
          <LoadingSpinner isLoading={!areaSuccess} />
        )}

        {/* login */}
        <div className='my-8'>
          <div className='flex items-center gap-x-2'>
            <Avatar />
            <p>
              {trans.or}{" "}
              <span className='text-picks-dark capitalize'>{trans.log_in}</span>{" "}
              {trans.for_your_saved_addresses}
            </p>
          </div>
        </div>
      </div>

      <div className='bg-white p-2 md:p-10'>
        <DownloadAppSection />
        <AboutUsGetStarted />
      </div>
    </>
  );
}
