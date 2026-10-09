// Reconcile confirmed contribution answers and shared services into the profile.
const fs = require("node:fs");
const data = fs.readFileSync("lib/profile-projects.ts", "utf8");
const projects = JSON.parse(data.slice(data.indexOf("= [") + 2, data.lastIndexOf("] as const;") + 1));
const categories = { "business-software": "Custom Business Software", websites: "Business Websites", cms: "Content Management Systems", "mobile-apps": "Mobile Apps", automation: "Integrations & Automation", support: "Ongoing Support & Maintenance" };
const file = "public/cyril-profile.md";
const original = fs.readFileSync(file, "utf8");
const start = original.indexOf("All 20 projects are included below") >= 0 ? original.indexOf("All 20 projects are included below") : original.search(/^The \d+ included projects are listed below\./m);
const end = original.indexOf("## Original CV reference text");
if (start < 0 || end < 0) throw new Error("Expected profile boundaries not found");
const sections = projects.map((project, index) => {
  const old = original.match(new RegExp("### \\d+\\. " + project.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\r?\\n([\\s\\S]*?)(?=### |## Original)"))?.[1] ?? "";
  const url = old.match(/^- URL:.*$/m)?.[0] ?? "- URL: Not provided in the saved profile.";
  const sourceCheck = old.match(/^- Source check:.*$/m)?.[0];
  return ["### " + (index + 1) + ". " + project.name, "", project.description, "", ...(project.contribution ? ["- Confirmed contribution (October 8, 2026): " + project.contribution.role + ". " + project.contribution.scope] : []), "- Services: " + project.services.map(id => categories[id]).join("; "), url, "- Portfolio URL: /works/" + project.slug, "- Skills: " + project.technologies.join(", "), ...(sourceCheck ? [sourceCheck] : []), ""].join("\n");
});
let updated = original.slice(0, start) + "The " + projects.length + " included projects are listed below. Key Masker was removed at the user's request on October 8, 2026. Confirmed contribution answers refine the original saved descriptions; local source is used to verify stacks and integrations.\n\n" + sections.join("\n") + "\n" + original.slice(end);
updated = updated.replace("all 20 saved projects", "the current 19 included projects");
fs.writeFileSync(file, updated);
console.log(projects.length + " profile projects reconciled");
