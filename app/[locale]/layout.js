import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import localFont from "next/font/local";

import "@/app/globals.css";
import Header from "@/components/Header/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const kufi = localFont({
  src: [{ path: "../fonts/NotoKufiArabic-VariableFont_wght.ttf", weight: "400", style: "normal" }],
  variable: "--font-kufi",
  display: "swap",
});

// Generate static params for each locale
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// 👇 Localized metadata
export async function generateMetadata({ params }) {
  const { locale } = await params;

  // Load translations from the "Meta" namespace
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function RootLayout({ children, params }) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) notFound();

  let messages;
  try {
    messages = (await import(`@/messages/${locale}`)).default;
  } catch {
    notFound();
  }
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} suppressHydrationWarning className="">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${kufi.variable} ${
          locale === "ar" ? kufi.className : ""
        } antialiased h-full bg-background text-foreground`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <main>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
