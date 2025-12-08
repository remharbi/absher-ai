import React from "react";
import Image from "next/image";
import AbsherLogo from "@/public/absher-logo-print.png";
import MOI from "@/public/moi_logo.jpg";
import Vision2030 from "@/public/vission-logo.png";
import { navList } from "@/lib/navList";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "../LocaleSwitcher/LocaleSwitcher";
import { useLocale } from "next-intl";

export default function Header() {
  const locale = useLocale();
  const t = useTranslations("navList");

  return (
    <header className="flex items-center gap-6 p-4 bg-white shadow-md px-60">
      <div className="flex gap-2">
        <div className="flex items-end">
          <Image src={Vision2030} alt="Vision 2030 Logo" height={70} />
        </div>
        <div className="w-0.5 rounded-md bg-slate-200 h-22" />
        <div className="flex items-end">
          <Image src={AbsherLogo} alt="Absher Logo" height={80} />
        </div>
      </div>
      <div className={`flex gap-2 items-center ${locale === "en" ? "mr-auto ml-16" : "ml-auto mr-16"}`}>
        {navList.map((navItem) => (
          <div key={navItem.name}>
            <button className="flex flex-col items-center justify-around hover:cursor-pointer hover:bg-green-100 border border-slate-200 rounded-md font-bold text-slate-800 text-[11px] h-22 w-24 border-b-2 border-b-green-300">
              <div className={`${navItem.icon} h-16 w-16`} />
              <p>{t(`${navItem.name}`)}</p>
            </button>
          </div>
        ))}

        <LocaleSwitcher />
        <button className="flex flex-col items-center justify-around hover:cursor-pointer hover:bg-green-100 border border-slate-200 rounded-md font-bold text-slate-800 text-[11px] h-22 w-24 border-b-2 border-b-green-300">
          <div className={`icons icon-logout h-16 w-16`} />
          <p>{t("logout")}</p>
        </button>
      </div>
      <div>
        <Image src={MOI} alt="Ministry of Interior Logo" width={80} height={80} />
      </div>
    </header>
  );
}
