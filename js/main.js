(() => {
  'use strict';

  const root = document.documentElement;
  const themeToggle = document.querySelector('#theme-toggle');
  const themeLabel = document.querySelector('.theme-label');
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const rows = [...document.querySelectorAll('.spec-row')];
  const expandToggle = document.querySelector('#expand-toggle');
  const links = [...document.querySelectorAll('.nav-link')];
  const sections = links.map((link) => document.querySelector(link.getAttribute('href')));

  function applyTheme(theme) {
    root.dataset.theme = theme;
    themeLabel.textContent = theme.toUpperCase();
    themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
    themeColor.setAttribute('content', theme === 'dark' ? '#0d0e11' : '#f4f1ea');
    try { localStorage.setItem('theme', theme); } catch { /* Storage is optional. */ }
  }

  function toggleTheme() {
    applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
  }

  function updateExpandLabel() {
    const allOpen = rows.every((row) => row.open);
    expandToggle.textContent = allOpen ? '[collapse specs]' : '[expand specs]';
    expandToggle.setAttribute('aria-label', allOpen ? 'Collapse all project specifications' : 'Expand all project specifications');
  }

  function toggleRows() {
    const open = !rows.every((row) => row.open);
    rows.forEach((row) => { row.open = open; });
    updateExpandLabel();
  }

  function currentSection() {
    const page = document.scrollingElement;
    if (window.scrollY > 0 && Math.ceil(window.scrollY + window.innerHeight) >= page.scrollHeight - 2) {
      return sections.length - 1;
    }
    let index = 0;
    sections.forEach((section, i) => {
      if (section.getBoundingClientRect().top <= 75) index = i;
    });
    return index;
  }

  function updateNavigation() {
    const current = currentSection();
    links.forEach((link, i) => {
      if (i === current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }

  function jump(index) {
    const section = sections[index];
    if (!section) return;
    history.replaceState(null, '', `#${section.id}`);
    section.scrollIntoView({ behavior: 'instant', block: 'start' });
    section.setAttribute('tabindex', '-1');
    section.focus({ preventScroll: true });
    updateNavigation();
  }

  applyTheme(root.dataset.theme === 'light' ? 'light' : 'dark');
  themeToggle.addEventListener('click', toggleTheme);
  expandToggle.hidden = false;
  expandToggle.addEventListener('click', toggleRows);
  rows.forEach((row) => row.addEventListener('toggle', updateExpandLabel));
  updateExpandLabel();
  updateNavigation();
  let scrollScheduled = false;
  window.addEventListener('scroll', () => {
    if (scrollScheduled) return;
    scrollScheduled = true;
    requestAnimationFrame(() => {
      updateNavigation();
      scrollScheduled = false;
    });
  }, { passive: true });
  window.addEventListener('resize', updateNavigation);

  document.addEventListener('keydown', (event) => {
    if (event.defaultPrevented || event.repeat || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.target instanceof Element && event.target.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"])')) return;
    const key = event.key.toLowerCase();
    const focusedIndex = sections.indexOf(document.activeElement);
    const sectionIndex = focusedIndex < 0 ? currentSection() : focusedIndex;
    if (/^[1-5]$/.test(key)) jump(Number(key) - 1);
    else if (key === 'j') jump(Math.min(sections.length - 1, sectionIndex + 1));
    else if (key === 'k') jump(Math.max(0, sectionIndex - 1));
    else if (key === 't') toggleTheme();
    else if (key === 'e') toggleRows();
    else return;
    event.preventDefault();
  });
})();
