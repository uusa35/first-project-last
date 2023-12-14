import { MainContextLayout } from "@/layouts/MainContentLayout";
import { getDictionary } from "@/lib/dictionary";
import Link from "next/link";
import { cookies } from "next/headers";
import Image from "next/image";
import { getCountryNameCookie } from "../actions";

export default async function NotFound() {
  const cookieStore = cookies();
  const country: any = await getCountryNameCookie();
  const lang: any = cookieStore.get("NEXT_LOCALE")?.value ?? "en";
  const [{ trans }]: [{ trans: any }] = await Promise.all([
    getDictionary(lang),
  ]);

  return (
    <MainContextLayout trans={trans} lang={lang} country={country}>
      <h1>Not found</h1>
    </MainContextLayout>
  );
}
