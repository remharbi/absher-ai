import { getRecommendations } from "./recommendations";
import { generateUserData } from "./userData";

function clamp01(value) {
  return Math.max(0, Math.min(1, value));
}

function scoreDocuments(activeServices) {
  const horizon = 180; // days
  return activeServices.map((service) => {
    const days = service.days_left ?? horizon;
    const urgency = clamp01(1 - days / horizon);
    return {
      title: `Renew ${service.service_name}`,
      score: urgency,
      detail: `Expiry: ${service.expiry_date} • ${days} days left`,
    };
  });
}

function scoreViolations(violations) {
  return violations.map((v) => ({
    title: `Pay violation ${v.type}`,
    score: 0.8,
    detail: `Amount: ${v.amount} • Date: ${v.date} • Status: ${v.status}`,
  }));
}

function scoreTravel(pastTravels) {
  if (!pastTravels.length) return [];
  const lastTravel = pastTravels[0];
  return [
    {
      title: `Plan upcoming travel after ${lastTravel.destination_country}`,
      score: 0.3,
      detail: `Last trip: ${lastTravel.city}, ${lastTravel.destination_country} (${lastTravel.exit_date})`,
    },
  ];
}

export async function getProactiveRecommendations({ userData } = {}) {
  const resolvedUserData = userData || generateUserData();
  const items = [
    ...scoreDocuments(resolvedUserData.active_services || []),
    ...scoreViolations(resolvedUserData.violations || []),
    ...scoreTravel(resolvedUserData.past_travels || []),
  ];

  return getRecommendations({ items });
}
