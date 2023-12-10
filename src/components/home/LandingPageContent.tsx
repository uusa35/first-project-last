"use client";
import {
  setAreaCookie,
  setCountryCookie,
  setCountryNameCookie,
} from "@/mainApp/actions";
import { useGetAreasQuery } from "@/redux/api/areaApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setArea } from "@/redux/slices/areaSlice";
import { Area, Country } from "@/types/queries";
import LoadingSpinner from "@/components/LoadingSpinner";

type Props = {
  countries: Country[];
};
export default function ({ countries }: Props) {
  const {
    locale: { lang },
    country,
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const {
    data: areas,
    isSuccess: areaSuccess,
    isFetching,
  } = useGetAreasQuery();

  const handleSetCountry = async (c: Country) => {
    await setCountryCookie(JSON.stringify(c)).then(() =>
      setCountryNameCookie(c.country_code)
    );
  };
  const handleSetArea = async (a: Area) => {
    await setAreaCookie(JSON.stringify(a)).then(() => dispatch(setArea(a)));
  };

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
          <div className='text-center text-white border border-white rounded-md h-full'>
            {isFetching ? (
              <LoadingSpinner isLoading={isFetching} />
            ) : (
              <div className='flex justify-between items-center'>
                {countries &&
                  countries.map((c: Country) => (
                    <button
                      onClick={() => handleSetCountry(c)}
                      className={`${
                        country.id === c.id && "border-4 border-blue-800"
                      }`}>
                      {c.name}
                    </button>
                  ))}

                {areaSuccess && (
                  <div className='flex flex-col'>
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

      <div className='bg-white lg:my-8'>
        <section aria-labelledby='features-heading' className='relative'>
          <div className='aspect-h-2 aspect-w-3 overflow-hidden sm:aspect-w-5 lg:aspect-none lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-16'>
            <img
              src='https://tailwindui.com/img/ecommerce-images/confirmation-page-01-hero.jpg'
              alt='Black leather journal with silver steel disc binding resting on wooden shelf with machined steel pen.'
              className='h-full w-full object-cover object-center lg:h-full lg:w-full'
            />
          </div>

          <div className='mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 sm:pb-32 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:pt-32'>
            <div className='lg:col-start-2'>
              <h2 id='features-heading' className='font-medium text-gray-500'>
                Leatherbound Daily Journal
              </h2>
              <p className='mt-4 text-4xl font-bold tracking-tight text-gray-900'>
                All in the Details
              </p>
              <p className='mt-4 text-gray-500'>
                We've obsessed over every detail of this handcrafted journal to
                bring you the best materials for daily use.
              </p>

              <dl className='mt-10 grid grid-cols-1 gap-x-8 gap-y-10 text-sm sm:grid-cols-2'>
                <div>
                  <dt className='font-medium text-gray-900'>title 1</dt>
                  <dd className='mt-2 text-gray-500'>description 1</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
