import "@/styles/globals.css";
import type { Metadata } from "next";
import { Locale } from "@/types/index";
import { removeTags, tajawal } from "@/utils/helpers";
import Providers from "@/src/redux/provider";
import MainLayout from "@/src/components/layouts/MainLayout";
import { getSetting } from "@/utils/setting";

type Props = {
  params: { lang: Locale["lang"] };
};

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
