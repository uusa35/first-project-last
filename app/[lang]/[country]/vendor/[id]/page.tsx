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

type Props = {
  params: { lang: Locale["lang"]; country: countriesList; id: string };
};

export default async function ({ params: { lang, country, id } }: Props) {
  const [{ trans }, vendor]: [{ trans: any }, AppQueryResult<User>] =
    await Promise.all([getDictionary(lang), getVendor(id)]);

  if (!vendor || !vendor.data.vendor) notFound();
  const { logo, store_name, description, image, category } = vendor.data.vendor;
  return (
    <MainContextLayout trans={trans}>
      <div className='mt-8'>
        <Breadcrumbs />
        <VendorHeader title={store_name} logo={logo} bg={image} />
        <div className='px-4 grid grid-cols-1 md:grid-cols-3 mt-12 '>
          <div className='col-span-2'>
            <h1 className='text-3xl pb-4'>{store_name}</h1>
            <div className='flex flex-1'>
              <p className='text-gray-400 rtl:pl-2 ltr:pr-2 ltr:border-r rtl:border-l border-gray-400'>
                {category}
              </p>
            </div>
            <RatingAndReviewsCard />
          </div>
          <div className='col-span-1 '>
            <div className='flex gap-x-4'>
              <button className='btn-default'>pickup</button>
              <button className='btn-default'>delivery</button>
            </div>
          </div>
        </div>

        <ProductsSlider
          products={vendor.data.items}
          lang={lang}
          country={country}
          title={"big deals"}
        />
        <VendorContent />
      </div>
    </MainContextLayout>
  );
}
