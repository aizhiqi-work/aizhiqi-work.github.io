(() => {
  const tools = document.querySelector('.research-tools');
  const input = document.querySelector('#paper-search');
  const filters = [...document.querySelectorAll('.filter-button')];
  const groups = [...document.querySelectorAll('.paper-group')];
  const papers = [...document.querySelectorAll('#publication-groups .publication')];
  const count = document.querySelector('#result-count');
  const empty = document.querySelector('.empty-state');
  let activeFilter = 'all';
  function update() {
    const terms = input.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    let visibleCount = 0;
    papers.forEach(paper => {
      const matches = (activeFilter === 'all' || paper.dataset.category === activeFilter) && terms.every(term => paper.dataset.search.includes(term));
      paper.hidden = !matches;
      if (matches) visibleCount++;
    });
    groups.forEach(group => { group.hidden = ![...group.querySelectorAll('.publication')].some(paper => !paper.hidden); });
    filters.forEach(button => { const active = button.dataset.filter === activeFilter; button.classList.toggle('active', active); button.setAttribute('aria-pressed', String(active)); });
    count.textContent = `${visibleCount} ${visibleCount === 1 ? 'work' : 'works'}${activeFilter !== 'all' || terms.length ? ` of ${papers.length}` : ' across four research areas'}`;
    empty.hidden = visibleCount > 0;
  }
  if (tools && input && count && empty) {
    tools.hidden = false; count.hidden = false;
    filters.forEach(button => button.addEventListener('click', () => { activeFilter = button.dataset.filter; update(); }));
    input.addEventListener('input', update);
    document.querySelector('#reset-search').addEventListener('click', () => { activeFilter = 'all'; input.value = ''; update(); input.focus(); });
    update();
  }
  document.querySelectorAll('.copy-citation').forEach(button => button.addEventListener('click', async () => {
    const wrapper = button.closest('.citation-content');
    const text = wrapper.querySelector('pre').textContent;
    const status = wrapper.querySelector('.copy-status');
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(text);
      status.textContent = 'Copied';
      document.querySelector('#copy-announcement').textContent = 'Citation copied to clipboard.';
    } catch {
      const selection = window.getSelection();
      const range = document.createRange(); range.selectNodeContents(wrapper.querySelector('pre')); selection.removeAllRanges(); selection.addRange(range);
      status.textContent = 'Selected — press Ctrl+C or ⌘C to copy';
    }
  }));
  if ('IntersectionObserver' in window) {
    const sectionLinks = [...document.querySelectorAll('.section-nav a')];
    const observer = new IntersectionObserver(entries => {
      const entry = entries.filter(item => item.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (!entry) return;
      sectionLinks.forEach(link => { const active = link.hash === `#${entry.target.id}`; link.classList.toggle('active', active); if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current'); });
    }, { rootMargin: '-100px 0px -65% 0px', threshold: 0 });
    document.querySelectorAll('main > section').forEach(section => observer.observe(section));
  }
})();
