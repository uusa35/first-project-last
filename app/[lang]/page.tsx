import type { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import HomeContent from "@/components/home/HomeContent";
import { MainContextLayout } from "@/components/MainContentLayout";
import { getNationalEvents, getNationalEvent } from "@/utils/nationalevent";
import { getUsers } from "@/utils/user";
import ComingSoon from "@/components/ComingSoon";

type Props = {
  params: { lang: Locale };
};

export default async function Home({ params: { lang } }: Props) {
  // const test = await new Promise((resolve) => setTimeout(resolve, 20000));
  const [{ trans }, nationalEvents, users, nationalEvent] = await Promise.all([
    getDictionary(lang),
    getNationalEvents(""),
    getUsers(),
    getNationalEvent(1),
  ]);

  return (
    <MainContextLayout trans={trans}>
      <ComingSoon />
    </MainContextLayout>
  );
}

//   <HomeContent
//     nationalEvents={nationalEvents}
//     users={users}
//     lang={lang}
//     nationalEvent={nationalEvent}
//   />
