"use client";

import { useState } from "react";
import Link from "next/link";
import {
  IconArrowUpRight, IconCalendarEvent, IconCheck, IconDatabase, IconDeviceMobile,
  IconPencil, IconPlus, IconPlugConnected, IconSettings, IconWorld,
} from "@tabler/icons-react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { Modal, ModalBody, useModal } from "@/components/ui/animated-modal";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import PortfolioActions from "@/components/PortfolioActions";
import { useMotionPreference } from "@/hooks/use-motion-preference";
import { serviceCategories, type ServiceId } from "@/lib/service-categories";
import { serviceOfferings } from "@/lib/service-offerings";
import styles from "./Services.module.css";

const serviceIcons = {
  "business-software": IconDatabase, websites: IconWorld, cms: IconPencil,
  booking: IconCalendarEvent, "mobile-apps": IconDeviceMobile,
  automation: IconPlugConnected, support: IconSettings,
};

function ServicesContent() {
  const reduced = useMotionPreference();
  const [selected, setSelected] = useState<ServiceId>("cms");
  const { setOpen } = useModal();
  const offering = serviceOfferings.find(item => item.id === selected)!;
  const selectedCategory = serviceCategories.find(item => item.id === selected)!;
  const showScope = (id: ServiceId) => { setSelected(id); setOpen(true); };

  return <><main className={styles.page} data-services>
    <header className={styles.heading}>
      <div className={styles.headingCopy}>
        <p className={styles.eyebrow}>From the first idea to everyday use / 07 services</p>
        <h1>How we can help.</h1>
        <p className={styles.intro}>Choose what your business needs. We’ll help you build it.</p>
      </div>
      <div className={styles.headerActions}><PortfolioActions paused={reduced} /></div>
    </header>

    <BentoGrid className={styles.serviceGrid}>
      {serviceCategories.map((service, index) => {
        const scope = serviceOfferings.find(item => item.id === service.id)!;
        const Icon = serviceIcons[service.id];
        return <BentoGridItem reveal key={service.id} className={`${styles.serviceCard} ${styles[service.id]}`}
          header={<article id={service.id} className={styles.cardBody} data-service-card={service.id}>
            <GlowingEffect disabled={reduced} spread={35} proximity={0} inactiveZone={.2} borderWidth={1} />
            <h2 className={styles.cardHeading}><button type="button" onClick={() => showScope(service.id)} aria-haspopup="dialog" aria-label={`View scope for ${service.name}`}>
              <span className={styles.serviceIcon} aria-hidden="true"><Icon size={23} stroke={1.5} /></span>
              <span className={styles.title}>{service.name}</span>
              <span className={styles.expand} aria-hidden="true"><span>0{index + 1}</span><IconPlus size={15} /></span>
            </button></h2>
            <p className={styles.summary}>{scope.summary}</p>
            <div className={styles.included}>
              {service.id === "business-software" && <p className={styles.includedLabel}>What we can build</p>}
              {service.id === "automation" && <p className={styles.includedLabel}>Custom automation</p>}
              <ul>{scope.inclusions.map((item, itemIndex) => <li key={item}><IconCheck size={13} stroke={1.8} aria-hidden="true" /><span className={styles.fullInclusion}>{item}</span><span className={styles.compactInclusion}>{scope.compactInclusions[itemIndex]}</span></li>)}</ul>
            </div>
            <noscript><details className={styles.noScriptScope}><summary>Full service scope</summary>{scope.details.map(detail => <section key={detail.title}><h3>{detail.title}</h3><p>{detail.description}</p></section>)}</details></noscript>
            <HoverBorderGradient as={Link} href={`/contact?service=${service.id}`} paused={reduced}
              aria-label={`Book a discovery call for ${service.name}`} containerClassName={styles.book} className={styles.bookBody}>
              Book a discovery call<IconArrowUpRight size={16} aria-hidden="true" />
            </HoverBorderGradient>
          </article>} />;
      })}
    </BentoGrid>
  </main>
  <noscript><style>{'[data-services] { height: auto !important; } [data-services] > div { grid-template-rows: auto auto auto !important; }'}</style></noscript>

  <ModalBody ariaLabel={`${selectedCategory.name} scope`} className={styles.scopeModal} motionDisabled={reduced}
    header={<span className={styles.modalEyebrow}>Service scope / {selectedCategory.short}</span>}>
    <div className={styles.scopeContent}>
      <h2>{selectedCategory.name}</h2><p className={styles.scopeIntro}>{offering.summary}</p>
      <div className={styles.detailGrid}>{offering.details.map(detail => <section key={detail.title}><h3>{detail.title}</h3><p>{detail.description}</p></section>)}</div>
      <div className={styles.scopeExamples}><h3>Example uses</h3><ul>{offering.examples.map(example => <li key={example}>{example}</li>)}</ul></div>
      <div className={styles.scopeActions}><Link href={`/works?view=grid&service=${selected}`} onClick={() => setOpen(false)}>Related projects<IconArrowUpRight size={16} aria-hidden="true" /></Link><HoverBorderGradient as={Link} href={`/contact?service=${selected}`} onClick={() => setOpen(false)} paused={reduced} containerClassName={styles.book} className={styles.bookBody}>Book a discovery call<IconArrowUpRight size={16} aria-hidden="true" /></HoverBorderGradient></div>
    </div>
  </ModalBody></>;
}

export default function Services() { return <Modal><ServicesContent /></Modal>; }
