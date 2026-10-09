"use client";

import Link from "next/link";
import { useId, useState, useSyncExternalStore } from "react";
import {
  IconArrowRight, IconArrowUpRight, IconBriefcase, IconCompass, IconHeartHandshake, IconPlus,
} from "@tabler/icons-react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Modal, ModalBody, useModal } from "@/components/ui/animated-modal";
import { Tabs } from "@/components/ui/tabs";
import PortfolioActions from "@/components/PortfolioActions";
import { useMotionPreference } from "@/hooks/use-motion-preference";
import styles from "./Practice.module.css";

const values = [
  { title: "Be honest", statement: "Clarity comes first.", description: "I give clear answers, set realistic expectations and speak up when something needs to change." },
  { title: "Understand people", statement: "Listen before building.", description: "I take time to understand your business and the people using the software before choosing a solution." },
  { title: "Build with purpose", statement: "Every feature has a job.", description: "I focus on features that solve a real problem, make work easier or improve the customer experience." },
  { title: "Stay dependable", statement: "Follow through.", description: "I communicate progress, follow through on decisions and work through the difficult parts together." },
  { title: "Leave it better", statement: "Think beyond the launch.", description: "I make thoughtful improvements that help your team keep using and developing the software over time." },
];

const principleLayoutQuery = "(min-width: 640px) and (max-width: 1023px), (min-width: 1440px) and (min-height: 900px)";
function subscribeToLayout(onChange: () => void) {
  const query = window.matchMedia(principleLayoutQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function Principles() {
  const [selected, setSelected] = useState(0);
  const id = useId();
  const vertical = useSyncExternalStore(subscribeToLayout, () => window.matchMedia(principleLayoutQuery).matches, () => false);
  const tabs = values.map((value, index) => ({
    value: `principle-${index + 1}`,
    title: <span className={styles.principleChoice}><span className={styles.valueNumber}>0{index + 1}</span><span>{value.title}</span><IconArrowRight size={15} aria-hidden="true" /></span>,
    content: <section className={styles.principleDetail}><span className={styles.principleNumber} aria-hidden="true">0{index + 1}</span><p className={styles.label}>My principles / 0{index + 1}</p><h3>{value.statement}</h3><p className={styles.principleDescription}>{value.description}</p></section>,
  }));
  return <><div className={styles.mobilePrinciples} data-mobile-principles>
    {values.map((value, index) => <section key={value.title} className={styles.principleItem} data-expanded={selected === index}>
      <h3><button type="button" className={styles.principleTrigger} id={`${id}-trigger-${index}`} aria-expanded={selected === index} aria-controls={`${id}-answer-${index}`} onClick={() => setSelected(current => current === index ? -1 : index)}>
        <span className={styles.principleStep} aria-hidden="true">0{index + 1}</span>
        <span>{value.title}</span><IconPlus size={17} aria-hidden="true" />
      </button></h3>
      <div className={styles.principleAnswer} id={`${id}-answer-${index}`} role="region" aria-labelledby={`${id}-trigger-${index}`} aria-hidden={selected !== index} inert={selected !== index}>
        <div><div className={styles.principleAnswerCopy}><p className={styles.principleStatement}>{value.statement}</p><p>{value.description}</p></div></div>
      </div>
    </section>)}
  </div><div className={styles.principles} data-principle-tabs data-vertical={vertical}>
    <Tabs tabs={tabs} ariaLabel="How I work" activationMode="hover" orientation={vertical ? "vertical" : "horizontal"}
      containerClassName={styles.principleTabs} tabClassName={styles.principleTab} activeTabClassName={styles.activePrinciple} contentClassName={styles.principleContent} />
  </div><noscript><style>{'[data-principle-tabs], [data-mobile-principles] { display: none !important; } [data-practice] { height: auto !important; } [data-practice] > div { flex: none !important; grid-template-rows: auto auto !important; }'}</style><div className={styles.staticPrinciples}>{values.map(value => <section key={value.title}><h3>{value.title}</h3><p>{value.description}</p></section>)}</div></noscript></>;
}

// Roles come from the saved profile; dates include the user's later corrections.
const experience = [
  { company: "Izee, Inc.", role: "Full Stack Developer", period: "June 2026 to October 2026", compactPeriod: "Jun / Oct 2026", location: "Remote", summary: "Custom CMS, image optimization, CRM integrations and AI automation.", description: "Built custom CMS and admin tools so clients could update content independently. Optimized media delivery through CDN caching and connected CRM lead capture, payments, conversion tracking, instant estimates and AI bookkeeping workflows." },
  { company: "Obiyen / awork.dk", role: "Software Developer Intern", period: "January to June 2026", compactPeriod: "Jan / Jun 2026", location: "Remote, Denmark", summary: "SaaS workflows, account integrations and accessibility.", description: "Contributed to an enterprise SaaS platform through quotation, timesheet approval, helpdesk and password management workflows. Work also included account integrations, accessibility improvements and English/Danish localization." },
];

function PracticeContent() {
  const reduced = useMotionPreference();
  const { setOpen } = useModal();
  const glow = <GlowingEffect disabled={reduced} spread={35} proximity={0} inactiveZone={.2} borderWidth={1} />;

  return <>
    <main className={styles.page} data-practice>
      <header className={styles.heading}>
        <div className={styles.headingCopy}>
          <p className={styles.eyebrow}>Purpose, principles & experience</p>
          <h1>Behind the work.</h1>
          <p className={styles.intro}>Clear communication. Thoughtful development. Software built with purpose.</p>
        </div>
        <div className={styles.headerActions}><PortfolioActions paused={reduced} /></div>
      </header>

      <BentoGrid className={styles.grid}>
        <BentoGridItem reveal className={`${styles.card} ${styles.purpose}`} header={
          <section className={styles.cardBody} data-practice-card="purpose">
            {glow}
            <h2 className={styles.cardHeading}><span className={styles.icon}><IconCompass size={21} stroke={1.5} aria-hidden="true" /></span>My direction<span className={styles.index} aria-hidden="true">01</span></h2>
            <p className={styles.directionStatement}>Built with purpose.<br /><span>Made for people.</span></p>
            <div className={styles.directionGrid}>
              <section><h3 className={styles.label}>Mission</h3><p>I build useful software around your business and the people who use it.</p></section>
              <section><h3 className={styles.label}>Vision</h3><p>I aim to become a development partner your business can grow with.</p></section>
            </div>
          </section>
        } />

        <BentoGridItem reveal className={`${styles.card} ${styles.values}`} header={
          <section className={styles.cardBody} data-practice-card="values">
            {glow}
            <h2 className={styles.cardHeading}><span className={styles.icon}><IconHeartHandshake size={21} stroke={1.5} aria-hidden="true" /></span>How I work<span className={styles.index} aria-hidden="true">02</span></h2>
            <Principles />
          </section>
        } />

        <BentoGridItem reveal className={`${styles.card} ${styles.experience}`} header={
          <section className={styles.cardBody} data-practice-card="experience">
            {glow}
            <h2 className={styles.cardHeading}><button type="button" onClick={() => setOpen(true)} aria-haspopup="dialog" aria-label="View experience"><span className={styles.icon}><IconBriefcase size={21} stroke={1.5} aria-hidden="true" /></span>Experience<span className={styles.expand} aria-hidden="true"><IconPlus size={16} /></span></button></h2>
            <ol className={styles.experienceList}>{experience.map(job => <li key={job.company}><div className={styles.jobHeading}><h3>{job.company}</h3><span>{job.compactPeriod}</span></div><p className={styles.role}>{job.role}</p><p className={styles.jobDescription}>{job.description}</p></li>)}</ol>
          </section>
        } />

      </BentoGrid>
    </main>

    <ModalBody ariaLabel="Experience" className={styles.detailModal} motionDisabled={reduced} header={<span className={styles.eyebrow}>Behind the work / Experience</span>}>
      <div className={styles.detailContent}>
        <h2>Experience.</h2>
        <div className={styles.fullExperience}>
          {experience.map(job => <section key={job.company}><p className={styles.label}>{job.period} / {job.location}</p><h3>{job.role}</h3><p className={styles.company}>{job.company}</p><p>{job.description}</p></section>)}
        </div>
        <div className={styles.detailActions}><Link href="/works?view=grid" onClick={() => setOpen(false)}>See the work<IconArrowUpRight size={16} aria-hidden="true" /></Link><Link href="/contact" onClick={() => setOpen(false)}>Book a discovery call<IconArrowUpRight size={16} aria-hidden="true" /></Link></div>
      </div>
    </ModalBody>
  </>;
}

export default function PracticeClient() { return <Modal><PracticeContent /></Modal>; }
