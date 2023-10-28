"use client";
import Link from "next/link";
import * as React from "react";
import { Country, Membership } from "@/types/queries";
import { Locale } from "@/types/index";
import MembershipCard from "../membership/MembershipCard";

type Props = {
  trans: { [key: string]: string };
  subscriptions: Membership[];
  lang: Locale["lang"];
  country: Country;
};

export function SubscriptionsPrices({
  trans,
  subscriptions,
  lang,
  country,
}: Props) {
  console.log({ subscriptions });
  return (
    <div className="bg-expo-green py-16 capitalize">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            {trans.main_subscripers}
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
          {trans.register_now_and_learn_about_the_partner_and_sponsor_packages}
        </p>
        <div className="flex justify-center mt-5">
          <Link
            className="text-center py-2 px-5 border border-expo-dark text-expo-dark rounded-md"
            href={`/${lang}/register/company`}
          >
            {trans.register_as_a_subscriper}
          </Link>
        </div>
        <div className="isolate mx-auto grid max-w-md grid-cols-1 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3 my-20">
          {subscriptions.map(
            (subscription: Membership, subscriptionsIdx: number) => (
              <MembershipCard
                scaleOnHover={false}
                scaleMiddle={subscriptionsIdx === 1 ? true : false}
                element={subscription}
                country={country[0]}
                lang={lang}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}
