// Single source of truth for the portfolio copy. Edit here; components only render it.

import type { Market, Project, SectionCopy, Testimonial } from "@/content/types";
import { cv } from "@/lib/cv";

export const profile = {
  name: "Ahmed Alhibshi",
  initials: "AA",
  role: "Full-Stack Software Engineer",
  location: "Hamala, Bahrain",
  timezone: "GMT+3",
  timeZoneId: "Asia/Bahrain",
  email: "aralhibshi@gmail.com",
  cv: cv.path,
  // Drop a portrait at this path in /public (roughly 4:5, at least 800px wide). Until then a monogram shows.
  photo: "/ahmed-alhibshi.jpg",
  availability: "Open to senior software engineering roles · available now",
  summary:
    "Nearly three years at Calo, a meal-subscription company across the GCC and the UK. I owned Calo Kids, its children's meal plan product, through its full lifecycle, from revamp to sunset, across ~12 shared services and four markets.",
  links: {
    linkedin: "https://www.linkedin.com/in/aralhibshi",
    github: "https://github.com/aralhibshi",
    source: "https://github.com/aralhibshi/portfolio",
    recommendations: "https://www.linkedin.com/in/aralhibshi/details/recommendations/",
  },
} as const;

export const navItems = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "references", label: "References" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;

// Section headings, in page order. Components render these; nothing is hard-coded there.
export const sectionCopy = {
  about: {
    label: "About",
    title: "I'm the engineer you hand a product to, not just a ticket.",
    intro:
      "I started at Calo as an intern in 2023 and left in 2026 as the engineer running a product on my own. Along the way I learned that shipping is half the job; the other half is making sure it keeps working, and that the next person can pick it up.",
  },
  experience: {
    label: "Experience",
    title: "Intern to owner in under three years.",
    intro:
      "Hired full-time out of the internship, then promoted, each step bringing more of the product and more of the conversations around it.",
  },
  work: {
    label: "Selected work",
    title: "What I've shipped.",
    intro:
      "Production work used by paying customers. Most of it lives behind Calo's apps, so there's no public repo to link to. Here's what each one was, and what I did on it.",
  },
  references: {
    label: "References",
    title: "In their words.",
    intro:
      "Excerpts from reference letters written by my direct manager and Calo's VP of Engineering. The full letters are available on request.",
  },
  skills: {
    label: "Skills",
    title: "The toolkit.",
    intro:
      "TypeScript everywhere: React Native on the phone, Node.js on AWS serverless behind it, and the practices that keep both maintainable.",
  },
} satisfies Record<string, SectionCopy>;

export const heroCopy = {
  lead: "I build products",
  emphasis: "end to end",
  tail: ", from architecture to the app in your hand.",
};

export const workCopy = {
  teamHeading: "Internship project",
  teamNote: "Built in a team · not deployed to production",
};

export const contactCopy = {
  label: "Contact",
  title: "Hiring for a senior engineer?",
  titleAside: "Let's talk.",
  intro: "Based in Bahrain and open to roles in the GCC or remote. Email is the fastest way to reach me.",
  popover: "Open to senior roles in the GCC or remote. Email is the fastest way to reach me.",
};

export const stats = [
  { value: "~5,000", label: "customers on a product I built and ran solo" },
  { value: "7", label: "markets reached by my onboarding work, across the GCC and the UK" },
  { value: "~12", label: "platform-wide microservices extended or updated for Calo Kids alone" },
  { value: "~3 yrs", label: "of production experience at Calo" },
] as const;

// Markets my work shipped to. Bahrain is home base and draws the arcs on the hero globe.
export const homeMarket: Market = {
  code: "BH",
  name: "Bahrain",
  location: [26.07, 50.55],
  scope: "Home base · Calo Kids and onboarding",
};

export const markets: Market[] = [
  homeMarket,
  { code: "SA", name: "Saudi Arabia", location: [24.71, 46.68], scope: "Calo Kids and onboarding" },
  { code: "AE", name: "UAE", location: [25.2, 55.27], scope: "Calo Kids and onboarding" },
  { code: "KW", name: "Kuwait", location: [29.37, 47.98], scope: "Calo Kids and onboarding" },
  { code: "QA", name: "Qatar", location: [25.29, 51.53], scope: "Onboarding" },
  { code: "OM", name: "Oman", location: [23.59, 58.41], scope: "Onboarding" },
  { code: "UK", name: "United Kingdom", location: [51.51, -0.13], scope: "Onboarding · short-lived market" },
];

export const principles = [
  {
    title: "I own the whole thing",
    body: "Sole engineer on the Calo Kids revamp across frontend, backend and analytics, from the first sketch to production and every release after it.",
  },
  {
    title: "Built to be built on",
    body: "Clean, well-structured code written for whoever touches it next. Domain-driven boundaries, clear naming, tests where they earn their keep.",
  },
  {
    title: "Calm in production",
    body: "Feature flags, tracked success and failure records, dev-first debugging. The Calo Kids sunset moved ~5,000 subscribers with zero failed migrations and zero support tickets.",
  },
  {
    title: "The bridge between teams",
    body: "The technical voice in meetings with product, design, CX and other teams. I flag design and implementation risks early, then work out solutions that fit the system.",
  },
] as const;

export const flagship: Project = {
  name: "Calo Kids",
  icon: "kids",
  kicker: "Flagship · Sole engineer · 2023—2026",
  summary:
    "Calo Kids is Calo's children's meal plan product. The original version sized every meal from the account holder's weight and height, a limitation of the product: siblings of different ages got the same portions, and two families with same-age kids could get different sizes. I rebuilt it as its own domain around age ranges, with new meal types, per-child allergens and a new app experience, plus the platform-wide changes that let food, CX and operations teams run it. Then I owned it across every layer, serving four GCC markets.",
  highlights: [
    "Introduced 6 new meal types to give each Kids meal its own sizes, macros and calories per age range, implemented across every part of the platform that used meal types",
    "Allergens chosen per child and meal type, so a 2-year-old and a 5-year-old sibling can each have their own",
    "A distinct Kids experience across the whole app: its own onboarding, subscription settings and editing, resume and renewal flows, and Kids-specific animations and visuals",
    "Changes across ~12 platform-wide microservices so the food team could manage Kids meals, and CX and operations could support customers and prepare orders, down to kitchen invoice components",
    "Migrated existing subscribers onto the new model; later added meal customisation, with components unique to each age range",
    "After the domain was split across the core squads, took over sunsetting it as a whole: ~5,000 subscribers, zero failures",
  ],
  decisions: [
    "Sized meals by age range rather than the account holder's measurements, so portions were predictable and consistent across families.",
    "Built Kids into the shared platform services rather than a separate system, so food, CX and operations kept one source of truth.",
  ],
  stack: ["React Native", "TypeScript", "Node.js", "AWS", "DynamoDB", "Segment", "Mixpanel"],
  metric: { value: "~5,000", label: "customers across BH · KSA · UAE · KW" },
};

export const projects: Project[] = [
  {
    name: "Weight Loss Challenge",
    icon: "weight",
    kicker: "Subscription product · Built from scratch",
    summary:
      "A dedicated meal-plan subscription where users track their progress every day, built to drive engagement and retention.",
    highlights: [
      "Its own experience, unlike any other package at the time: a dedicated onboarding flow and its own navigation for subscribers",
      "Personalised weight-projection graphs",
      "Daily tracking of water, meals and macros, weight and steps",
      "Apple Health and Google Fit integration for automatic logging; later built the Health Connect integration (was awaiting Google Play approval)",
      "Story-style progress recap at the end of each challenge",
    ],
    stack: ["React Native", "TypeScript", "Node.js", "AWS"],
    visual: "weight-projection",
  },
  {
    name: "Onboarding funnel · Ramadan 2026",
    icon: "onboarding",
    kicker: "Onboarding team · Core revenue",
    summary:
      "Work on the core subscription onboarding funnel, then a seasonal Ramadan experience that switches itself on and off.",
    highlights: ["Custom and pre-defined package support", "Full analytics instrumentation for conversion tracking"],
    decisions: [
      "Date-range feature flags drove every state change, so the season started and ended with no backend deploy or app release.",
    ],
    stack: ["React Native", "Node.js", "Feature flags", "Segment", "Mixpanel"],
    visual: "ramadan-flag",
  },
  {
    name: "Sunset migration pipeline",
    icon: "pipeline",
    kicker: "Backend · Reliability",
    summary:
      "Moving every Calo Kids subscriber off the product safely, with each record traceable and nothing silently dropped. No support tickets followed.",
    highlights: [
      "Orchestrator gathers affected subscribers and fans out one SQS message per user",
      "Processor routes each user to one of three migration use cases, idempotent and tracked",
      "Replaced an estimated 2–3 days of manual conversion",
      "A seconds-long export gave CX and product a shareable sheet of every case, old and new package, and pause state",
      "Unit and integration tested; dry-run in dev, then in production, before the real run",
    ],
    decisions: [
      "Capped concurrency below maximum throughput, to stay within DynamoDB limits while live traffic continued.",
      "Tracked every record as a success or failure, so nothing could fail silently and CX could act on each case.",
    ],
    metric: { value: "0", label: "failed migrations of ~5,000 · ~1 hour run" },
    stack: ["AWS Lambda", "AWS SQS", "DynamoDB", "OpenSearch", "S3", "TypeScript"],
    visual: "migration-pipeline",
  },
];

// Team projects that were never deployed to production users. Kept separate so the
// "shipped" section above stays strictly about production work.
export const teamProjects: Project[] = [
  {
    name: "Nutritionist Planner",
    icon: "planner",
    kicker: "Calo internship project · Team",
    summary:
      "A dashboard prototype for nutritionists to create and manage meals, with bulk or selective data exports. Built as the Calo internship project.",
    highlights: ["Infrastructure as code from day one", "Typed end to end with Prisma"],
    stack: ["React", "Node.js", "PostgreSQL", "Prisma", "Serverless", "CloudFormation"],
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "Ahmed consistently performed at a level exceeding expectations for his role, operating effectively at a senior level. He took ownership of complex technical problems end-to-end.",
    highlight: "operating effectively at a senior level",
    more: "His code is consistently clean, well-structured, and maintainable. He approaches development with a long-term mindset, ensuring that solutions are not only functional but also scalable and easy for others to build upon. … I strongly recommend Ahmed for senior software engineering roles.",
    name: "Omar Faramawi",
    title: "Engineering Manager, Calo",
    relation: "Direct manager",
  },
  {
    quote:
      "Ahmed joined Calo through the internship program and was selected to continue as a full-time engineer based on his capability, commitment, and potential.",
    highlight: "selected to continue as a full-time engineer",
    more: "He demonstrated deep dedication, a strong ability to learn, and an exceptional ability to accept feedback, which helped him continuously improve as an engineer.",
    name: "Bohdan Stadnyk",
    title: "VP of Engineering, Calo",
    relation: "Engineering leadership",
  },
];

// Day-to-day tools, shown as logo tiles. Icon keys map to logos in the Skills section.
export const coreStack = [
  { name: "TypeScript", icon: "typescript" },
  { name: "React", icon: "react" },
  { name: "React Native", icon: "reactnative" },
  { name: "Next.js", icon: "nextjs" },
  { name: "Node.js", icon: "nodejs" },
  { name: "AWS Lambda", icon: "lambda" },
  { name: "DynamoDB", icon: "dynamodb" },
  { name: "AWS SQS", icon: "sqs" },
  { name: "Serverless", icon: "serverless" },
  { name: "Bitbucket Pipelines", icon: "bitbucket" },
  { name: "GitHub Actions", icon: "githubactions" },
  { name: "Jest", icon: "jest" },
] as const;

export type CoreStackIcon = (typeof coreStack)[number]["icon"];

// Career stages: drive both the ladder chart and the role details under it. `start`/`end` set the
// bar widths (end is exclusive); `period` is the display label. Points stay short: the Selected Work
// cards carry the deeper detail.
export const careerStages = [
  {
    title: "Associate Instructor",
    short: "Instructor",
    org: "General Assembly",
    start: "2023-03",
    end: "2023-07",
    period: "Mar 2023 — Jul 2023",
    points: [
      "Helped teach ~40 students across two full-time software engineering immersive courses.",
      "Mentored students through debugging sessions, project reviews and technical problem-solving.",
    ],
  },
  {
    title: "Intern Software Engineer",
    short: "Intern",
    org: "Calo",
    start: "2023-07",
    end: "2023-10",
    period: "Jul 2023 — Oct 2023",
    points: [
      "Built the Nutritionist Planner, an internal dashboard for creating, managing and exporting meals.",
      "Selected to continue full-time based on capability, commitment and potential.",
    ],
  },
  {
    title: "Associate Software Engineer",
    short: "Associate SE",
    org: "Calo",
    start: "2023-10",
    end: "2025-09",
    period: "Oct 2023 — Sep 2025",
    points: [
      "Built the Weight Loss Challenge subscription product from the ground up, across the app and backend services.",
      "Sole engineer on the Calo Kids revamp, then owned it end to end across frontend, backend and analytics.",
      "Extended and updated ~12 microservices shared by every product on the platform to support Calo Kids.",
      "Shipped biweekly releases with several cross-functional squads, including initial Calo Kids data migrations.",
      "Worked alongside my PM in stakeholder meetings, flagging design and implementation risks early and agreeing workarounds that fit the system.",
    ],
  },
  {
    title: "Software Engineer",
    short: "Software Engineer",
    org: "Calo",
    start: "2025-09",
    end: "2026-05",
    period: "Sep 2025 — Apr 2026",
    points: [
      "Extended Calo Kids with new features for ~5,000 users across Bahrain, Saudi Arabia, UAE and Kuwait.",
      "Onboarded a new associate software engineer onto the app and repository setup.",
      "Moved to the onboarding team and delivered the Ramadan 2026 onboarding experience, with regular backend work across shared microservices, while still maintaining Calo Kids.",
      "Took over sunsetting Calo Kids: ~5,000 subscribers migrated in about an hour, with zero failures and zero support tickets.",
    ],
  },
] as const;

export const education = [
  {
    title: "Software Engineering Immersive",
    org: "General Assembly, Bahrain",
    period: "Nov 2022 — Feb 2023",
  },
] as const;
