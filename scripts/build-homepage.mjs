import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = file => JSON.parse(readFileSync(resolve(root, 'content', file), 'utf8'));
const profile = read('profile.json');
const publications = read('publications.json');
const collaborations = read('collaborations.json');
const projects = read('projects.json');
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const arrow = '<span aria-hidden="true">↗</span>';
const link = (href, label, className = '') => `<a href="${esc(href)}" class="${className}"${href.startsWith('https:') ? ' target="_blank" rel="noopener noreferrer"' : ''}>${label}</a>`;
const icon = name => {
  const paths = { mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>', scholar: '<path d="m2 9 10-6 10 6-10 6L2 9Z"/><path d="M6 12v5c4 3 8 3 12 0v-5M22 9v8"/>', github: '<path d="M9 19c-4 1-4-2-6-2m12 5v-4a3.5 3.5 0 0 0-1-3c3 0 6-1 6-6a4.7 4.7 0 0 0-1.3-3.3A4.3 4.3 0 0 0 18.6 2S17.3 1.6 15 3a12 12 0 0 0-6 0C6.7 1.6 5.4 2 5.4 2a4.3 4.3 0 0 0-.1 3.7A4.7 4.7 0 0 0 4 9c0 5 3 6 6 6a3.5 3.5 0 0 0-1 3v4"/>', location: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>', orcid: '<circle cx="12" cy="12" r="9"/><path d="M8 10v7M11 10v7h2a3.5 3.5 0 0 0 0-7h-2M8 7v.2"/>' };
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]}</svg>`;
};

function bibtex(paper) {
  if (!paper.citation) return null;
  const { type, key, ...fields } = paper.citation;
  const entries = { title: paper.title, author: paper.authors.join(' and '), year: paper.year, ...fields };
  return `@${type}{${key},\n${Object.entries(entries).map(([k, v]) => `  ${k} = {${v}}`).join(',\n')}\n}`;
}
function paperMarkup(paper, collaboration = false) {
  const citation = bibtex(paper);
  const search = [paper.title, paper.short, paper.venue, paper.year, ...paper.authors, paper.description].join(' ').toLowerCase();
  const titleLink = Object.values(paper.links)[0];
  return `<article class="publication" id="${esc(paper.id)}" data-category="${esc(paper.category)}" data-search="${esc(search)}">
    <div class="paper-meta"><span class="venue ${paper.type === 'Journal' ? 'journal' : paper.type === 'Under review' || paper.type === 'Preprint' ? 'preprint' : ''}" title="${esc(paper.venueFull)}">${esc(paper.venue)}${paper.year ? ` <span class="venue-year">${paper.year}</span>` : ''}</span><span class="paper-type">${esc(collaboration ? paper.category === 'wireless' ? 'Wireless' : 'Computer vision' : paper.short)}</span></div>
    <h4>${link(titleLink, esc(paper.title))}</h4>
    ${paper.authors.length ? `<p class="authors">${paper.authors.map(author => author === profile.name ? `<strong>${esc(author)}</strong>` : esc(author)).join(', ')}</p>` : ''}
    <p class="paper-description">${esc(paper.description)}</p>
    <div class="paper-links">${Object.entries(paper.links).map(([label, href]) => link(href, esc(label) + arrow)).join('')}${citation ? `<details class="citation"><summary>BibTeX</summary><div class="citation-content"><pre tabindex="0">${esc(citation)}</pre><button type="button" class="copy-citation" aria-label="Copy BibTeX for ${esc(paper.short)}">Copy citation</button><span class="copy-status" role="status"></span></div></details>` : ''}</div>
  </article>`;
}
const categories = [
  { id: 'kws', number: '01', title: 'Keyword Spotting & Wake Words', short: 'Keyword spotting', description: 'Personalized voice triggers through text and speech enrollment.' },
  { id: 'speaker', number: '02', title: 'Speaker Recognition & Modeling', short: 'Speaker modeling', description: 'Recognizing speakers across short utterances, aging, and intrinsic variation.' },
  { id: 'bwe', number: '03', title: 'Speech Bandwidth Extension', short: 'BWE', description: 'Recovering wideband speech from bandwidth-limited observations.' },
  { id: 'speechllm', number: '04', title: 'Speech Language Models', short: 'Speech LLMs', description: 'Bringing phonetic structure and contextual knowledge to speech language models.' }
];
const roomDiagram = `<svg viewBox="0 0 400 190" role="img" aria-label="Illustration of a room, a sound source, and reflection paths"><defs><pattern id="room-grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="#dcded5" stroke-width=".6"/></pattern></defs><rect width="400" height="190" fill="#f0f1eb"/><rect width="400" height="190" fill="url(#room-grid)"/><path d="M68 36H332V150H68V36ZM232 36V93M232 119V150" fill="none" stroke="#697663" stroke-width="3"/><path d="m116 100 91-64 79 82M116 100l174 50-4-32M116 100l-48 29 218-11M116 100l170 18" fill="none" stroke="#a44d36" stroke-width="1.3" opacity=".7"/><path d="M126 85a19 19 0 0 1 0 30M132 78a28 28 0 0 1 0 44" fill="none" stroke="#a44d36" opacity=".4"/><circle cx="116" cy="100" r="5" fill="#a44d36"/><circle cx="286" cy="118" r="6" fill="#536e78"/><circle cx="286" cy="118" r="11" fill="none" stroke="#536e78" opacity=".4"/><text x="100" y="127" fill="#697663" font-size="10" font-family="sans-serif">SOURCE</text><text x="266" y="98" fill="#697663" font-size="10" font-family="sans-serif">RECEIVER</text></svg>`;
const deviceDiagram = `<svg viewBox="0 0 400 190" role="img" aria-label="Illustration of a device mesh and microphone array"><rect width="400" height="190" fill="#edf0f2"/><g fill="none" stroke="#81939c" stroke-width=".9"><path d="m200 27 55 26 20 53-30 47-62 12-52-31-6-60 35-37 40-10Z"/><path d="m200 27-6 49 61-23-34 53 54 0-54 0 24 47-62 12 11-49-63 18 63-18-69-42 69 2-34-39M194 76l27 30-27 10V76M183 165l-52-31 63-18 51 37-24-47"/><path d="M325 30q-60 62 0 130M345 10q-78 82 0 170M304 50q-43 43 0 90" stroke="#a44d36" opacity=".5"/></g><g fill="#a44d36" stroke="#edf0f2" stroke-width="3"><circle cx="160" cy="37" r="5"/><circle cx="255" cy="53" r="5"/><circle cx="245" cy="153" r="5"/><circle cx="131" cy="134" r="5"/></g><text x="22" y="174" fill="#697c86" font-size="10" font-family="sans-serif" letter-spacing="1">GEOMETRY → ACOUSTIC TRANSFER</text></svg>`;
const cvHref = profile.cv || `mailto:${profile.email}?subject=CV%20request`;
const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(profile.name)} | Speech &amp; Embodied Audio</title>
  <meta name="description" content="${esc(`${profile.name}, ${profile.role} at ${profile.institution}. Research in keyword spotting, speaker recognition, speech bandwidth extension, speech language models, and embodied audio.`)}">
  <meta name="theme-color" content="#f9f8f5"><meta property="og:type" content="profile"><meta property="og:title" content="Zhiqi Ai | Speech &amp; Embodied Audio"><meta property="og:description" content="Ph.D. student at Shanghai University. Speech and audio intelligence, acoustic simulation, and embodied audio."><meta property="og:url" content="https://aizhiqi-work.github.io/"><meta property="og:image" content="https://aizhiqi-work.github.io/${esc(profile.portrait)}">
  <link rel="canonical" href="https://aizhiqi-work.github.io/"><link rel="icon" type="image/svg+xml" href="assets/homepage/favicon.svg"><link rel="stylesheet" href="assets/homepage/style.css">
  <script defer src="assets/homepage/app.js"></script>
  <script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'Person', name: profile.name, jobTitle: profile.role, affiliation: { '@type': 'CollegeOrUniversity', name: profile.institution }, url: 'https://aizhiqi-work.github.io/', sameAs: [profile.scholar, profile.github, profile.orcid] }).replace(/</g, '\\u003c')}</script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header"><div class="header-inner"><a class="brand" href="#about"><span class="monogram">Ai<span>.</span></span><span class="brand-name">Zhiqi Ai</span></a><nav aria-label="Main navigation"><a href="#about">About</a><a href="#research">Research</a><a href="#embodied">Embodied audio</a><a href="#background">CV</a></nav></div></header>
  <div class="page-layout">
    <aside class="profile-sidebar" aria-label="Profile and page navigation">
      <img class="portrait" src="${esc(profile.portrait)}" width="827" height="1252" alt="Portrait of ${esc(profile.name)}" fetchpriority="high">
      <div class="sidebar-name">${esc(profile.name)}</div><p class="sidebar-role">${esc(profile.role)}<br>${esc(profile.institution)}</p>
      <p class="location">${icon('location')}${esc(profile.location)}</p>
      <div class="social-links">${link(profile.scholar, icon('scholar') + 'Google Scholar' + arrow)}${link(profile.github, icon('github') + 'GitHub' + arrow)}${link(profile.orcid, icon('orcid') + 'ORCID' + arrow)}${link(`mailto:${profile.email}`, icon('mail') + 'Email me' + arrow)}</div>
      <div class="sidebar-rule"></div><p class="nav-label">ON THIS PAGE</p><nav class="section-nav" aria-label="Section navigation"><a href="#about" class="active" aria-current="location">About me</a><a href="#research">Speech &amp; audio</a><a href="#embodied">Embodied audio</a><a href="#background">Background &amp; CV</a><a href="#collaborations">Collaborations</a></nav>
      <p class="sidebar-note">Speech intelligence.<br>Audio in the physical world.</p>
    </aside>
    <main id="main">
      <section id="about" class="about-section" aria-labelledby="about-heading"><p class="eyebrow">SPEECH · AUDIO · INTELLIGENCE</p><h1 id="about-heading">${esc(profile.name)}<span class="name-dot">.</span></h1><p class="hero-role">${esc(profile.role)} <span aria-hidden="true">/</span> ${esc(profile.institution)}</p><p class="intro">${esc(profile.intro)}</p><p class="research-intro">${esc(profile.research)}</p><div class="hero-actions">${link(profile.scholar, 'Publications ' + arrow, 'button primary')}${link('#background', 'Background &amp; CV <span aria-hidden="true">↓</span>', 'button secondary')}</div><div class="research-map"><a href="#research"><span class="map-dot speech"></span>Speech &amp; Audio Intelligence<span aria-hidden="true">↓</span></a><a href="#embodied"><span class="map-dot embodied"></span>Embodied Audio<span aria-hidden="true">↓</span></a></div></section>

      <section id="research" class="content-section" aria-labelledby="research-heading"><div class="section-heading"><div><p class="eyebrow">RESEARCH &amp; SELECTED PUBLICATIONS</p><h2 id="research-heading">Speech &amp; Audio Intelligence</h2></div>${link(profile.scholar, 'Full list on Scholar ' + arrow, 'text-link')}</div><p class="section-intro">Personalized speech interaction, robust speaker modeling, and speech generation and understanding.</p>
      <div class="research-tools" hidden><div class="filter-list" role="group" aria-label="Filter publications by research area"><button class="filter-button active" data-filter="all" aria-pressed="true">All areas</button>${categories.map(c => `<button class="filter-button" data-filter="${c.id}" aria-pressed="false">${c.short}</button>`).join('')}</div><label class="search-field"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg><input type="search" id="paper-search" placeholder="Search papers" aria-label="Search publications by title, author, or year"></label></div><p id="result-count" class="result-count" aria-live="polite" hidden></p>
      <div id="publication-groups">${categories.map(category => `<section class="paper-group" data-group="${category.id}" aria-labelledby="heading-${category.id}"><div class="group-heading"><span class="group-number">${category.number}</span><div><h3 id="heading-${category.id}">${category.title}</h3><p>${category.description}</p></div></div>${publications.filter(p => p.category === category.id).map(p => paperMarkup(p)).join('')}${category.id === 'kws' ? `<div class="related-resources"><span>Research resources</span>${link('https://github.com/aizhiqi-work/GigaPhrase-1000', 'LibriPhrase &amp; GigaPhrase ' + arrow)}${link('https://github.com/aizhiqi-work/OpenKWS', 'OpenKWS ' + arrow)}</div>` : ''}</section>`).join('')}</div><div class="empty-state" hidden><h3>No matching papers</h3><p>Try another title, author, or year.</p><button type="button" id="reset-search">Reset filters</button></div></section>

      <section id="embodied" class="content-section" aria-labelledby="embodied-heading"><div class="section-heading"><div><p class="eyebrow">RESEARCH &amp; OPEN-SOURCE PROJECTS</p><h2 id="embodied-heading">Embodied Audio</h2></div><span class="section-index" aria-hidden="true">02 /</span></div><p class="section-intro">Understanding how sound interacts with spaces, bodies, and devices through acoustic simulation.</p><div class="project-grid">${projects.map(project => `<article class="project-card" id="${esc(project.id)}"><div class="project-diagram">${project.diagram === 'room' ? roomDiagram : deviceDiagram}</div><div class="project-body"><p class="eyebrow">${esc(project.eyebrow)}</p><h3>${link(project.url, esc(project.name))}</h3><p>${esc(project.description)}</p><div class="project-tags">${project.tags.map(t => `<span>${esc(t)}</span>`).join('')}</div>${link(project.url, esc(project.linkLabel) + arrow, 'project-link')}</div></article>`).join('')}</div></section>

      <section id="background" class="content-section" aria-labelledby="background-heading"><div class="section-heading"><div><p class="eyebrow">ACADEMIC BACKGROUND</p><h2 id="background-heading">Background &amp; CV</h2></div></div><div class="education-list">${profile.education.map(e => `<div class="education-row"><span class="education-period">${esc(e.period)}</span><div><h3>${esc(e.degree)}</h3><p class="institution">${esc(e.institution)}</p><p>${esc(e.description)}</p></div></div>`).join('')}</div><div class="cv-panel"><div><h3>Curriculum vitae</h3><p>${profile.cv ? 'Download my curriculum vitae for education, research, and experience.' : 'For my detailed academic background and CV, please get in touch.'}</p></div>${link(cvHref, (profile.cv ? 'Download CV ' : 'Request CV ') + arrow, 'button secondary')}</div></section>

      <section id="collaborations" class="content-section collaborations" aria-labelledby="collaborations-heading"><div class="section-heading"><div><p class="eyebrow">BEYOND AUDIO</p><h2 id="collaborations-heading">Interdisciplinary Collaborations</h2></div></div><p class="section-intro">Collaborative research in wireless positioning and computer vision.</p>${collaborations.map(p => paperMarkup(p, true)).join('')}</section>
      <footer class="site-footer"><span>© 2026 ${esc(profile.name)}</span><span>Updated ${esc(profile.updated)}</span><a href="#about">Back to top <span aria-hidden="true">↑</span></a></footer>
    </main>
  </div><div id="copy-announcement" class="sr-only" role="status" aria-live="polite"></div>
</body>
</html>
`;

if (process.argv.includes('--check')) {
  if (readFileSync(resolve(root, 'index.html'), 'utf8') !== html) throw new Error('index.html is out of date. Run node scripts/build-homepage.mjs.');
  console.log('Generated homepage matches its content sources.');
} else {
  writeFileSync(resolve(root, 'index.html'), html);
  console.log(`Built index.html with ${publications.length} speech works, ${projects.length} embodied-audio projects, and ${collaborations.length} collaborations.`);
}
