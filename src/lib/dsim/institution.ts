/**
 * Centralized Institution Configuration for KPR College of Arts, Science and Research (KPRCAS)
 * DSIM - Disciplinary & Student Incident Management System
 */

export interface InstitutionConfig {
  name: string;
  shortName: string;
  systemName: string;
  systemFullName: string;
  preferredBranding: string;
  establishedYear: number;
  management: string;
  website: string;
  location: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  phone: string;
  admissionPhone: string;
  antiRaggingPhone: string;
  wardenPhone: string;
  email: string;
  admissionEmail: string;
  studentAffairsEmail: string;
  iccEmail: string;
  securityEmail: string;
  description: string;
  logoUrl: string;
}

export const INSTITUTION: InstitutionConfig = {
  name: "KPR College of Arts, Science and Research",
  shortName: "KPRCAS",
  systemName: "DSIM",
  systemFullName: "Disciplinary & Student Incident Management System",
  preferredBranding: "KPRCAS DSIM",
  establishedYear: 2019,
  management: "KPR Charities",
  website: "https://kprcas.ac.in/",
  location: "Avinashi Road, Arasur, Coimbatore - 641407, Tamil Nadu",
  address: "Avinashi Road, Arasur",
  city: "Coimbatore",
  state: "Tamil Nadu",
  postalCode: "641407",
  phone: "0422 2635678",
  admissionPhone: "88707 00678",
  antiRaggingPhone: "1800-180-5522",
  wardenPhone: "+91 94430 88201",
  email: "info@kprcas.ac.in",
  admissionEmail: "admission@kprcas.ac.in",
  studentAffairsEmail: "studentaffairs@kprcas.ac.in",
  iccEmail: "icc@kprcas.ac.in",
  securityEmail: "security@kprcas.ac.in",
  description:
    "KPR College of Arts, Science and Research (KPRCAS) is committed to academic excellence, professional skill development, research-driven learning, and holistic student development.",
  logoUrl: "/kpr-logo.svg.png",
};

export const kprcasSchools = [
  "School of Management",
  "School of Commerce",
  "School of IT Integrated Commerce",
  "School of Fashion",
  "School of Computing Science",
  "School of Intelligent Systems & Data Science",
  "Science & Humanities",
  "Postgraduate Programmes",
] as const;

export type KprcasSchool = (typeof kprcasSchools)[number];

export const kprcasProgramsBySchool: Record<KprcasSchool, string[]> = {
  "School of Management": [
    "B.B.A.",
    "B.B.A. (CA)",
    "B.B.A. Logistics",
    "B.B.A. International Business",
  ],
  "School of Commerce": [
    "B.Com.",
    "B.Com. (PA)",
    "B.Com. (B&I)",
  ],
  "School of IT Integrated Commerce": [
    "B.Com. (CA)",
    "B.Com. (BA)",
    "B.Com. (E-Com)",
    "B.Com. (IT)",
  ],
  "School of Fashion": [
    "B.Sc. Costume Design and Fashion",
  ],
  "School of Computing Science": [
    "B.Sc. Computer Science",
    "B.Sc. Information Technology",
    "B.Sc. Computer Technology",
    "B.C.A.",
    "B.Sc. CS with Cyber Security",
  ],
  "School of Intelligent Systems & Data Science": [
    "B.Sc. Computer Science with Data Analytics",
    "B.Sc. AI & ML",
    "B.Sc. CS with AI & Data Science",
    "B.Sc. Data Science",
    "B.Sc. CS with Cloud Computing",
  ],
  "Science & Humanities": [
    "B.Sc. Mathematics",
    "B.A. English",
  ],
  "Postgraduate Programmes": [
    "M.Com.",
    "M.Sc. Data Science",
  ],
};

export const kprcasAllPrograms: string[] = Object.values(kprcasProgramsBySchool).flat();

export const kprcasComplaintCategories = [
  "Academic Misconduct",
  "Harassment",
  "Bullying",
  "Ragging",
  "Student Misconduct",
  "Property Damage",
  "Substance-related Incident",
  "Unauthorized Activity",
  "Hostel-related Incident",
  "Campus Safety",
  "Cyber / Digital Misconduct",
  "Other",
] as const;

export const kprcasComplaintLocations = [
  "Campus Main Quadrangle",
  "Classroom",
  "Laboratory",
  "Library",
  "Hostel Block",
  "Canteen / Food Court",
  "Sports Facility",
  "Transport / Bus",
  "Parking",
  "Event / Auditorium / Venue",
  "Online / Digital",
  "Off Campus",
  "Other",
] as const;

export interface NotificationRecipientConfig {
  role: string;
  label: string;
  email: string;
  receives: string[];
}

export const institutionalNotificationRecipients: NotificationRecipientConfig[] = [
  {
    role: "Principal",
    label: "Principal",
    email: "principal@kprcas.ac.in",
    receives: ["NEW_COMPLAINT_SUBMITTED"],
  },
  {
    role: "Administrative Officer",
    label: "Administrative Officer (AO)",
    email: "ao@kprcas.ac.in",
    receives: ["NEW_COMPLAINT_SUBMITTED"],
  },
  {
    role: "Committee Head",
    label: "Discipline Committee Head",
    email: "discipline.head@kprcas.ac.in",
    receives: ["NEW_COMPLAINT_SUBMITTED"],
  },
];
