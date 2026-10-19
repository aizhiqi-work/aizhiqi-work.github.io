---
permalink: "/"
title: "About me"
layout: "single"
author_profile: true
redirect_from: ["/about/","/about.html"]
---

I am a Ph.D. student at Shanghai University, working on speech and audio intelligence.

My research spans wake-word detection, speaker recognition, speech synthesis, and speech language models.

My current focus is spatial audio simulation and sim-to-real (Sim2Real) transfer, exploring how acoustic simulation can support audio perception in real-world environments.

<div class="profile-actions" markdown="0">
<a href="https://scholar.google.com/citations?user=xQsSstkAAAAJ&hl=en" target="_blank" rel="noopener noreferrer">Google Scholar ↗</a>
<a href="https://github.com/aizhiqi-work" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
<a href="/cv/">CV & Background</a>
<a href="mailto:aizhiqi-work@shu.edu.cn">Email</a>
</div>

## Speech & Audio Intelligence

Publications are grouped by research area, including text-to-speech synthesis and current manuscripts.

{% include grouped-publications.html group="speech" %}

Related research resources: [LibriPhrase & GigaPhrase](https://github.com/aizhiqi-work/GigaPhrase-1000) · [OpenKWS](https://github.com/aizhiqi-work/OpenKWS).

<span id="embodied"></span>

## Embodied Audio

I work on acoustic simulation to understand how environments and device geometry shape the sound reaching microphones.

<div markdown="0">
{% for post in site.portfolio %}
{% include work-card.html %}
{% endfor %}
</div>

<h2 id="background-cv">Background &amp; CV</h2>

{% include education-cards.html %}

<p class="cv-actions"><a class="work-link" href="/cv/">View CV</a> <a class="work-link" href="mailto:aizhiqi-work@shu.edu.cn?subject=CV%20request">Request CV ↗</a></p>

<h2 id="honors-awards">Honors &amp; Awards</h2>

{% include award-cards.html %}

## Interdisciplinary Collaborations

Collaborative work in wireless positioning and computer vision.

{% include grouped-publications.html group="collaborations" %}
