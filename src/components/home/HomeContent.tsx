import { Category, Product, Slide, User } from "@/src/types/queries";
import { Locale, countriesList } from "@/src/types";
import CategoriesSlider from "@/components/sliders/CategoriesSlider";
import AdsSlider from "@/components/sliders/AdsSlider";
import CustomSlider from "@/src/components/sliders/VendorsSlider";
import FlashOffers from "@/components/home/FlashOffers";

type Props = {
  categories: Category[];
  slides: Slide[];
  products: Product[];
  vendors: User[];
  lang: Locale["lang"];
  country: countriesList;
};
export default function ({
  categories,
  slides,
  lang,
  country,
  vendors,
  products,
}: Props) {
  return (
    <div>
      <CategoriesSlider lang={lang} categories={categories} country={country} />
      {/* filters and   items*/}
      <div className='page-padding'>
        {/* filters */}
        <div></div>
        {/* slider  */}
        <div className='my-10'>
          <AdsSlider lang={lang} country={country} slides={slides} />
        </div>
        {/* new to picks */}
        <CustomSlider
          vendors={vendors}
          lang={lang}
          country={country}
          title='New Picks'
        />
        {/* flash offers */}
        <FlashOffers products={products} lang={lang} country={country} />
      </div>
    </div>
  );
}
