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
import { usePathname, useSearchParams } from "next/navigation";
import { Locale } from "@/types/index";
import Link from "next/link";
import { isEmpty } from "lodash";
import Image from "next/image";
import { useGetMembershipsQuery } from "@/redux/api/membershipApi";

type Props = {
  lang: Locale["lang"];
  // role: Role["name"];
};

export default function SubscriptionType({ lang }: Props) {
  const { hasValidDeal, deals } = useAppSelector((state) => state.auth);
  const trans: { [key: string]: string } = React.useContext(MainContext);

  const [availableZones, setAvailableZones] = useState<string[] | undefined>(
    undefined
  );

  const [selectedZone, setSelectedZone] = useState<string>("");

  const [selectedMembership, setSelectedMembership] = useState<
    "subscription" | "sponsorship"
  >("subscription");

  const { data: allMemberships, isSuccess: allMembershipsSuccess } =
    useGetMembershipsQuery(
      {
        params: {
          sort: selectedMembership,
        },
      },
      { refetchOnMountOrArgChange: true }
    );

  const { data: sortedMemberships, isSuccess: sortedMembershipsSuccess } =
    useGetMembershipsQuery(
      {
        params: {
          sort: selectedMembership,
          zone: selectedZone,
        },
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
  }, [allMemberships, selectedMembership]);

  console.log({ hasValidDeal, deals, selectedZone });

  return (
    <Tab.Panel>
      {/* membership type */}
      <div className="grid grid-cols-2 bg-gray-50 p-1.5 rounded-md mt-5 border border-gray-200 text-gray-500">
        <div
          className={`w-full text-center rounded-md py-2 cursor-pointer capitalize ${
            selectedMembership === "subscription" &&
            "bg-white shadow-sm text-expo-dark"
          } `}
          onClick={() => {
            setAvailableZones(undefined);
            setSelectedMembership("subscription");
          }}
        >
          {trans.companies}
        </div>
        <div
          className={`w-full text-center rounded-md py-2 cursor-pointer capitalize ${
            selectedMembership === "sponsorship" &&
            "bg-white shadow-sm text-expo-dark"
          }`}
          onClick={() => {
            setAvailableZones(undefined);
            setSelectedMembership("sponsorship");
          }}
        >
          {trans.sponsors}
        </div>
      </div>
      <h1 className="text-2xl my-5">
        {trans.select_the_region_in_the_gallery}
      </h1>
      <div className="bg-gray-50 border border-gray-200 text-gray-700 rounded-md py-5 px-3 space-y-2 text-sm">
        <p>- {trans.zone_a_desc}</p>
        <p>- {trans.zone_b_desc}</p>
        <p>- {trans.zone_c_desc}</p>
        <p>- {trans.zone_d_desc}</p>
      </div>
      <div className="mt-5">
        <p>{trans.select_the_region}</p>

        {/* zones */}
        <div className="flex overflow-auto scrollbar-hide gap-x-5 mt-3">
          {/* map zones here */}
          {availableZones
            ? availableZones.map((itm) => (
                <div
                  key={itm}
                  onClick={() => setSelectedZone(itm)}
                  className={`flex justify-center items-center gap-x-1 bg-[#F7F7F7] py-2 rounded-md px-5 cursor-pointer ${
                    selectedZone === itm && "border border-expo-dark"
                  }`}
                >
                  <p className=" capitalize">
                    {trans.zone}({itm})
                  </p>
                  <ZoneA className="w-3 h-3" />
                </div>
              ))
            : null}
        </div>
        {/* zone desc */}
        <div className="bg-gray-50 border border-gray-200 text-gray-700 rounded-md py-5 px-3 space-y-2 text-sm my-3">
          <p>- {trans.zone_a_desc}</p>
        </div>

        <div>
          <p>{trans.choose_the_size_of_stand_you_want}</p>
          <div className="text-center my-5">
            {sortedMembershipsSuccess ? (
              isEmpty(sortedMemberships) ? (
                <p>no data found</p>
              ) : (
                <div className="grid grid-cols-3 gap-x-3">
                  {sortedMemberships.map((itm) => {
                    return (
                      <div
                        key={itm.id}
                        className={`rounded-2xl p-2`}
                        style={{ backgroundColor: itm.color + "66" }}
                      >
                        <Image
                          width={100}
                          height={100}
                          className="w-full h-auto aspect-[2/1] rounded-xl"
                          src={itm.image}
                          alt={itm.name}
                        />
                        <div className="flex justify-between gap-x-3 items-center mt-3">
                          <p
                            className="rounded-md p-1 text-sm"
                            style={{ backgroundColor: itm.color }}
                          >
                            {itm.name}
                          </p>
                          <p>
                            {trans.price} {itm.price}$
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )
            ) : null}
          </div>
        </div>
      </div>
    </Tab.Panel>
  );
}
