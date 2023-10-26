import "@/styles/globals.css";
import type { Metadata } from "next";
import { Locale } from "@/types/index";
import { tajawal } from "@/utils/helpers";
import Providers from "@/src/redux/provider";
import MainLayout from "@/src/components/layouts/MainLayout";
import { getSetting } from "@/utils/setting";

type Props = {
  params: { lang: Locale["lang"] };
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
    metadataBase: process.env.NEXT_PUBLIC_BASE_URL,
    alternates: {
      canonical: "/",
      languages: {
        "en-US": "/en",
        "ar-SA": "/ar",
        "ru-RU": "/ru",
      },
    },
    icons: {
      icon: setting.image,
      shortcut: setting.image,
      apple: setting.image,
      other: {
        rel: "apple-touch-icon-precomposed",
        url: setting.image,
      },
    },
    twitter: {
      card: setting.name,
      title: setting.name,
      description: setting.description,
      // siteId: "1467726470533754880",
      creator: "@nextjs",
      // creatorId: "1467726470533754880",
      images: [setting.image],
    },
  };
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale["lang"]; setting: any };
}) {
  return (
    <html
      className='min-h-screen max-w-8xl mx-auto '
      lang={params.lang}
      dir={params.lang === "ar" ? "rtl" : "ltr"}>
      <body
        className={`font-expo-medium`}
        dir={params.lang === "ar" ? "rtl" : "ltr"}>
        <Providers>
          <MainLayout lang={params.lang}>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}
