import "@/styles/globals.css";
import type { Metadata } from "next";
import { Locale, i18n as trans } from "@/i18n.config";
import { Tajawal } from "next/font/google";
import Providers from "@/src/redux/provider";
import MainLayout from "@/src/components/layouts/MainLayout";

const tajawal = Tajawal({
  weight: "400",
  subsets: ["latin"],
  // display: "swap",
});

export const metadata: Metadata = {
  title: "Ar Expo",
  description: "Ar Expo Group",
};

export async function generateStaticParams() {
  return trans.locales.map((locale) => ({ lang: locale }));
}
// const trans = async () =>
//   await getDictionary(params.lang).then((r: any) => r.data);

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    <html
      className='min-h-screen max-w-8xl mx-auto '
      lang={params.lang}
      dir={params.lang === "ar" ? "rtl" : "ltr"}>
      <body
        className={`${tajawal.className}`}
        dir={params.lang === "ar" ? "rtl" : "ltr"}>
        <Providers>
          <MainLayout lang={params.lang}>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}
