(() => {
  'use strict';

  document.documentElement.dataset.theme = 'dark';

  // A small local-time clock. It sleeps while the tab is hidden.
  const clocks = [...document.querySelectorAll('[data-clock]')];
  if (clocks.length) {
    let clockTimer = null;
    function updateClock() {
      const value = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit',
        hourCycle: 'h23'
      }).format(new Date());
      clocks.forEach(clock => { clock.textContent = value + ' IST'; });
    }
    function scheduleClock() {
      if (clockTimer !== null) window.clearTimeout(clockTimer);
      clockTimer = null;
      if (document.visibilityState !== 'visible') return;
      updateClock();
      const delay = 60000 - (Date.now() % 60000) + 25;
      clockTimer = window.setTimeout(scheduleClock, delay);
    }
    document.addEventListener('visibilitychange', scheduleClock);
    scheduleClock();
  }

  // Native command dialog: links keep their normal hash navigation behavior.
  const dialog = document.querySelector('#command-menu');
  const search = dialog ? dialog.querySelector('#command-search') : null;
  const list = dialog ? dialog.querySelector('.command-list') : null;
  const status = dialog ? dialog.querySelector('#command-status') : null;
  const copyEmail = dialog ? dialog.querySelector('#copy-email') : null;
  const copyLabel = copyEmail ? (copyEmail.querySelector('.flow-content > span') || copyEmail.querySelector('span')) : null;
  let copyResetTimer = null;
  let statusResetTimer = null;

  if (dialog && typeof dialog.showModal === 'function') {
    const openButtons = [...document.querySelectorAll('[data-command-open]')];
    const closeButtons = [...dialog.querySelectorAll('[data-command-close]')];

    function commandItems() {
      return list ? [...list.querySelectorAll('.command-item')] : [];
    }

    function visibleCommandItems() {
      return commandItems().filter(item => !item.hidden && !item.closest('[hidden]'));
    }

    function filterCommands() {
      if (!search) return;
      const query = search.value.trim().toLocaleLowerCase();
      commandItems().forEach(item => {
        item.hidden = !item.textContent.toLocaleLowerCase().includes(query);
      });
      if (status) status.textContent = visibleCommandItems().length ? '' : 'No matching commands.';
    }

    function resetCommandStatus() {
      if (statusResetTimer !== null) window.clearTimeout(statusResetTimer);
      statusResetTimer = null;
      if (status) status.replaceChildren();
    }

    function openCommandMenu() {
      if (!dialog.open) dialog.showModal();
      if (search) {
        search.value = '';
        filterCommands();
      }
      resetCommandStatus();
      if (copyLabel) copyLabel.textContent = 'Copy email address';
      if (copyResetTimer !== null) window.clearTimeout(copyResetTimer);
      copyResetTimer = null;
      window.requestAnimationFrame(() => {
        if (dialog.open && search) search.focus();
      });
    }

    openButtons.forEach(button => button.addEventListener('click', openCommandMenu));
    closeButtons.forEach(button => button.addEventListener('click', () => dialog.close()));
    if (search) search.addEventListener('input', filterCommands);

    dialog.addEventListener('click', event => {
      const link = event.target.closest('.command-item[href]');
      if (link) {
        const destination = document.querySelector(link.hash);
        if (destination) {
          event.preventDefault();
          dialog.close();
          history.pushState(null, '', link.hash);
          requestAnimationFrame(() => {
            destination.setAttribute('tabindex', '-1');
            destination.focus({ preventScroll: true });
            destination.scrollIntoView({ behavior: 'instant', block: 'start' });
          });
        }
      }
      if (event.target === dialog) {
        const bounds = dialog.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
      }
    });

    function focusAdjacentItem(event) {
      const items = visibleCommandItems();
      if (!items.length) return;
      const activeIndex = items.findIndex(item => item.contains(document.activeElement));
      const fromSearch = document.activeElement === search;
      let nextIndex;
      if (fromSearch) nextIndex = event.key === 'ArrowDown' ? 0 : items.length - 1;
      else if (activeIndex >= 0) {
        const step = event.key === 'ArrowDown' ? 1 : -1;
        nextIndex = (activeIndex + step + items.length) % items.length;
      } else return;
      const target = items[nextIndex].matches('a, button, [tabindex]')
        ? items[nextIndex]
        : items[nextIndex].querySelector('a, button, [tabindex]');
      if (target) {
        event.preventDefault();
        target.focus();
      }
    }

    dialog.addEventListener('keydown', event => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        if (event.target === search || event.target.closest('.command-item')) focusAdjacentItem(event);
        return;
      }
      if (event.key === 'Enter' && event.target === search) {
        const firstItem = visibleCommandItems()[0];
        if (!firstItem) return;
        const target = firstItem.matches('a, button, [tabindex]')
          ? firstItem
          : firstItem.querySelector('a, button, [tabindex]');
        if (target) {
          event.preventDefault();
          target.click();
        }
      }
    });

    document.addEventListener('keydown', event => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        if (dialog.open) dialog.close();
        else openCommandMenu();
      }
    });

    if (copyEmail) {
      copyEmail.addEventListener('click', async () => {
        resetCommandStatus();
        try {
          if (!navigator.clipboard || typeof navigator.clipboard.writeText !== 'function') {
            throw new Error('Clipboard access is unavailable.');
          }
          await navigator.clipboard.writeText('santiagojerald734@gmail.com');
          if (copyLabel) copyLabel.textContent = 'Copied';
          if (copyResetTimer !== null) window.clearTimeout(copyResetTimer);
          copyResetTimer = window.setTimeout(() => {
            if (copyLabel) copyLabel.textContent = 'Copy email address';
            copyResetTimer = null;
          }, 1800);
        } catch (_) {
          if (status) {
            status.textContent = 'Copy failed. Email Santiago at ';
            const mailLink = document.createElement('a');
            mailLink.href = 'mailto:santiagojerald734@gmail.com';
            mailLink.textContent = 'santiagojerald734@gmail.com';
            status.append(mailLink, '.');
            if (statusResetTimer !== null) window.clearTimeout(statusResetTimer);
            statusResetTimer = window.setTimeout(resetCommandStatus, 8000);
          }
        }
      });
    }
  }

  // Share the React FlowButton's markup and styling with native controls.
  // Wrapping the original nodes preserves their labels, listeners and links.
  const flowControls = document.querySelectorAll('button, a.button, .project-links a, a.contact-arrow, a.command-item');
  const arrow = (direction) => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('class', 'flow-arrow flow-arrow--' + direction);
    for (const d of ['M5 12h14', 'm12 5 7 7-7 7']) {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', d);
      svg.append(path);
    }
    return svg;
  };
  const sizeFlowFill = (element, width, height) => {
    element.style.setProperty('--flow-scale', String(Math.ceil(Math.hypot(width, height) / 8)));
  };
  const flowResize = 'ResizeObserver' in window ? new ResizeObserver(entries => entries.forEach(entry => { const box = entry.borderBoxSize?.[0]; sizeFlowFill(entry.target, box?.inlineSize ?? entry.contentRect.width, box?.blockSize ?? entry.contentRect.height); })) : null;
  flowControls.forEach(control => {
    if (control.classList.contains('flow-button')) { flowResize?.observe(control); return; }
    const iconOnly = control.matches('.contact-arrow');
    const compact = control.matches('.utility-button, .project-links a');
    control.classList.add('flow-button', iconOnly ? 'flow-button--icon' : compact ? 'flow-button--compact' : 'flow-button--default');
    // Existing decorative trailing arrows are supplied by the shared effect.
    if (control.matches('a.button')) control.querySelectorAll('svg').forEach(icon => icon.remove());
    if (control.matches('.project-links a')) {
      const label = control.textContent.trim();
      control.setAttribute('aria-label', label);
      // The animated arrow replaces the old decorative ASCII arrow.
      control.textContent = label.replace(/^\[/, '').replace(/\s*->\]$/, '');
    }
    const content = document.createElement('span');
    content.className = 'flow-content';
    content.append(...control.childNodes);
    const fill = document.createElement('span');
    fill.className = 'flow-fill';
    fill.setAttribute('aria-hidden', 'true');
    control.replaceChildren(...(iconOnly ? [] : [arrow('in')]), content, fill, ...(iconOnly ? [] : [arrow('out')]));
    flowResize?.observe(control);
  });

  if (!flowResize) requestAnimationFrame(() => {
    const sizes = [...flowControls].map(element => ({ element, rect: element.getBoundingClientRect() }));
    sizes.forEach(({ element, rect }) => sizeFlowFill(element, rect.width, rect.height));
  });

  // Paint a small poster first. Start the same animation after critical loading.
  const video = document.querySelector('[data-banner-video]');
  if (video) {
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const connection = navigator.connection;
    let visible = true, scheduled = false;
    const sync = () => {
      if (!visible || document.hidden || motion.matches || connection?.saveData) { video.pause(); return; }
      if (!video.src) video.src = video.canPlayType('video/webm; codecs="vp9"') ? video.dataset.webm : video.dataset.mp4;
      video.muted = true;
      video.play().catch(() => {});
    };
    const schedule = () => {
      if (scheduled) return;
      scheduled = true;
      const ready = () => { if ('requestIdleCallback' in window) requestIdleCallback(sync, { timeout: 1200 }); else setTimeout(sync, 50); };
      if (document.readyState === 'complete') ready(); else addEventListener('load', ready, { once: true });
    };
    video.addEventListener('playing', () => { video.dataset.playing = 'true'; });
    video.addEventListener('error', () => {
      if (video.src && !video.src.endsWith('.mp4')) { video.src=video.dataset.mp4; sync(); }
    });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(entries => {
        visible = entries.some(entry => entry.isIntersecting);
        if (visible) { if (scheduled && document.readyState === 'complete') sync(); else schedule(); }
        else video.pause();
      }).observe(video);
    } else schedule();
    document.addEventListener('visibilitychange', () => { if (scheduled) sync(); });
    motion.addEventListener('change', () => { if (motion.matches) delete video.dataset.playing; if (scheduled) sync(); });
    connection?.addEventListener?.('change', sync);
  }
})();
