"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { IconArrowUpRight, IconBrandGithub, IconBrandLinkedin, IconCheck, IconCopy, IconLoader2, IconMessage, IconSend } from "@tabler/icons-react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { SelectMenu } from "@/components/ui/select-menu";
import PortfolioActions from "@/components/PortfolioActions";
import { useMotionPreference } from "@/hooks/use-motion-preference";
import styles from "./Contact.module.css";

const email = "cyrilnarvasa589@gmail.com";
const projectTypes = ["Custom Business Software", "Business Website", "Mobile App", "Integrations & Automation", "Ongoing Support & Maintenance", "Content Management Systems", "Booking Systems", "Other / Not sure yet"];
const projectTypeForService = (service: string) => service === "Business Websites" ? "Business Website" : service === "Mobile Apps" ? "Mobile App" : service;
const budgets = {
  USD: ["< $1k", "$1k – $5k", "$5k – $10k", "$10k+", "Not sure yet"],
  PHP: ["₱5k – ₱10k", "₱10k – ₱25k", "₱25k – ₱50k", "₱50k+", "Not sure yet"],
};
type Fields = { firstName: string; lastName: string; email: string; projectType: string; budget: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

export default function ContactClient({ initialService = "" }: { initialService?: string }) {
  const reduced = useMotionPreference();
  const emptyForm = (): Fields => ({ firstName: "", lastName: "", email: "", projectType: projectTypeForService(initialService), budget: "", message: "" });
  const [form, setForm] = useState<Fields>(emptyForm);
  const [currency, setCurrency] = useState<"USD" | "PHP">("PHP");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const submitting = useRef(false);
  const sending = status === "sending";
  useEffect(() => () => { if (copyTimer.current) clearTimeout(copyTimer.current); }, []);
  useEffect(() => { if (status === "sent") successRef.current?.focus({ preventScroll: true }); }, [status]);

  const set = (key: keyof Fields, value: string) => {
    setForm(current => ({ ...current, [key]: value }));
    setErrors(current => ({ ...current, [key]: undefined }));
  };
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true); setCopyError(false);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch { setCopyError(true); }
  };
  const startAnotherEnquiry = () => {
    setStatus("idle");
    setForm(emptyForm());
    setErrors({});
    requestAnimationFrame(() => formRef.current?.querySelector<HTMLInputElement>("input")?.focus({ preventScroll: true }));
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting.current) return;
    const nextErrors: Errors = {};
    if (!form.firstName.trim()) nextErrors.firstName = "Enter your first name.";
    if (!form.lastName.trim()) nextErrors.lastName = "Enter your last name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) nextErrors.email = "Enter a valid email address.";
    if (!projectTypes.includes(form.projectType)) nextErrors.projectType = "Choose a service.";
    if (!form.message.trim()) nextErrors.message = "Tell me a little about your project.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
      return;
    }
    submitting.current = true;
    setStatus("sending");
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch("https://formspree.io/f/mlgbjney", {
        method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, signal: controller.signal,
        body: JSON.stringify({ name: `${form.firstName.trim()} ${form.lastName.trim()}`, email: form.email.trim(), projectType: form.projectType, budget: form.budget ? `${form.budget} (${currency})` : "", message: form.message.trim() }),
      });
      setStatus(response.ok ? "sent" : "error");
    } catch { setStatus("error"); }
    finally { clearTimeout(timeout); submitting.current = false; }
  };
  const glow = <GlowingEffect disabled={reduced} spread={35} proximity={0} inactiveZone={.2} borderWidth={1} />;
  const errorFor = (key: keyof Fields) => errors[key] ? <p id={`contact-${key}-error`} className={styles.fieldError}>{errors[key]}</p> : null;

  return <main className={styles.page} data-contact>
    <header className={styles.heading}><div className={styles.headingCopy}><p className={styles.eyebrow}>Your next idea / Let’s talk</p><h1>Let’s build something.</h1><p className={styles.intro}>Tell me what you need, where things stand, and what you’d like to build.</p></div><div className={styles.headerActions}><PortfolioActions paused={reduced} contactHref="#project-form" /></div></header>
    <BentoGrid className={styles.grid}>
      <BentoGridItem reveal className={`${styles.card} ${styles.conversation}`} header={<section className={styles.cardBody} data-contact-card="conversation">
        {glow}<h2 className={styles.cardHeading}><span className={styles.icon}><IconMessage size={21} stroke={1.5} aria-hidden="true" /></span>Start a conversation<span className={styles.ordinal}>01</span></h2>
        <div className={styles.conversationCopy}><p className={styles.statement}>A new idea.<br /><span>A clear next step.</span></p><p>You don’t need a finished brief. Share what you have, and I’ll help work out the next step.</p></div>
        <div className={styles.emailBlock}><p className={styles.label}>Prefer email?</p><a href={`mailto:${email}`} className={styles.emailLink}>{email}<IconArrowUpRight size={16} aria-hidden="true" /></a><div className={styles.directActions}><HoverBorderGradient as="button" type="button" onClick={copyEmail} paused={reduced} containerClassName={styles.smallAction} className={styles.smallActionBody} aria-label={copied ? "Email address copied" : "Copy email address"}>{copied ? <IconCheck size={16} aria-hidden="true" /> : <IconCopy size={16} aria-hidden="true" />}{copied ? "Copied" : "Copy email"}</HoverBorderGradient><a href="https://github.com/Cyannimazing" target="_blank" rel="noopener noreferrer" className={styles.social} aria-label="GitHub, opens in a new tab" data-studio-action><IconBrandGithub size={19} aria-hidden="true" /><span className="sr-only">GitHub, opens in a new tab</span></a><a href="https://www.linkedin.com/in/cyril-jian-narvasa" target="_blank" rel="noopener noreferrer" className={styles.social} aria-label="LinkedIn, opens in a new tab" data-studio-action><IconBrandLinkedin size={19} aria-hidden="true" /><span className="sr-only">LinkedIn, opens in a new tab</span></a></div><p className={styles.copyStatus} role="status">{copyError ? "Select the email address above to copy it." : copied ? "Email address copied." : ""}</p></div>
      </section>} />
      <BentoGridItem reveal className={`${styles.card} ${styles.formCard}`} header={<section className={styles.cardBody} data-contact-card="form">
        {glow}{status === "sent" ? <div id="project-form" tabIndex={-1} className={styles.success}><span className={styles.successIcon}><IconCheck size={30} aria-hidden="true" /></span><p className={styles.label}>Enquiry received</p><h2 ref={successRef} tabIndex={-1}>Message sent.</h2><p>Thanks for sharing your project. I’ll get back to you by email.</p><HoverBorderGradient as="button" type="button" paused={reduced} onClick={startAnotherEnquiry} containerClassName={styles.submit} className={styles.submitBody}>Send another enquiry<IconArrowUpRight size={16} aria-hidden="true" /></HoverBorderGradient></div> : <form id="project-form" tabIndex={-1} ref={formRef} noValidate onSubmit={handleSubmit} className={styles.form} aria-label="Project enquiry" aria-busy={sending}>
          <div className={styles.formHeading}><div className={styles.formTitleRow}><span className={styles.label}>Project enquiry</span><span className={styles.ordinal} aria-hidden="true">02</span></div><h2>What do you have in mind?</h2><p>A few details will help me understand where to start.</p></div>
          <noscript><p className={styles.formNote}>Please <a href={`mailto:${email}`}>email me directly</a> to discuss your project.</p><style>{'#project-form fieldset, #project-form button { display: none !important; }'}</style></noscript>
          <fieldset disabled={sending} className={styles.fields}><legend className="sr-only">Your details and project</legend>
            <div className={styles.field}><label htmlFor="contact-firstName">First name</label><input id="contact-firstName" name="firstName" autoComplete="given-name" required value={form.firstName} onChange={event => set("firstName", event.target.value)} placeholder="Jane" aria-invalid={!!errors.firstName} aria-describedby={errors.firstName ? "contact-firstName-error" : undefined} />{errorFor("firstName")}</div>
            <div className={styles.field}><label htmlFor="contact-lastName">Last name</label><input id="contact-lastName" name="lastName" autoComplete="family-name" required value={form.lastName} onChange={event => set("lastName", event.target.value)} placeholder="Doe" aria-invalid={!!errors.lastName} aria-describedby={errors.lastName ? "contact-lastName-error" : undefined} />{errorFor("lastName")}</div>
            <div className={styles.field}><label htmlFor="contact-email">Email</label><input id="contact-email" name="email" type="email" autoComplete="email" required value={form.email} onChange={event => set("email", event.target.value)} placeholder="jane@company.com" aria-invalid={!!errors.email} aria-describedby={errors.email ? "contact-email-error" : undefined} />{errorFor("email")}</div>
            <div className={styles.field}><label htmlFor="contact-service">Project type</label><SelectMenu id="contact-service" name="projectType" value={form.projectType} onChange={value => set("projectType", value)} options={projectTypes} placeholder="Select a project type" invalid={!!errors.projectType} describedBy={errors.projectType ? "contact-projectType-error" : undefined} disabled={sending} className={styles.selectTrigger} />{errorFor("projectType")}</div>
            <div className={`${styles.field} ${styles.budgetField}`}><label htmlFor="contact-budget">Budget range <span>(optional)</span></label><div className={styles.budgetControls}><div className={styles.selectWrap}><SelectMenu id="contact-budget" name="budget" value={form.budget} onChange={value => set("budget", value)} options={budgets[currency]} placeholder="Select a range" disabled={sending} className={styles.selectTrigger} /></div><div className={styles.currency} role="group" aria-label="Budget currency">{(["USD", "PHP"] as const).map(item => <button key={item} type="button" aria-pressed={currency === item} onClick={() => { setCurrency(item); set("budget", ""); }} data-studio-action>{item}</button>)}</div></div></div>
            <div className={`${styles.field} ${styles.messageField}`}><label htmlFor="contact-message">About your project</label><textarea id="contact-message" name="message" required value={form.message} onChange={event => set("message", event.target.value)} placeholder="What would you like to build or improve? Add any goals, references or timing you have in mind." aria-invalid={!!errors.message} aria-describedby={errors.message ? "contact-message-error" : undefined} />{errorFor("message")}</div>
          </fieldset>
          {Object.values(errors).some(Boolean) && <p role="alert" className={styles.formError}>Please check the highlighted fields.</p>}
          {status === "error" && <p role="alert" className={styles.formError}>Your message couldn’t be sent. Please try again, or <a href={`mailto:${email}`}>email me directly</a>.</p>}
          <HoverBorderGradient as="button" type="submit" disabled={sending} paused={reduced || sending} containerClassName={styles.submit} className={styles.submitBody}>{sending ? <>Sending your enquiry<IconLoader2 size={17} className={styles.spinner} aria-hidden="true" /></> : <>Send enquiry<IconArrowUpRight size={17} aria-hidden="true" /></>}</HoverBorderGradient>
          <p className={styles.formNote}>I’ll use these details to reply about your enquiry.</p>
        </form>}
      </section>} />
      <BentoGridItem reveal className={`${styles.card} ${styles.nextSteps}`} header={<section className={styles.cardBody} data-contact-card="next-steps">
        {glow}<h2 className={styles.cardHeading}><span className={styles.icon}><IconSend size={21} stroke={1.5} aria-hidden="true" /></span>What happens next<span className={styles.ordinal}>03</span></h2><ol className={styles.steps}><li><span>01</span><div><h3>Share what you need</h3><p>Your goals, the current situation, and any references.</p></div></li><li><span>02</span><div><h3>Talk through the scope</h3><p>I’ll reply by email to discuss the work and arrange a call if useful.</p></div></li><li><span>03</span><div><h3>Agree on the next step</h3><p>A clear scope, priorities and a plan before development starts.</p></div></li></ol>
      </section>} />
    </BentoGrid>
  </main>;
}
