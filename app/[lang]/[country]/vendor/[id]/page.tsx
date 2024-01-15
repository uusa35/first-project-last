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

  return (
    <MainContextLayout  showMiddleNav={true}>
      <div className='mt-8 px-4'>
        <Breadcrumbs title={store_name} />
        <VendorHeader title={store_name} logo={logo} bg={image} />
        <div className='px-4 grid grid-cols-1 md:grid-cols-3 mt-12'>
          <div className='col-span-full lg:col-span-2'>
            <h1 className='text-3xl pb-4'>{store_name}</h1>
            <div className='flex flex-1 mb-3'>
              <p className='text-gray-400 rtl:pl-2 ltr:pr-2 ltr:border-r rtl:border-l border-gray-400'>
                {category}
              </p>
            </div>
            {vendor.data.vendor.status === "open" ? (
              <div className='flex flex-row gap-x-3 justify-start items-center'>
                <div>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'>
                    <path
                      d='M12 6V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z'
                      stroke='#12B76A'
                      stroke-width='2'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                  </svg>
                </div>
                <div className='capitalize '>
                  <span className='text-[#12B76A]'>{trans.open_now}</span>
                  <span></span>
                </div>
              </div>
            ) : (
              <div className='flex flex-row gap-x-3 justify-start items-center'>
                <div>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'>
                    <path
                      d='M12 6V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z'
                      stroke='#F04438'
                      stroke-width='2'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                    />
                  </svg>
                </div>
                <div className='capitalize '>
                  <span className='text-[#F04438]'>{trans.closed_now}</span>
                  <span></span>
                </div>
              </div>
            )}
            <RatingAndReviewsCard
              rate={vendor.data.vendor.rate}
              ratings={vendor.data.vendor.ratings}
            />
          </div>
          {/* delivery & pickup & branch */}
          <SwitchDeliveryPickup vendor={vendor.data.vendor} />
        </div>
        {vendor.data.items && vendor.data.items?.length > 0 && (
          <ProductsSlider
            products={vendor.data.items}
            title={trans.big_deals}
          />
        )}
        {vendor.data.items && vendor.data.items?.length > 0 && (
          <VendorContent products={vendor.data.items} />
        )}
      </div>
    </MainContextLayout>
  );
}
