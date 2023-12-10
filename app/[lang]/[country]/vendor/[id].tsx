import { Locale } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import { MainContextLayout } from "@/layouts/MainContentLayout";
import { getVendor } from "@/utils/user";
import { AppQueryResult, User } from "@/src/types/queries";
import { notFound } from "next/navigation";

type Props = {
  params: { lang: Locale["lang"]; id: string };
};

export default async function ({ params: { lang, id } }: Props) {
  const [{ trans }, vendor]: [{ trans: any }, AppQueryResult<User>] =
    await Promise.all([getDictionary(lang), getVendor(id)]);

  if (!vendor) notFound();
  return (
    <MainContextLayout trans={trans} lang={lang}>
      <h1>Resturan {id} </h1>
      <h1>Name {vendor.data.store_name} </h1>
    </MainContextLayout>
  );
}
