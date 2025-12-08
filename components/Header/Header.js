"use client";

import React, { useState } from "react";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-md">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-green-50 md:hidden"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsMenuOpen((open) => !open)}>
              <span className="sr-only">{isMenuOpen ? "Close menu" : "Open menu"}</span>
              <div className="flex flex-col gap-1">
                <span className={`block h-[2px] w-6 rounded-full bg-slate-700 transition ${isMenuOpen ? "translate-y-[5px] rotate-45" : ""}`} />
                <span className={`block h-[2px] w-6 rounded-full bg-slate-700 transition ${isMenuOpen ? "opacity-0" : ""}`} />
                <span className={`block h-[2px] w-6 rounded-full bg-slate-700 transition ${isMenuOpen ? "-translate-y-[5px] -rotate-45" : ""}`} />
              </div>
            </button>

            <div className="flex items-end gap-2">
              <div className="flex items-end">
                <Image src={Vision2030} alt="Vision 2030 Logo" height={70} />
              </div>
              <div className="h-22 w-0.5 rounded-md bg-slate-200" />
              <div className="flex items-end">
                <Image src={AbsherLogo} alt="Absher Logo" height={80} />
              </div>
            </div>
          </div>

          <div className="flex justify-center sm:justify-end">
            <Image src={MOI} alt="Ministry of Interior Logo" width={80} height={80} />
          </div>
        </div>

        <div className="min-w-0">
          <div className="hidden flex-wrap items-center justify-center gap-3 sm:gap-4 md:flex">
            {navList.map((navItem) => (
              <button
                key={navItem.name}
                className="flex flex-col items-center justify-around rounded-md border border-slate-200 border-b-2 border-b-green-300 font-bold text-slate-800 text-[11px] h-22 w-24 hover:bg-green-100">
                <div className={`${navItem.icon} h-16 w-16`} />
                <p>{t(`${navItem.name}`)}</p>
              </button>
            ))}

            <LocaleSwitcher />
            <button className="flex flex-col items-center justify-around rounded-md border border-slate-200 border-b-2 border-b-green-300 font-bold text-slate-800 text-[11px] h-22 w-24 hover:bg-green-100">
              <div className={`icons icon-logout h-16 w-16`} />
              <p>{t("logout")}</p>
            </button>
          </div>

          {isMenuOpen ? (
            <div className="mt-2 flex flex-wrap items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-sm md:hidden">
              {navList.map((navItem) => (
                <button
                  key={navItem.name}
                  className="flex flex-col items-center justify-around rounded-md border border-slate-200 border-b-2 border-b-green-300 font-bold text-slate-800 text-[11px] h-22 w-24 hover:bg-green-100">
                  <div className={`${navItem.icon} h-16 w-16`} />
                  <p>{t(`${navItem.name}`)}</p>
                </button>
              ))}

              <LocaleSwitcher />
              <button className="flex flex-col items-center justify-around rounded-md border border-slate-200 border-b-2 border-b-green-300 font-bold text-slate-800 text-[11px] h-22 w-24 hover:bg-green-100">
                <div className={`icons icon-logout h-16 w-16`} />
                <p>{t("logout")}</p>
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
