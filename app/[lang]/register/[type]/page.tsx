import { MainContextLayout } from "@/components/MainContentLayout";
import { Locale } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import { getSetting } from "@/utils/setting";

export default async function Aboutus({
  params: { lang, type },
}: {
  params: { lang: Locale["lang"]; type: "company" | "visitor" };
}) {
  const [{ trans }, setting] = await Promise.all([
    getDictionary(lang),
    getSetting(lang),
  ]);

  return (
    <MainContextLayout trans={trans} lang={lang} searchParams={``}>
      <div>register</div>
    </MainContextLayout>
  );
}
