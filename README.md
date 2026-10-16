# Zhiqi Ai — academic homepage

Live website: **https://aizhiqi-work.github.io/**

A responsive academic homepage organized around speech and audio intelligence, embodied audio, and interdisciplinary collaborations.

## Maintain content

Edit the JSON files, then regenerate the homepage:

| File | Contents |
| --- | --- |
| content/profile.json | Name, affiliation, bio, email, portrait, education, CV link |
| content/publications.json | Keyword spotting, speaker modeling, BWE, Speech LLM papers |
| content/projects.json | Acoustic Agent and Mesh2ATF |
| content/collaborations.json | Wireless and computer vision collaborations |
| assets/homepage/style.css | Layout and visual styling |
| assets/homepage/app.js | Publication search, category filters, citation copying |

```sh
node scripts/build-homepage.mjs
node scripts/check-homepage.mjs
node scripts/preview-homepage.mjs
```

Preview: http://127.0.0.1:4173/

No package installation or Ruby environment is required for this homepage. The committed index.html includes all content so papers and navigation remain accessible without JavaScript. JavaScript adds filtering, search, citation copying, and section navigation.

## Publishing

GitHub Pages serves master from the repository root. Keep .nojekyll and the generated index.html committed. Push ordinary commits to master; no force push is needed.

The earlier Academic Pages template and its MIT license are retained. The current homepage uses index.html, assets/homepage/, and content/; the old Jekyll sample pages are not generated or linked by the new homepage.

## Next content to add

- Confirm the doctoral school/department, advisor, and start year. The existing affiliation, portrait, and email were retained from this repository; the role was updated to the user-confirmed Ph.D. Student.
- Add prior degrees, research visits, internships, and awards as desired.
- Add a real CV PDF to files/ and set cv in content/profile.json, for example "files/Zhiqi_Ai_CV.pdf". Until then, the site provides an email request link rather than a broken PDF download.
- Complete the BDR-BWE author list, manuscript link, and citation once supplied. The title comes from the public listening-demo repository; its under-review status was provided by the author.
- Add additional publications and project figures incrementally. This first version is a selected list, with a link to the full Google Scholar profile.
- Add the next-generation simulator when the author is ready. It is intentionally omitted from the first version.

## Publication sources

Publication links point to ISCA, IEEE DOI records, or author-submitted arXiv papers. Formal publication years are used rather than preprint years. Interspeech 2026 acceptance of the short-duration speaker verification paper is documented in its arXiv comments; its BibTeX remains the available arXiv record until formal proceedings metadata is supplied. No citation counts are copied or automatically scraped from Google Scholar.
