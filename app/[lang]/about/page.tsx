import { MainContextLayout } from "@/components/MainContentLayout";
import { Locale } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import { getSetting } from "@/utils/setting";

export default async function About({
  params: { lang },
}: {
  params: { lang: Locale["lang"] };
}) {
  const setting = await getSetting(lang);
  const { trans } = await getDictionary(lang);

  return (
    <MainContextLayout trans={trans} lang={lang}>
      <div className='container py-24'>
        <h1 className='text-3xl font-bold'>
          {trans.translation} : {trans.aboutus}
        </h1>
        <h1>{setting.name}</h1>
        <h1>{setting.description}</h1>
      </div>
    </MainContextLayout>
  );
}
