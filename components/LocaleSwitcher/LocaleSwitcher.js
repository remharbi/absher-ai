"use client";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const other = locale === "ar" ? "English" : "عربي";

  const langSwitch = () => {
    console.log(other);
    switch (other) {
      case "English":
        return "en";
      case "عربي":
        return "ar";
      default:
        return "ar";
    }
  };

  return (
    <button
      className="flex flex-col items-center justify-around hover:cursor-pointer hover:bg-green-100 border border-slate-200 rounded-md font-bold text-slate-800 text-[11px] h-22 w-24 border-b-2 border-b-green-300"
      onClick={() => {
        router.replace(pathname, { locale: langSwitch() });
      }}
      aria-label={`Switch to ${other}`}>
      <div className={`icons icon-language h-16 w-16`} />
      <p>{other}</p>
    </button>
  );
}
