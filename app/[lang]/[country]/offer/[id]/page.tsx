import { Locale } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import { MainContextLayout } from "@/layouts/MainContentLayout";
import { AppQueryResult, Product } from "@/src/types/queries";
import { notFound } from "next/navigation";
import { getProduct } from "@/utils/product";

type Props = {
  params: { lang: Locale["lang"]; id: string };
};

export default async function ({ params: { lang, id } }: Props) {
  const [{ trans }, vendor]: [{ trans: any }, AppQueryResult<Product>] =
    await Promise.all([getDictionary(lang), getProduct(id)]);

  if (!vendor) notFound();

  return (
    <MainContextLayout trans={trans} lang={lang}>
      <h1>Resturan {id} </h1>
      <h1>Name {vendor.data.name} </h1>
      <h1>Description {vendor.data.description} </h1>
    </MainContextLayout>
  );
}
