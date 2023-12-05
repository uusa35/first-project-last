"use client";
import { setCountryCookie } from "@/app/actions";
import { useLazyGetAreasQuery } from "@/redux/api/areaApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setArea } from "@/redux/slices/areaSlice";
import { getCountry, setCountry } from "@/redux/slices/countrySlice";
import { Area, Country } from "@/types/queries";
import { kebabCase } from "lodash";
import { Suspense, useEffect } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { prepareCountryCookie } from "@/src/constants";

type Props = {
  countries: Country[];
};
export default function ({ countries }: Props) {
  const {
    locale: { lang },
    country,
  } = useAppSelector((state) => state);

  const dispatch = useAppDispatch();
  const [triggerGetAreas, { data: areas, isSuccess: areaSuccess, isFetching }] =
    useLazyGetAreasQuery();

  const handleClick = async (c: Country) => {
    setCountryCookie(prepareCountryCookie(c.name_en));
  };
  useEffect(() => {
    triggerGetAreas(undefined, false);
  }, [country.id]);

  return (
    <>
      <div className='relative isolate overflow-hidden pt-14'>
        <img
          src='https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2830&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply'
          alt=''
          className='absolute inset-0 -z-10 h-full w-full object-cover'
        />
        <div
          className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'
          aria-hidden='true'>
          <div
            className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className='mx-auto max-w-2xl py-32 sm:py-48 lg:py-56'>
          <div className='text-center text-white border border-white rounded-md'>
            <div className='flex justify-between items-center'>
              {countries &&
                countries.map((c: Country) => (
                  <button
                    onClick={() => handleClick(c)}
                    className={`${
                      country.id === c.id && "border-4 border-blue-800"
                    }`}>
                    {c.name}
                  </button>
                ))}
              <Suspense fallback={<LoadingSpinner isLoading={true} />}>
                {areaSuccess && (
                  <div className='flex flex-col'>
                    <h1>Areas</h1>
                    {areas &&
                      areas.data?.length > 0 &&
                      areas.data?.map((a: Area) => (
                        <button onClick={() => dispatch(setArea(a))}>
                          {a.name}
                        </button>
                      ))}
                  </div>
                )}
              </Suspense>
            </div>
          </div>
        </div>
        <div
          className='absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]'
          aria-hidden='true'>
          <div
            className='relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]'
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
    </>
  );
}
