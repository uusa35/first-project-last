"use client";
import {
  setAreaCookie,
  setCountryCookie,
  setCountryNameCookie,
} from "@/mainApp/actions";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setArea } from "@/redux/slices/areaSlice";
import { Area, Country } from "@/types/queries";
import { Suspense, useContext, useEffect, useState } from "react";
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
import { useGetAreasQuery } from "@/src/redux/api/areaApi";
import AboutUsGetStarted from "../AboutUsGetStarted";
import LoadingSpinner from "../../LoadingSpinner";
import { setCountry } from "@/src/redux/slices/countrySlice";

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
  const {
    data: areas,
    isSuccess: areaSuccess,
    isFetching,
  } = useGetAreasQuery();

  const handleSetCountry = async (c: { label: string; id: number } | null) => {
    setSelectedArea(undefined);
    setSelectedCountry(c || undefined);
    if (c && c.id && countries) {
      const selectedCountry: Country = countries.filter(
        (itm) => itm.id === c?.id
      )[0];
      await setCountryCookie(JSON.stringify(selectedCountry));
      await setCountryNameCookie(selectedCountry.country_code);
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
    // counteies for select
    let mappedCountries = countries.map((itm) => {
      return { label: itm.name, id: itm.id };
    });
    setAllCountries(mappedCountries);
    if (country.id) {
      setSelectedCountry(
        mappedCountries.filter((itm) => itm.id === country.id)[0]
      );
    }
  }, [countries]);

  useEffect(() => {
    if (areas && areas?.data && first(areas.data)?.country.id === country.id) {
      let mappedAreas = areas.data.map((itm: Area) => {
        return { label: itm.name, id: itm.id };
      });
      setAllAreas(mappedAreas);
      setSelectedArea(first(mappedAreas));
    } else {
      setAllAreas([]);
      setSelectedArea(undefined);
    }
  }, [country.id, areas]);

  return (
    <>
      <Image
        src='https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2830&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply'
        alt='testing'
        width={1000}
        height={1000}
        className='absolute inset-0 -z-10 h-full w-full object-cover'
      />
      <div className='mx-auto max-w-2xl w-full lg:w-3/4  text-white flex flex-col  justify-center items-center h-[90vh]'>
        {!isEmpty(allCountries) && areaSuccess ? (
          <>
            <p className='mb-5 text-3xl font-semibold text-center px-5 capitalize'>
              {trans.landing_title1}
              <span className='text-picks-dark capitalize'>
                {trans.delivered}
              </span>
            </p>

            {/* select country*/}
            <div className='flex items-start gap-x-2  w-full px-8'>
              <div className='flex flex-col gap-y-5 grow w-full'>
                {/* contry select */}
                <div className='flex gap-x-2 items-center justify-between bg-white rounded-lg py-2 px-3 grow'>
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
                      sx={{ width: 300 }}
                      renderInput={(params) => (
                        <TextField {...params} label={trans.select_country} />
                      )}
                    />
                  </div>
                  <GetLocation />
                </div>

                {/* area select */}
                {!isEmpty(allAreas) && (
                  <div className='flex gap-x-2 items-center justify-between bg-white rounded-lg py-2 px-3 grow'>
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
                        sx={{ width: 300 }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={trans.select_area}
                            className='font-picks-medium'
                          />
                        )}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* btn */}
              <button
                disabled={!country && !area}
                onClick={() =>
                  router.push(appLinks.home(lang, country.country_code))
                }
                className='flex items-center gap-x-2 rounded-lg bg-picks-dark p-2 h-[40%]'>
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
