---
sidebar_position: 2
---

## Documentáció
Ezen dokumentáció a Docusaurus React alapú markdown (mdx) keretrendszerrel készült.

## Projekt generálása
Jelen docusaurus projektet az alábbi paranccsal generáltuk:

`npx create-docusaurus@latest my-website classic`

### Projektstruktúra
Jelen oldal forráskódja az alábbi mapparendszert tartalmazza:
- docs: tartalmazza a dokumentációs tartalomért felelős markdown fileokat
- src: tartalmazza a website megjelenítéséért felelős React forráskódot (automatikusan generált, ízlés szerint módosítható)
- static: tartalmazza a projektben felgasznált statikus elemeket (pl képek)

Gyökérben lévő egyéb fileok:
- .gitignore: definiálja a verziókövetésben részt nem vevó fileokat
- package.json: az alkalmazás node package-ének metaadatai
- package-lock.json: az alkalmazás függőségeinek pontos verzióit határozza meg
- docusaurus.config.js: tartalmazza a projekt configurációját
- README.md: tájékoztatás a projekttel kapcsolatban (jelenleg telepítés, használat stb.)
- sidebars.js: a weboldal oldalsó hasábjainak konfigurálása

### Entry point
Az alkalmazás indításáért a keretrendzer felel, csak a home page UI kompononse látható részünkről:
```Javascript
export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
```
