import {
  IconBrain,
  IconCalendarEvent,
  IconChartBar,
  IconCode,
  IconCreditCard,
  IconDatabase,
  IconDevices,
  IconFileText,
  IconPencil,
  IconPhoto,
  IconPlugConnected,
  IconSearch,
  IconShieldCheck,
  IconStar,
  type Icon,
} from "@tabler/icons-react";

// Order handles overlapping subjects: CAPTCHA is security, and AI-readable
// search content describes discovery rather than application automation.
const detailIcons: readonly [RegExp, Icon][] = [
  [/\b(security|captcha|spam|suspicious|screening|permissions?|authori[sz]ation|authentication|passwords?|credentials?|access|role-based|approvals?|audit)\b/i, IconShieldCheck],
  [/\b(analytics|ga4|gtag|gtm|conversions?|measurement|tracking|instrumentation)\b|\b(google ads|google tag manager|meta pixel)\b/i, IconChartBar],
  [/\b(seo|search|metadata|canonical|crawlers?|crawling|sitemaps?|indexing|discovery|structured data|open graph|social previews?|shared-link|ai-readable|ai readability)\b/i, IconSearch],
  [/\b(ai|automation|automated|llms?|agents?)\b/i, IconBrain],
  [/\b(media|cdn|uploads?|images?|photography|photos?|videos?|assets?|storage|backblaze|b2|r2)\b/i, IconPhoto],
  [/\b(reviews|testimonials?|ratings?)\b|\b(google|places|customer|product|business) review\b|\breview (integration|support|administration)\b/i, IconStar],
  [/\b(bookings?|appointments?|calendar|reservations?|scheduling|schedules?|timetables?|availability|timesheets?)\b|\bresource[- ](aware|conflict)\b/i, IconCalendarEvent],
  [/\b(payments?|stripe|commerce|checkout|storefront|shops?|sales|purchasing|purchases?|stock|inventory|cashiers?|financial|liquidation|allocations?|invoices?)\b/i, IconCreditCard],
  [/\b(documents?|pdfs?|quotations?|contracts?|agreements?)\b/i, IconFileText],
  [/\b(cms|content|publishing|catalog|catalogue)\b/i, IconPencil],
  [/\b(reports?|reporting|data|databases?|records?|traceability|reconciliation|bookkeeping)\b/i, IconDatabase],
  [/\b(ui|ux|interfaces?|design|responsive|accessible|accessibility|mobile|android|desktop|frontend|front-end|presentation|components?|visual|3d|interaction|interactive|storytelling|browser)\b/i, IconDevices],
  [/\b(integrations?|api|oauth|webhooks?|endpoints?|connected|connections?|connectivity|synchroni[sz]ation)\b/i, IconPlugConnected],
];

export function getProjectDetailIcon(title: string): Icon {
  return detailIcons.find(([keywords]) => keywords.test(title))?.[1] ?? IconCode;
}
