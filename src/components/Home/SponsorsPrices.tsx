import Link from "next/link";
import { CheckIcon } from "@heroicons/react/20/solid";
import * as React from "react";
import { AppQueryResult, Country, Membership } from "@/types/queries";
import { Locale } from "@/types/index";
import MembershipCard from "../membership/MembershipCard";

type Props = {
  trans: { [key: string]: string };
  sponsorships: Membership[];
  lang: Locale["lang"];
  country: Country;
};

export function SponsorsPrices({ trans, sponsorships, lang, country }: Props) {
  return (
    <div className="bg-expo-green py-12 sm:py-12 capitalize">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            {trans.sponsors}
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
          {trans.register_now_and_learn_about_sponsorship_packages}
        </p>

        <div className="flex justify-center mt-5">
          <Link
            className="text-center py-2 px-5 border border-expo-dark rounded-md"
            href={`/${lang}/register/company`}
          >
            {trans.register_as_a_sponsor}
          </Link>
        </div>

        <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {sponsorships.map((s: Membership, i: number) => (
            <MembershipCard
              element={s}
              key={i}
              lang={lang}
              country={country[0]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
