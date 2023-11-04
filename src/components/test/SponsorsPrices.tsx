import Link from "next/link";
import { Country, Membership } from "@/types/queries";
import { Locale } from "@/types/index";
import MembershipCard from "@/components/membership/MembershipCard";
import { appLinks } from "@/src/links";
import ShowMore from "@/appIcons/green_left_arrow.svg";

type Props = {
  trans: { [key: string]: string };
  sponsorships: Membership[];
  lang: Locale["lang"];
  country: Country;
  isAuth: boolean;
};

export default function ({
  trans,
  sponsorships,
  lang,
  country,
  isAuth,
}: Props) {
  return (
    <div className='bg-expo-green py-12 sm:py-12 capitalize'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-4xl text-center'>
          <p className='mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl'>
            {trans.sponsors}
          </p>
        </div>
        <p className='mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600'>
          {trans.register_now_and_learn_about_sponsorship_packages}
        </p>

        {!isAuth && (
          <div className='flex justify-center mt-5'>
            <Link
              className='btn-dark-hover'
              href={`${appLinks.register(lang, "company")}`}>
              {trans.register_as_a_sponsor}
            </Link>
          </div>
        )}

        <div className='isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
          {sponsorships.map((s: Membership, i: number) => (
            <MembershipCard
              trans={trans}
              element={s}
              key={i}
              scaleMiddle={i === 1 && s.is_featured}
              lang={lang}
              country={country[0]}
            />
          ))}
        </div>
      </div>
      <div className='pt-8 pb-2 w-full text-center text-expo-dark'>
        <Link
          className='flex gap-x-2 items-center justify-center'
          href={appLinks.membershipIndex(lang, "sponsorship")}>
          {trans.navigate_to_more}
          <ShowMore className={`w-6 h-6 ${lang !== "ar" && "rotate-180"}`} />
        </Link>
      </div>
    </div>
  );
}
