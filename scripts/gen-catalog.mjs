// Erzeugt lib/catalog.mjs aus motifs.json (läuft bei jedem Netlify-Build).
// So bleibt motifs.json die einzige Pflege-Datei.
import fs from "node:fs";
const catalog = JSON.parse(fs.readFileSync("motifs.json", "utf8"));
fs.writeFileSync(
  "lib/catalog.mjs",
  "// AUTOMATISCH GENERIERT aus motifs.json – nicht von Hand bearbeiten!\n" +
  "export default " + JSON.stringify(catalog, null, 2) + ";\n"
);
console.log("lib/catalog.mjs erzeugt:", catalog.motive.length, "Motive");
