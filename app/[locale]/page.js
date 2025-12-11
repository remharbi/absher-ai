"use client";

import { useTranslations } from "next-intl";
import { dashboardData } from "@/lib/userData";
import TravelsList from "@/components/Travels/TravelsList";

const sidebarLinks = [{ key: "electronicServices", active: true }, { key: "authorization" }, { key: "surveys" }, { key: "payments" }];

const quickServices = ["myServices", "vehicles", "familyMembers", "workers", "appointments"];

const otherServices = [
  { key: "criminalRecord", isNew: true },
  { key: "absherReports", isNew: true },
  { key: "vehicleTransfer" },
  { key: "plateAuction" },
  { key: "serviceSuspension" },
];

const socialItems = ["youtube", "x", "facebook", "snapchat"];
const accessibilityItems = ["small", "large", "view"];
const aboutItems = ["aboutAbsher", "privacyPolicy", "terms", "news", "sla", "accessibility"];
const contactItems = ["contact", "corruption", "faqs", "channels", "idActivation", "registration"];
const linkItems = ["interior", "nationalPortal", "aiStrategy", "openData", "eParticipation", "consultation"];

export default function Home() {
  const t = useTranslations("homepage");
  const normalizeKey = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <div className="min-h-screen bg-[#f5f6f7] pb-16">
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-800">{t("dashboard.activeServices.title")}</h2>
              <span className="text-xs font-semibold text-green-700">{t("dashboard.activeServices.statusSynced")}</span>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {dashboardData.activeServices.map((service) => (
                <article key={service.service_id} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.08em] text-slate-500">
                        {t(`dashboard.activeServices.categories.${service.category}`)}
                      </p>
                      <h3 className="text-lg font-semibold text-slate-900">{t(`dashboard.activeServices.services.${service.service_id}`)}</h3>
                      <p className="text-xs text-slate-500">
                        {t("dashboard.activeServices.labels.id")}: {service.document_number ?? service.service_id}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-2 py-1 text-[11px] font-semibold ${
                        service.status === "valid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                      }`}>
                      {t(`dashboard.activeServices.status.${service.status}`)}
                    </span>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-slate-600">
                    <div className="rounded-md bg-slate-50 px-3 py-2">
                      <p className="text-xs text-slate-500">{t("dashboard.activeServices.labels.expiry")}</p>
                      <p className="font-semibold text-slate-800">{service.expiry_date}</p>
                    </div>
                    <div className="rounded-md bg-slate-50 px-3 py-2">
                      <p className="text-xs text-slate-500">{t("dashboard.activeServices.labels.daysLeft")}</p>
                      <p className="font-semibold text-slate-800">{service.days_left}</p>
                    </div>
                  </div>
                  {service.license_type ? (
                    <p className="mt-2 rounded-md bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-800">
                      {t("dashboard.activeServices.labels.licenseType")}: {service.license_type}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="text-lg font-bold text-slate-800">{t("dashboard.violations.title")}</h2>
              <div className="mt-3 space-y-3">
                {dashboardData.violations.map((v) => (
                  <div key={v.violation_id} className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-amber-900">{t(`dashboard.violations.types.${normalizeKey(v.type)}`)}</p>
                      <span className="text-xs font-bold text-amber-800">{t(`dashboard.violations.status.${v.status}`)}</span>
                    </div>
                    <p className="text-xs text-amber-800">
                      {t("dashboard.violations.labels.id")}: {v.violation_id}
                    </p>
                    <div className="mt-2 flex items-center justify-between text-sm text-amber-900">
                      <span>
                        {t("dashboard.violations.labels.date")}: {v.date}
                      </span>
                      <span className="font-semibold">
                        {t("dashboard.violations.labels.amount")}: {v.amount}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

              <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                <h2 className="text-lg font-bold text-slate-800">{t("dashboard.travels.title")}</h2>
                <TravelsList travels={dashboardData.pastTravels} />
              </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 mt-6">
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {quickServices.map((serviceKey) => (
                <article
                  key={serviceKey}
                  className="flex flex-col items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 text-center shadow-sm">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-lg font-bold text-green-700">
                    {t(`quickServices.${serviceKey}`).charAt(0)}
                  </div>
                  <button className="w-full rounded-md bg-green-700 px-3 py-2 text-sm font-semibold text-white shadow-sm">
                    {t(`quickServices.${serviceKey}`)}
                  </button>
                </article>
              ))}
            </div>

            <div className="rounded-lg border border-slate-200 bg-white px-6 py-6 shadow-sm">
              <div className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                <span className="h-px flex-1 bg-slate-200" />
                <span>{t("otherServices.title")}</span>
                <span className="h-px flex-1 bg-slate-200" />
              </div>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                {otherServices.map((service) => (
                  <article
                    key={service.key}
                    className="relative flex flex-col items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 text-center shadow-sm">
                    {service.isNew ? (
                      <span className="absolute left-0 top-0 rounded-br-md bg-red-500 px-2 py-1 text-[10px] font-bold uppercase text-white">
                        {t("otherServices.badge")}
                      </span>
                    ) : null}
                    <div className="flex h-14 w-14 items-center justify-center rounded-md border border-slate-200 bg-slate-50 text-sm font-bold text-green-700">
                      {t(`otherServices.${service.key}`).charAt(0)}
                    </div>
                    <p className="text-sm font-semibold text-slate-700">{t(`otherServices.${service.key}`)}</p>
                  </article>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-700" />
                <span className="h-2 w-2 rounded-full bg-slate-300" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl space-y-6 px-6 py-10 text-sm text-slate-600">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-slate-800">{t("footer.socialMedia")}</h3>
              <div className="flex flex-wrap gap-2">
                {socialItems.map((label) => (
                  <span key={label} className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600">
                    {t(`footer.social.${label}`)}
                  </span>
                ))}
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-slate-800">{t("footer.accessibilityTools")}</h4>
                <div className="flex gap-2">
                  {accessibilityItems.map((label) => (
                    <span key={label} className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600">
                      {t(`footer.accessibility.${label}`)}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-800">{t("footer.aboutTitle")}</h3>
              {aboutItems.map((item) => (
                <p key={item} className="text-sm text-slate-600">
                  {t(`footer.about.${item}`)}
                </p>
              ))}
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-800">{t("footer.contactTitle")}</h3>
              {contactItems.map((item) => (
                <p key={item} className="text-sm text-slate-600">
                  {t(`footer.contact.${item}`)}
                </p>
              ))}
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-800">{t("footer.linksTitle")}</h3>
              {linkItems.map((item) => (
                <p key={item} className="text-sm text-slate-600">
                  {t(`footer.links.${item}`)}
                </p>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start gap-4 rounded-lg border border-slate-200 bg-[#f5f6f7] px-6 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-green-600" />
              <div>
                <p className="text-xs font-semibold text-slate-500">{t("footer.callCenterLabel")}</p>
                <p className="text-xl font-bold text-green-700">{t("footer.callCenterNumber")}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-10 w-32 rounded-md bg-black/80" />
              <div className="h-10 w-32 rounded-md bg-slate-300" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
