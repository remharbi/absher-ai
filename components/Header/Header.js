"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import AbsherLogo from "@/public/absher-logo-print.png";
import MOI from "@/public/moi.png";
import Vision2030 from "@/public/vission-logo.png";
import { navList } from "@/lib/navList";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "../LocaleSwitcher/LocaleSwitcher";
import { useLocale } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AnnouncementBar from "./AnnouncementBar";

export default function Header() {
  const locale = useLocale();
  const t = useTranslations("navList");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathSegments = usePathname().split("/").filter(Boolean);
  const currentPath = pathSegments[1];
  const isSabaq = currentPath === "sabaq";
  const [navExpanded, setNavExpanded] = useState(!isSabaq);
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  useEffect(() => {
    setNavExpanded(!isSabaq);
  }, [isSabaq]);

  return (
    <header className={`w-full shadow-md ${isSabaq ? "bg-emerald-950 text-white" : "bg-white text-neutral-900"}`}>
      <AnnouncementBar
        message="New: Explore the latest Absher services and announcements."
        visible={showAnnouncement && !isSabaq}
        onClose={() => setShowAnnouncement(false)}
      />
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
                <span className={`block h-0.5 w-6 rounded-full bg-slate-700 transition ${isMenuOpen ? "translate-y-[5px] rotate-45" : ""}`} />
                <span className={`block h-0.5 w-6 rounded-full bg-slate-700 transition ${isMenuOpen ? "opacity-0" : ""}`} />
                <span className={`block h-0.5 w-6 rounded-full bg-slate-700 transition ${isMenuOpen ? "-translate-y-[5px] -rotate-45" : ""}`} />
              </div>
            </button>

            <div className="flex items-end gap-2">
              <div className="flex items-end">
                <Image className={`${isSabaq ? "filter brightness-0 invert" : ""}`} src={Vision2030} alt="Vision 2030 Logo" height={70} />
              </div>
              <div className="h-22 w-0.5 rounded-md bg-slate-200" />
              <div className="flex items-end">
                <Image className={`${isSabaq ? "filter brightness-0 invert" : ""}`} src={AbsherLogo} alt="Absher Logo" height={80} />
              </div>
            </div>
          </div>

          <div className={`flex justify-center sm:justify-end ${isSabaq ? "filter brightness-0 invert" : ""}`}>
            <Image src={MOI} alt="Ministry of Interior Logo" width={80} height={80} />
          </div>
        </div>

        <div className="min-w-0">
          <div
            className={`hidden flex-wrap items-center justify-center gap-3 sm:gap-4 md:flex overflow-hidden transition-[max-height,opacity,transform] duration-500 ease-out ${
              navExpanded ? "max-h-72 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-3 pointer-events-none"
            }`}>
            {navList.map((navItem) => (
              <Link
                key={navItem.name}
                href={`/${locale}/${navItem.url}`}
                className={`hover:cursor-pointer ${
                  navItem.name != "sabaq" ? "pointer-events-none bg-gray-300 border-b-gray-800" : "border-b-green-300 hover:bg-green-100"
                } relative flex flex-col items-center justify-around rounded-md border border-slate-200 border-b-2  font-bold text-slate-800 text-[11px] h-22 w-24 `}>
                {navItem.name === "sabaq" ? (
                  <span className="absolute left-0 top-0 rounded-br-md bg-red-500 px-2 py-1 text-[10px] font-bold uppercase text-white">
                    {t("new")}
                  </span>
                ) : null}

                <div className={`${navItem.icon} ${navItem.name != "sabaq"? "filter brightness-0":""} h-16 w-16`} />
                <p className="text-center">{t(`${navItem.name}`)}</p>
              </Link>
            ))}

            <LocaleSwitcher />
            <button className="flex flex-col items-center justify-around rounded-md border border-slate-200 border-b-2 pointer-events-none bg-gray-300 border-b-gray-800 font-bold text-slate-800 text-[11px] h-22 w-24">
              <div className={`icons icon-logout h-16 w-16 filter brightness-0`} />
              <p>{t("logout")}</p>
            </button>
          </div>

          {isMenuOpen ? (
            <div
              className={`mt-2 flex flex-wrap items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-sm md:hidden overflow-hidden transition-[max-height,opacity,transform] duration-500 ease-out ${
                navExpanded ? "max-h-[500px] opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-3 pointer-events-none"
              }`}>
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

          <div
            className={`mt-3 overflow-hidden transition-[max-height,opacity,transform] duration-500 ease-out ${
              navExpanded ? "max-h-0 opacity-0 -translate-y-2 pointer-events-none" : "max-h-16 opacity-100 translate-y-0"
            }`}>
            <Link
              href={`/${locale}`}
              className={`flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-semibold shadow-sm ${
                isSabaq ? "border-emerald-700/50 bg-emerald-900/70 text-emerald-50" : "border-emerald-200 bg-emerald-50 text-emerald-900"
              }`}>
              <span>{t("back")}</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
