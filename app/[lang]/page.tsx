import type { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import HomeContent from "@/components/home/HomeContent";
import { MainContextLayout } from "@/components/MainContentLayout";
import { getUsers } from "@/utils/user";
import ComingSoon from "@/components/ComingSoon";
import { getSlides } from "@/utils/slide";
import { getCategories } from "@/utils/category";
import { getSetting } from "@/utils/setting";
import { Metadata } from "next";
import { CheckIcon } from "@heroicons/react/20/solid";
import NavHeader from "@/components/NavHeader";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

type Props = {
  params: { lang: Locale };
};

// or Dynamic metadata
export async function generateMetadata({ params }: Props) {
  const setting = await getSetting(params.lang);
  return {
    title: setting.name,
    description: setting.description,
    lang: params.lang,
    openGraph: {
      title: setting.name,
      description: setting.description,
      url: setting.instagram,
      siteName: setting.name,
      images: [
        {
          url: setting.image,
          width: 800,
          height: 600,
        },
        {
          url: setting.image,
          width: 1800,
          height: 1600,
          alt: "My custom alt",
        },
      ],
      locale: params.lang,
      type: "website",
    },
    generator: setting.name,
    applicationName: setting.name,
    referrer: "origin-when-cross-origin",
    keywords: setting.keywords,
    authors: [
      { name: setting.name },
      { name: setting.name, url: setting.facebook },
    ],
    colorScheme: "light",
    creator: setting.name,
    publisher: setting.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
  };
}

export default async function Home({ params: { lang } }: Props) {
  const [{ trans }, users, slides, categories, setting] = await Promise.all([
    getDictionary(lang),
    getUsers(``, lang),
    getSlides(`on_home=1`, lang),
    getCategories(`on_home=1`, lang),
    getSetting(lang),
  ]);

  return (
    <MainContextLayout trans={trans}>
      <ComingSoon />
      {/* nav & slider */}
      {/* <NavHeader lang={lang} /> */}
      {/* <HomeContent
        users={users}
        lang={lang}
        categories={categories}
        slides={slides}
        setting={setting}
      /> */}
    </MainContextLayout>
  );
}
