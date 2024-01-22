"use client";
import { Fragment, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Tab } from "@headlessui/react";
import { first, map } from "lodash";
import ProductWidget from "@/components/widgets/ProductWidget";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import OfferWidget from "@/components/widgets/OfferWidget";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function ({ products }: { products: any }) {
  const { t } = useTranslation("trans");

  return (
    <div className='mx-auto'>
      {/* Product */}
      <div className='lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16'>
        <div className='mx-auto  w-full  col-span-full lg:mt-0 lg:max-w-none'>
          <Tab.Group as='div'>
            <div className='border-b border-gray-200 capitalize'>
              <div className='flex flex-row justify-between items-center'>
                <div className='line-clamp-1'>
                  <h1>{t("full_menu")}</h1>
                </div>
                <div className='flex flex-row justify-end items-center w-3/5 sm:w-full max-w-sm '>
                  <div className='relative rounded-full shadow-sm me-4 w-full '>
                    <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                      <MagnifyingGlassIcon
                        className='h-5 w-5 text-gray-400'
                        aria-hidden='true'
                      />
                    </div>
                    <input
                      type='text'
                      name='search'
                      id='search'
                      className='input-default ltr:pl-10 rtl:pr-10 rounded-full capitalize'
                      placeholder={`${t("search_in_menu")}`}
                    />
                  </div>
                </div>
              </div>
              <Tab.List className='-mb-px flex gap-x-8'>
                {map(products, (c, i: number) => (
                  <Tab
                    key={i}
                    className={({ selected }) =>
                      classNames(
                        selected
                          ? "border-picks-dark text-picks-dark"
                          : "border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800",
                        "whitespace-nowrap border-b-2 py-6 text-sm font-medium"
                      )
                    }>
                    {c.name}
                  </Tab>
                ))}
              </Tab.List>
            </div>
            <Tab.Panels as={Fragment}>
              {map(products, (c: any, i) => (
                <Tab.Panel className='my-4'>
                  <div className='grid grid-cols-2 xl:grid-cols-3 my-4'>
                    {map(c.offers, (p, i) => (
                      <div className={"col-span-1 me-2"} key={i}>
                        <OfferWidget product={p} />
                      </div>
                    ))}
                  </div>
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
}
