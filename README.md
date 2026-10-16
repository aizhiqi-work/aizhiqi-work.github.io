# Zhiqi Ai — Academic Pages

Website: https://aizhiqi-work.github.io/

This website uses the repository's original [Academic Pages](https://academicpages.github.io/) Jekyll template, including its default typography, colors, layouts, navigation, author sidebar, and footer. The avatar is capped at 128 px to retain the author's requested smaller portrait.

## Edit content

- `_config.yml`: name, author profile, contact links, affiliation, and research categories.
- `_data/navigation.yml`: the standard About / Publications / Projects / CV navigation.
- `_pages/about.md`: the homepage and research introduction.
- `_publications/`: one Markdown file per paper; `category` determines the research group. Mark manuscripts `status: under-review` or `status: preprint` as appropriate.
- `_portfolio/`: Acoustic Agent and Mesh2ATF project descriptions.
- `_pages/cv.md`: education, research background, and the CV contact link.
- `files/bibtex/`: downloadable citations.

GitHub Pages builds Jekyll from the `master` branch at the repository root. There is no custom HTML/CSS homepage and no `.nojekyll` file. The original template's MIT license and attribution are retained.

For local development, use the standard template workflow: install Ruby and Bundler, run `bundle install`, then `bundle exec jekyll serve`.

## Content to complete gradually

1. Doctoral school/department, advisor, and start year; previous degrees and relevant experience.
2. A real CV PDF in `files/`; until supplied, CV links lead to a contact request.
3. BDR-BWE author list and manuscript/citation link. Its title and listening demo come from the public project; under-review status was supplied by the author.
4. Further publications and project materials. The next-generation simulator is omitted until the author is ready.

Unused template demonstration pages are excluded from the build. Sample publications and projects were replaced with the author's actual work.
