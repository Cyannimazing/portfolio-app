"use client";
import { IconBrandAzure, IconBrandCss3, IconBrandFacebook, IconBrandFigma, IconBrandGit, IconBrandGithub, IconBrandGoogle, IconBrandHtml5, IconBrandInstagram, IconBrandJavascript, IconBrandLaravel, IconBrandMongodb, IconBrandMysql, IconBrandNextjs, IconBrandNodejs, IconBrandNuxt, IconBrandOpenai, IconBrandPhp, IconBrandReact, IconBrandReactNative, IconBrandStripe, IconBrandSupabase, IconBrandTailwind, IconBrandTypescript, IconBrandVscode, IconBrandVue, IconCode, IconDatabase, IconPlugConnected, IconSparkles, type Icon } from "@tabler/icons-react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { toolbox } from "@/lib/toolbox";
import styles from "./ToolboxCarousel.module.css";
import { IconApi, IconChartBar, IconCloudComputing, IconCreditCardPay, IconLayoutDashboard, IconTargetArrow, IconUsersGroup } from "@tabler/icons-react";

const icons: Record<string, Icon> = {
  "Next.js": IconBrandNextjs, React: IconBrandReact, "Nuxt.js": IconBrandNuxt, "Vue 3": IconBrandVue,
  Laravel: IconBrandLaravel, TypeScript: IconBrandTypescript, JavaScript: IconBrandJavascript,
  HTML5: IconBrandHtml5, CSS3: IconBrandCss3, "Tailwind CSS": IconBrandTailwind, PHP: IconBrandPhp,
  "Node.js": IconBrandNodejs, Expo: IconBrandReactNative, MySQL: IconBrandMysql, PostgreSQL: IconDatabase,
  MongoDB: IconBrandMongodb, Supabase: IconBrandSupabase, Stripe: IconBrandStripe,
  "Facebook Graph API": IconBrandFacebook, "Meta Conversions API": IconBrandFacebook, "Instagram API": IconBrandInstagram,
  "Google Ads API": IconBrandGoogle, "Google Search Console": IconBrandGoogle, "Google Reviews": IconBrandGoogle,
  "Microsoft Azure AD": IconBrandAzure, Git: IconBrandGit, GitHub: IconBrandGithub, Figma: IconBrandFigma,
  "VS Code": IconBrandVscode, "Claude Code": IconSparkles, Codex: IconBrandOpenai, Cursor: IconCode,
  "Agile Scrum": IconUsersGroup, CMS: IconLayoutDashboard, "Lead capture": IconTargetArrow,
  SaaS: IconCloudComputing, "Payment integration": IconCreditCardPay, "REST API": IconApi, SerpAPI: IconChartBar,
};
export function ToolIcon({ name }: { name: string }) { const Icon = icons[name] ?? IconPlugConnected; return <Icon aria-hidden="true" />; }
export default function ToolboxCarousel({ paused }: { paused: boolean }) {
  const split = Math.ceil(toolbox.length / 2);
  const items = toolbox.map(name => ({ name, icon: <ToolIcon name={name} /> }));
  return <div className={styles.rows}><InfiniteMovingCards items={items} paused={paused} /><InfiniteMovingCards items={[...items.slice(split), ...items.slice(0, split)]} direction="right" paused={paused} /></div>;
}
