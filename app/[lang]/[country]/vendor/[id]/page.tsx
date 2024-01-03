import { Locale, countriesList } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import { MainContextLayout } from "@/layouts/MainContentLayout";
import { getVendor } from "@/utils/user";
import { AppQueryResult, User } from "@/src/types/queries";
import { notFound } from "next/navigation";
import VendorHeader from "@/src/components/user/VendorHeader";
import VendorContent from "@/src/components/user/VendorContent";
import RatingAndReviewsCard from "@/src/components/user/RatingAndReviewsCard";
import Breadcrumbs from "@/components/BreadCrumbs";
import ProductsSlider from "@/src/components/sliders/ProductsSlider";
import SwitchDeliveryPickup from "@/src/components/user/SwitchDeliveryPickup";

type Props = {
  params: { lang: Locale["lang"]; country: countriesList; id: string };
};

export default async function ({ params: { lang, country, id } }: Props) {
  const [{ trans }, vendor]: [{ trans: any }, AppQueryResult<User>] =
    await Promise.all([getDictionary(lang), getVendor(id)]);

  if (!vendor || !vendor.data.vendor) notFound();
  const { logo, store_name, description, image, category } = vendor.data.vendor;
  console.log("vendor====>", vendor.data);
  return (
    <MainContextLayout trans={trans}>
      <div className='mt-8 px-4'>
        <Breadcrumbs />
        <VendorHeader title={store_name} logo={logo} bg={image} />
        <div className='px-4 grid grid-cols-1 md:grid-cols-3 mt-12'>
          <div className='col-span-full lg:col-span-2'>
            <h1 className='text-3xl pb-4'>{store_name}</h1>
            <div className='flex flex-1'>
              <p className='text-gray-400 rtl:pl-2 ltr:pr-2 ltr:border-r rtl:border-l border-gray-400'>
                {category}
              </p>
            </div>
            <RatingAndReviewsCard />
          </div>
          <SwitchDeliveryPickup />
        </div>
        {vendor.data.items && vendor.data.items?.length > 0 && (
          <ProductsSlider products={vendor.data.items} title={"big deals"} />
        )}
        {vendor.data.items && vendor.data.items?.length > 0 && (
          <VendorContent products={vendor.data.items} />
        )}
      </div>
    </MainContextLayout>
  );
}
