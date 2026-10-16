---
permalink: "/"
title: "About me"
layout: "single"
author_profile: true
redirect_from: ["/about/","/about.html"]
---

I am a Ph.D. student at Shanghai University, working on speech and audio intelligence.

My research spans user-defined keyword spotting, speaker recognition, speech bandwidth extension, and speech language models. I also work on embodied audio, with an interest in how environments and device geometry shape the sound we hear.

You can find my papers on [Google Scholar](https://scholar.google.com/citations?user=xQsSstkAAAAJ&hl=en), research code on [GitHub](https://github.com/aizhiqi-work), and academic background on my [CV page](/cv/). Contact: [aizhiqi-work@shu.edu.cn](mailto:aizhiqi-work@shu.edu.cn).

## Speech & Audio Intelligence

My speech research covers keyword spotting, speaker recognition, speech bandwidth extension, and speech language models. Selected work is listed by research area below; see [Google Scholar](https://scholar.google.com/citations?user=xQsSstkAAAAJ&hl=en) for the full publication list.

{% include grouped-publications.html group="speech" %}

Related research resources: [LibriPhrase & GigaPhrase](https://github.com/aizhiqi-work/GigaPhrase-1000) · [OpenKWS](https://github.com/aizhiqi-work/OpenKWS).

## Embodied Audio

I work on acoustic simulation to understand how environments and device geometry shape the sound reaching microphones.

{% for post in site.portfolio %}
  {% include archive-single.html %}
{% endfor %}

## Background & CV

- **Ph.D. Student**, Shanghai University.
- Research interests: speech and audio intelligence, and embodied audio.

For my detailed academic background and curriculum vitae, please [contact me by email](mailto:aizhiqi-work@shu.edu.cn?subject=CV%20request).

## Interdisciplinary Collaborations

Collaborative work in wireless positioning and computer vision.

{% include grouped-publications.html group="collaborations" %}
