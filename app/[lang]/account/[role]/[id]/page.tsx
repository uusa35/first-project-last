import { MainContextLayout } from "@/layouts/MainContentLayout";
import { Locale } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import { getSetting } from "@/utils/setting";
import {
  AppQueryResult,
  Auth,
  Category,
  Country,
  Role,
  Setting,
  User,
} from "@/types/queries";
import AccountContent from "@/components/account/AccountContent";
import { getAuth, updateUser } from "@/utils/user";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { getCountries } from "@/utils/country";
import { getCategories } from "@/utils/category";

export default async function ({
  params: { lang, role, id },
}: {
  params: { lang: Locale["lang"]; role: Role["name"]; id: string };
}) {
  const cookieStore = cookies();
  const token: any = cookieStore.get("token");
  if (!token || !token.value) return notFound();
  const [{ trans }, setting, auth, user, countries, categories]: [
    { trans: any },
    Setting,
    Auth,
    User,
    Country[],
    AppQueryResult<Category[]>
  ] = await Promise.all([
    getDictionary(lang),
    getSetting(),
    getAuth(),
    updateUser(id, lang),
    getCountries("", lang),
    getCategories("", lang),
  ]);

  if (
    !user ||
    !auth ||
    user.id !== auth.id ||
    !countries ||
    !user ||
    !categories ||
    !setting
  )
    return notFound();

  return (
    <MainContextLayout trans={trans} lang={lang} setting={setting}>
      <main className='relative isolate mx-auto max-w-7xl min-h-screen p-3 xl:p-0 space-y-4'>
        {/* <AccountSteps /> */}
        <AccountContent
          element={user}
          countries={countries}
          categories={categories}
          lang={lang}
          role={role}
          id={id}
        />
      </main>
    </MainContextLayout>
  );
}
