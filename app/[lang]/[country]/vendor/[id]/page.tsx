import { Locale, countriesList } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import { MainContextLayout } from "@/layouts/MainContentLayout";
import { getVendor } from "@/utils/user";
import { AppQueryResult, User } from "@/src/types/queries";
import { notFound } from "next/navigation";
import VendorHeader from "@/src/components/user/VendorHeader";
import RatingAndReviewsCard from "@/src/components/user/RatingAndReviewsCard";
import Breadcrumbs from "@/components/BreadCrumbs";

type Props = {
  params: { lang: Locale["lang"]; country: countriesList; id: string };
};

export default async function ({ params: { lang, country, id } }: Props) {
  const [{ trans }, vendor]: [{ trans: any }, AppQueryResult<User>] =
    await Promise.all([getDictionary(lang), getVendor(id)]);

  if (!vendor) notFound();

  return (
    <MainContextLayout trans={trans} lang={lang} country={country}>
      <div className='mt-8'>
        <Breadcrumbs />
        <h1>Name {vendor.data.vendor.store_name} </h1>
        <h1>Description {vendor.data.vendor.description} </h1>
        <VendorHeader />
        <RatingAndReviewsCard />
      </div>
    </MainContextLayout>
  );
}
