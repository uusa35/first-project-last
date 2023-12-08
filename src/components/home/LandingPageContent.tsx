"use client";
import {
  setAreaCookie,
  setCountryCookie,
  setCountryNameCookie,
} from "@/mainApp/actions";
import { useLazyGetAreasQuery } from "@/redux/api/areaApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setArea } from "@/redux/slices/areaSlice";
import { Area, Country } from "@/types/queries";
import { ReactNode, Suspense, useContext, useEffect, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { prepareCountryCookie } from "@/src/constants";
import Search from "@/appIcons/landing/search.svg";
import { MainContext } from "../layouts/MainContentLayout";
import { Autocomplete, TextField } from "@mui/material";
import { isEmpty, toNumber } from "lodash";
import GetLocation from "@/appIcons/landing/get_location.svg";
import RightArrow from "@/appIcons/landing/right_arrow.svg";
import Avatar from "@/appIcons/landing/avatar.svg";
import downloadApp from "@/appImages/landing_download_app.png";
import Image, { StaticImageData } from "next/image";
import No_order_calls from "@/appIcons/landing/no_order_calls.svg";
import Flash_offers from "@/appIcons/landing/flash_offers.svg";
import Tracking_orders from "@/appIcons/landing/tracking_orders.svg";
import GooglePlay from "@/appIcons/landing/download_google_play.svg";
import AppleStore from "@/appIcons/landing/download_apple_store.svg";
import AppGallery from "@/appIcons/landing/download_app_gallery.svg";
import about_us from "@/appImages/about_us.png";
import get_started from "@/appImages/get_started.jpg";
import DownloadAppSection from "./DownloadAppSection";
import { setCountry } from "@/src/redux/slices/countrySlice";

type Props = {
  countries: Country[];
};
export default function ({ countries }: Props) {
  const dispatch = useAppDispatch();
  const {
    locale: { lang },
    country,
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
  >();

  const [triggerGetAreas, { data: areas, isSuccess: areaSuccess, isFetching }] =
    useLazyGetAreasQuery();

  const handleSetCountry = async (c: { label: string; id: number } | null) => {
    // console.log({ c });
    setSelectedCountry(c || undefined);
    if (c && c.id) {
      const selectedCountry = countries.filter((itm) => itm.id === c?.id)[0];
      console.log(JSON.stringify(selectedCountry));
      await setCountryCookie(JSON.stringify(selectedCountry));
      await setCountryNameCookie(
        prepareCountryCookie(selectedCountry.name_en.toLowerCase())
      );
      // setCountry(selectedCountry);
    }
  };

  const handleSetArea = async (a: Area) => {
    await setAreaCookie(JSON.stringify(a)).then(() => dispatch(setArea(a)));
  };

  useEffect(() => {
    triggerGetAreas(undefined, false);
  }, [country.id]);

  useEffect(() => {
    let mappedCountries = countries.map((itm) => {
      return { label: itm.name, id: itm.id };
    });

    setAllCountries(mappedCountries);

    if (country.id) {
      setSelectedCountry(
        mappedCountries.filter((itm) => itm.id === country.id)[0]
      );
    }
  }, []);

  // console.log({ countries });

  return (
    <>
      <div className="relative isolate overflow-hidden pt-14">
        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2830&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>

        <div className="mx-auto max-w-2xl w-[70vw] text-white flex flex-col justify-center items-center h-[90vh]">
          <p className="mb-5 text-3xl font-semibold text-center px-5">
            Restaurant food, takeaway and groceries.
            <span className="text-picks-dark">Delivered</span>
          </p>

          {/* select country*/}
          {!isEmpty(allCountries) && (
            <div className="flex items-center gap-x-2  w-full">
              {/* contry select */}

              <div className="flex gap-x-2 items-center justify-between bg-white rounded-lg py-2 px-3 grow">
                <div className="flex gap-x-2 items-center">
                  <Search />
                  <Autocomplete
                    size="small"
                    className="outline-none"
                    disablePortal
                    id="combo-box-demo"
                    options={allCountries}
                    value={selectedCountry}
                    onChange={(e, newval) => {
                      handleSetCountry(newval);
                    }}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="select country" />
                    )}
                  />
                </div>
                <GetLocation />
              </div>

              {/* btn */}
              <button className="flex items-center gap-x-2 rounded-lg bg-picks-dark px-2 h-full">
                <span className="whitespace-nowrap">Let’s go</span>
                <RightArrow />
              </button>
            </div>
          )}

          {/* login */}
          <div className="my-8">
            <div className="flex items-center gap-x-2">
              <Avatar />
              <p>
                or <span className="text-picks-dark">Log in</span> for your
                saved addresses.
              </p>
            </div>
          </div>
        </div>

        {/* <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center text-white border border-white rounded-md">
            <div className="flex justify-between items-center">
              {countries &&
                countries.map((c: Country) => (
                  <button
                    onClick={() => handleSetCountry(c)}
                    className={`${
                      country.id === c.id && "border-4 border-blue-800"
                    }`}
                  >
                    {c.name}
                  </button>
                ))}

              <Suspense fallback={<LoadingSpinner isLoading={true} />}>
                {areaSuccess && (
                  <div className="flex flex-col">
                    <h1>Areas</h1>
                    {areas &&
                      areas.data?.length > 0 &&
                      areas.data?.map((a: Area) => (
                        <button onClick={() => handleSetArea(a)}>
                          {a.name}
                        </button>
                      ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div> */}

        {/* <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div> */}
      </div>

      <DownloadAppSection />
    </>
  );
}
