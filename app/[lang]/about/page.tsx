import { MainContextLayout } from "@/components/MainContentLayout";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import { getSetting } from "@/utils/setting";

export default async function About({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const setting = await getSetting();
  const { trans } = await getDictionary(lang);

  return (
    <MainContextLayout trans={trans}>
      <div className='container py-24'>
        <h1 className='text-3xl font-bold'>
          {trans.translation} : {trans.about.aboutus}
        </h1>
        <h1>{setting.name_en}</h1>
        <h1>{setting.name_ar}</h1>
      </div>
    </MainContextLayout>
  );
}
