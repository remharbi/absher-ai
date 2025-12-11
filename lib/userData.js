const sampleCities = [
  "Riyadh",
  "Jeddah",
  "Dammam",
  "Khobar",
  "Makkah",
  "Madinah",
  "Abha",
  "Tabuk",
  "Hail",
  "Jazan",
];

const airlines = ["SAUDIA", "Flynas", "Flyadeal", "Qatar Airways", "Emirates", "Gulf Air", "Turkish Airlines"];
const travelPurposes = ["Leisure", "Vacation", "Study / Training"];
const travelCities = [
  { city: "Dubai", country: "United Arab Emirates" },
  { city: "Istanbul", country: "Turkey" },
  { city: "Cairo", country: "Egypt" },
  { city: "London", country: "United Kingdom" },
  { city: "Doha", country: "Qatar" },
  { city: "Paris", country: "France" },
  { city: "Kuala Lumpur", country: "Malaysia" },
  { city: "Amman", country: "Jordan" },
];

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const formatDate = (date) =>
  date.toISOString().slice(0, 10);

const randomFutureDate = (minDays, maxDays) => {
  const days = randomInt(minDays, maxDays);
  const date = new Date();
  date.setDate(date.getDate() + days);
  return { date: formatDate(date), daysLeft: days };
};

const randomPastDateRange = (minDaysAgo, maxDaysAgo, durationMin = 4, durationMax = 15) => {
  const startAgo = randomInt(minDaysAgo, maxDaysAgo);
  const duration = randomInt(durationMin, durationMax);
  const entry = new Date();
  entry.setDate(entry.getDate() - startAgo);
  const exit = new Date(entry);
  exit.setDate(entry.getDate() + duration);
  return {
    entry_date: formatDate(entry),
    exit_date: formatDate(exit),
    travel_duration_days: duration,
  };
};

const generateActiveServices = () => {
  const passportDate = randomFutureDate(7, 220);
  const licenseDate = randomFutureDate(30, 320);
  const idDate = randomFutureDate(90, 420);

  return [
    {
      service_id: "PR-201",
      service_name: "Passport",
      category: "travel",
      expiry_date: passportDate.date,
      document_number: `P${randomInt(100000000, 999999999)}`,
      status: passportDate.daysLeft < 20 ? "pending" : "valid",
      days_left: passportDate.daysLeft,
    },
    {
      service_id: "DL-101",
      service_name: "Driver License",
      category: "vehicle",
      expiry_date: licenseDate.date,
      license_type: Math.random() > 0.5 ? "Private" : "Public",
      status: licenseDate.daysLeft < 45 ? "pending" : "valid",
      days_left: licenseDate.daysLeft,
    },
    {
      service_id: "ID-001",
      service_name: "National ID",
      category: "identity",
      expiry_date: idDate.date,
      status: idDate.daysLeft < 30 ? "pending" : "valid",
      days_left: idDate.daysLeft,
    },
  ];
};

const generatePastTravels = () => {
  const tripCount = randomInt(1, 3);
  return Array.from({ length: tripCount }).map((_, idx) => {
    const city = travelCities[randomInt(0, travelCities.length - 1)];
    const { entry_date, exit_date, travel_duration_days } = randomPastDateRange(40, 480, 4, 14);
    return {
      travel_id: `T-202${randomInt(1, 4)}-${String(randomInt(1, 999)).padStart(3, "0")}`,
      destination_country: city.country,
      city: city.city,
      travel_purpose: travelPurposes[randomInt(0, travelPurposes.length - 1)],
      entry_date,
      exit_date,
      travel_duration_days,
      travel_method: "Air",
      airline: airlines[randomInt(0, airlines.length - 1)],
    };
  });
};

const generateViolations = () => {
  const hasViolation = Math.random() > 0.4;
  if (!hasViolation) return [];
  const amount = [150, 300, 500, 750][randomInt(0, 3)];
  const daysAgo = randomInt(5, 180);
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return [
    {
      violation_id: `V-${randomInt(10000, 99999)}`,
      type: "Speeding",
      amount,
      date: formatDate(date),
      status: Math.random() > 0.5 ? "unpaid" : "paid",
    },
  ];
};

export const generateDashboardData = () => ({
  activeServices: generateActiveServices(),
  pastTravels: generatePastTravels(),
  violations: generateViolations(),
});

export const generateUserProfile = () => {
  const now = new Date();
  const lastLogin = new Date(now);
  lastLogin.setHours(now.getHours() - randomInt(1, 72));
  return {
    user_id: `${randomInt(1000000000, 9999999999)}`,
    full_name: Math.random() > 0.5 ? "Reem AlHarbi" : "Khalid AlSayed",
    national_id: `${randomInt(1000000000, 9999999999)}`,
    mobile: `9665${randomInt(100000000, 999999999)}`,
    city: sampleCities[randomInt(0, sampleCities.length - 1)],
    gender: Math.random() > 0.5 ? "female" : "male",
    birth_date_hijri: "1412-05-17",
    last_login: lastLogin.toISOString(),
  };
};

export const generateUserData = () => {
  const dashboard = generateDashboardData();
  return {
    user_profile: generateUserProfile(),
    active_services: dashboard.activeServices,
    violations: dashboard.violations,
    dependents: [],
    past_travels: dashboard.pastTravels,
  };
};

// Default snapshots for components that still import static data
export const dashboardData = generateDashboardData();
export const userProfile = generateUserProfile();
export const userData = generateUserData();
