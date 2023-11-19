"use client";
import { MainContext } from "@/layouts/MainContentLayout";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Tab } from "@headlessui/react";
import ZoneA from "@/appIcons/account/zones/zone_a.svg";
import ZoneB from "@/appIcons/account/zones/zone_b.svg";
import ZoneC from "@/appIcons/account/zones/zone_c.svg";
import ZoneD from "@/appIcons/account/zones/zone_d.svg";
import React, { useCallback, useEffect, useState } from "react";
import { Membership } from "@/types/queries";
import { getMemberships } from "@/utils/membership";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Locale } from "@/types/index";
import Link from "next/link";
import { isEmpty } from "lodash";
import Image from "next/image";
import { useGetMembershipsQuery } from "@/redux/api/membershipApi";
import { appLinks } from "@/src/links";
import PreviousDeals from "../PreviousDeals";

type Props = {
  lang: Locale["lang"];
  // role: Role["name"];
};

export default function SubscriptionType({ lang }: Props) {
  const router = useRouter();
  const trans: { [key: string]: string } = React.useContext(MainContext);

  const [availableZones, setAvailableZones] = useState<string[] | undefined>(
    undefined
  );

  const [selectedZone, setSelectedZone] = useState<string>("");

  const [selectedMembershipType, setSelectedMembershipType] = useState<
    "subscription" | "sponsorship"
  >("subscription");

  const [selectedMembership, setSelectedMembership] = useState<Membership>();

  const { data: allMemberships, isSuccess: allMembershipsSuccess } =
    useGetMembershipsQuery(
      {
        params: {
          sort: selectedMembershipType,
        },
        lang,
      },
      { refetchOnMountOrArgChange: true }
    );

  const { data: sortedMemberships, isSuccess: sortedMembershipsSuccess } =
    useGetMembershipsQuery(
      {
        params: {
          sort: selectedMembershipType,
          zone: selectedZone,
        },
        lang,
      },
      { refetchOnMountOrArgChange: true }
    );

  useEffect(() => {
    if (allMembershipsSuccess && allMemberships) {
      let all_zones: string[] = [];
      for (let index = 0; index < allMemberships.length; index++) {
        if (!all_zones.includes(allMemberships[index].zone)) {
          all_zones = [...all_zones, allMemberships[index].zone];
        }
      }
      // console.log(all_zones.sort());
      setAvailableZones(all_zones.sort());
      setSelectedZone(all_zones.sort()[0]);
    }
  }, [allMemberships, selectedMembershipType]);

  useEffect(() => {
    if (sortedMembershipsSuccess && sortedMemberships && sortedMemberships[0]) {
      setSelectedMembership(sortedMemberships[0]);
    }
  }, [sortedMemberships]);

  // console.log({ hasValidDeal, deals, selectedZone });

  return (
    <Tab.Panel className={`h-full`}>
      <PreviousDeals />
      {/* membership type */}
      <div className='grid grid-cols-2 bg-gray-50 p-1.5 rounded-md mt-5 border border-gray-200 text-gray-500 capitalize'>
        <div
          className={`w-full text-center rounded-md py-2 cursor-pointer capitalize ${
            selectedMembershipType === "subscription" &&
            "bg-white shadow-sm text-expo-dark"
          } `}
          onClick={() => {
            setAvailableZones(undefined);
            setSelectedMembershipType("subscription");
          }}>
          {trans.companies}
        </div>
        <div
          className={`w-full text-center rounded-md py-2 cursor-pointer capitalize ${
            selectedMembershipType === "sponsorship" &&
            "bg-white shadow-sm text-expo-dark"
          }`}
          onClick={() => {
            setAvailableZones(undefined);
            setSelectedMembershipType("sponsorship");
          }}>
          {trans.sponsors}
        </div>
      </div>

      {/* description */}
      <h1 className='text-2xl my-5'>
        {trans.select_the_region_in_the_gallery}
      </h1>
      <div className='bg-gray-50 border border-gray-200 text-gray-700 rounded-md py-5 px-3 space-y-2 text-sm capitalize'>
        <p>- {trans.zone_a_desc}</p>
        <p>- {trans.zone_b_desc}</p>
        <p>- {trans.zone_c_desc}</p>
        <p>- {trans.zone_d_desc}</p>
      </div>

      {/* zones and memberships */}
      <div className='mt-5'>
        {/* zones */}
        {availableZones ? (
          <>
            <p>{trans.select_the_region}</p>
            <div className='flex overflow-auto scrollbar-hide gap-x-5 mt-3'>
              {availableZones.map((itm) => (
                <div
                  key={itm}
                  onClick={() => setSelectedZone(itm)}
                  className={`flex justify-center items-center gap-x-1 bg-[#F7F7F7] py-2 rounded-md px-5 cursor-pointer ${
                    selectedZone === itm && "border border-expo-dark"
                  }`}>
                  <p className=' capitalize'>
                    {trans.zone}({itm})
                  </p>
                  <ZoneA className='w-3 h-3' />
                </div>
              ))}
            </div>
          </>
        ) : null}

        {/* membership */}
        {sortedMembershipsSuccess ? (
          <div className='capitalize'>
            {/* zone desc */}
            <div
              dangerouslySetInnerHTML={{
                __html: selectedMembership?.description,
              }}
              className='bg-gray-50 border border-gray-200 text-gray-700 rounded-md py-5 px-3 space-y-2 text-sm my-3 h-48 overflow-auto scrollbar-hide'
            />
            <p>{trans.choose_the_size_of_stand_you_want}</p>
            <div className='text-center my-5'>
              {isEmpty(sortedMemberships) ? (
                <p>{trans.no_data_found}</p>
              ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-3'>
                  {sortedMemberships.map((itm) => {
                    return (
                      <div
                        onClick={() => setSelectedMembership(itm)}
                        key={itm.id}
                        className={`rounded-2xl p-2 transform transition duration-500 ease-in-out hover:scale-105 cursor-pointer`}
                        style={{
                          backgroundColor: itm.color + "66",
                          border:
                            selectedMembership?.id === itm.id
                              ? `4px solid ${itm.color}`
                              : "none",
                        }}>
                        <Image
                          width={100}
                          height={100}
                          className='w-full h-auto aspect-[2/1] rounded-xl'
                          src={itm.image}
                          alt={itm.name}
                        />
                        <div className='flex justify-between gap-x-3 items-center mt-3'>
                          <p
                            className='rounded-md p-1 text-sm'
                            style={{ backgroundColor: itm.color }}>
                            {itm.name}
                          </p>
                          <p>
                            {trans.price} : {itm.price}$
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>

      <div className='my-10 flex items-center justify-center gap-x-6'>
        <button
          type='submit'
          className='btn-default'
          onClick={() =>
            router.push(appLinks.cartIndex(lang, selectedMembership?.id || 0))
          }>
          {trans.continue}
        </button>
      </div>
    </Tab.Panel>
  );
}
