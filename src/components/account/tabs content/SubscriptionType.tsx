import { MainContext } from "@/layouts/MainContentLayout";
import { useAppSelector } from "@/redux/hooks";
import { Tab } from "@headlessui/react";
import React from "react";

type Props = {};

export default function SubscriptionType({}: Props) {
  const { hasValidDeal, deals } = useAppSelector((state) => state.auth);
  const trans: { [key: string]: string } = React.useContext(MainContext);

  console.log({ hasValidDeal, deals });

  return (
    <Tab.Panel>
      <h1 className="text-2xl mb-10 mt-5">
        {trans.select_the_region_in_the_gallery}
      </h1>
      <div className="bg-gray-50 border border-gray-200 rounded-md">
        <p>{trans.zone_a_desc}</p>
        <p>{trans.zone_b_desc}</p>
        <p>{trans.zone_c_desc}</p>
        <p>{trans.zone_d_desc}</p>
      </div>
    </Tab.Panel>
  );
}
