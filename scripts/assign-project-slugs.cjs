// Assign public identifiers once. Existing UUIDs remain unchanged on future runs.
const fs = require("node:fs");
const { randomUUID } = require("node:crypto");
const file = "lib/profile-projects.ts";
const source = fs.readFileSync(file, "utf8");
const start = source.indexOf("= [") + 2;
const end = source.lastIndexOf("] as const;") + 1;
const projects = JSON.parse(source.slice(start, end));
for (const project of projects) project.slug ??= randomUUID();
fs.writeFileSync(file, source.slice(0, start) + JSON.stringify(projects, null, 2) + source.slice(end));
console.log("Permanent UUID slugs saved for " + projects.length + " projects.");
