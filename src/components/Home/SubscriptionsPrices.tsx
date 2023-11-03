import Link from "next/link";
import { Country, Membership } from "@/types/queries";
import { Locale } from "@/types/index";
import MembershipCard from "@/components/membership/MembershipCard";
import ShowMore from "@/appIcons/green_left_arrow.svg";
import { appLinks } from "@/src/links";

type Props = {
  trans: { [key: string]: string };
  subscriptions: Membership[];
  lang: Locale["lang"];
  country: Country;
  isAuth: boolean;
};

export function SubscriptionsPrices({
  trans,
  subscriptions,
  lang,
  country,
  isAuth,
}: Props) {
  return (
    <div className='bg-expo-green py-16 capitalize'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-4xl text-center'>
          <p className='mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl'>
            {trans.main_subscripers}
          </p>
        </div>
        <p className='mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600'>
          {trans.register_now_and_learn_about_the_partner_and_sponsor_packages}
        </p>
        {!isAuth && (
          <div className='flex justify-center mt-5'>
            <Link
              className='btn-dark-hover'
              href={`${appLinks.register(lang, "company")}`}>
              {trans.register_as_a_subscriper}
            </Link>
          </div>
        )}

        <div className='isolate mx-auto grid max-w-md grid-cols-1 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3 my-20'>
          {subscriptions.map((s: Membership, i: number) => (
            <MembershipCard
              trans={trans}
              scaleOnHover={false}
              scaleMiddle={i === 1 && s.is_featured}
              element={s}
              country={country[0]}
              lang={lang}
              showMore={false}
            />
          ))}
        </div>
      </div>
      <div className='pt-8 pb-2 w-full text-center text-expo-dark'>
        <Link
          className='flex gap-x-2 items-center justify-center'
          href={appLinks.membershipIndex(lang, "subscription")}>
          {trans.navigate_to_more}
          <ShowMore className={`w-6 h-6 ${lang !== "ar" && "rotate-180"}`} />
        </Link>
      </div>
    </div>
  );
}
