(function(){
  const btn = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');
  if(btn && menu){
    btn.addEventListener('click', function(){
      const open = menu.classList.toggle('open');
      const header = btn.closest('header');
      if(header) header.classList.toggle('header--menu-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');});
  }

  const form = document.querySelector('form[data-contact-form]');
  if(form){
    form.addEventListener('submit', (e)=>{
      const required = form.querySelectorAll('[required]');
      let ok = true;
      required.forEach(inp=>{
        if(!inp.value || !inp.value.trim()){
          ok = false;
          inp.setAttribute('aria-invalid', 'true');
        } else {
          inp.removeAttribute('aria-invalid');
        }
      });
      if(!ok){
        e.preventDefault();
        const msg = document.querySelector('[data-form-message]');
        if(msg){
          msg.textContent = 'Please complete the required fields before submitting.';
          msg.focus();
        }
      }
    });
  }

  // --- JAMERYKA: lightweight analytics hook + CTA tracking ---
  function jamTrack(name, params){
    try{
      if(typeof gtag === 'function'){
        gtag('event', name, params || {});
      } else if(window.dataLayer && typeof window.dataLayer.push === 'function'){
        window.dataLayer.push({ event: name, ...(params||{}) });
      }
    }catch(e){}
  }

  // Track key CTA clicks
  document.addEventListener('click', function(e){
    const a = e.target && (e.target.closest ? e.target.closest('a') : null);
    if(!a) return;
    const href = a.getAttribute('href') || '';
    const label = (a.getAttribute('data-cta') || a.textContent || '').trim().slice(0,120);
    if(href.includes('contact.html') || href.includes('#contact')){
      jamTrack('cta_contact_click', { label, href });
    }
    if(href.includes('schedule.html')){
      jamTrack('cta_schedule_click', { label, href });
    }
  });

  // --- Desktop sticky CTA (shows on wider screens) ---
  (function(){
    const existing = document.querySelector('.desktop-cta');
    if(existing) return;
    const cta = document.createElement('a');
    cta.href = 'contact.html#contact';
    cta.className = 'desktop-cta';
    cta.setAttribute('data-cta','Desktop sticky Contact');
    cta.setAttribute('aria-label','Contact JAMERYKA');
    cta.innerHTML = '<span class="desktop-cta__icon">✉️</span><span class="desktop-cta__text">Contact</span>';
    document.body.appendChild(cta);
  })();

  // --- Form micro-confirmation (Netlify form submit) ---
  (function(){
    const form = document.querySelector('form[data-netlify="true"], form[name="contact"], form[name="schedule"]');
    if(!form) return;

    form.addEventListener('submit', function(){
      const msg = document.createElement('div');
      msg.className = 'form-toast';
      msg.setAttribute('role','status');
      msg.innerHTML = '<strong>Submitting…</strong><div class="form-toast__sub">We’re sending your message now.</div>';
      document.body.appendChild(msg);
      setTimeout(()=>msg.classList.add('show'), 30);
    });
  })();

})();

// Header scroll polish
(function(){
  const header = document.querySelector('.header');
  if(!header) return;
  const onScroll = () => {
    header.classList.toggle('header--scrolled', window.scrollY > 10);
  };
  window.addEventListener('scroll', onScroll, { passive:true });
  onScroll();

  // --- JAMERYKA: lightweight analytics hook + CTA tracking ---
  function jamTrack(name, params){
    try{
      if(typeof gtag === 'function'){
        gtag('event', name, params || {});
      } else if(window.dataLayer && typeof window.dataLayer.push === 'function'){
        window.dataLayer.push({ event: name, ...(params||{}) });
      }
    }catch(e){}
  }

  // Track key CTA clicks
  document.addEventListener('click', function(e){
    const a = e.target && (e.target.closest ? e.target.closest('a') : null);
    if(!a) return;
    const href = a.getAttribute('href') || '';
    const label = (a.getAttribute('data-cta') || a.textContent || '').trim().slice(0,120);
    if(href.includes('contact.html') || href.includes('#contact')){
      jamTrack('cta_contact_click', { label, href });
    }
    if(href.includes('schedule.html')){
      jamTrack('cta_schedule_click', { label, href });
    }
  });

  // --- Desktop sticky CTA (shows on wider screens) ---
  (function(){
    const existing = document.querySelector('.desktop-cta');
    if(existing) return;
    const cta = document.createElement('a');
    cta.href = 'contact.html#contact';
    cta.className = 'desktop-cta';
    cta.setAttribute('data-cta','Desktop sticky Contact');
    cta.setAttribute('aria-label','Contact JAMERYKA');
    cta.innerHTML = '<span class="desktop-cta__icon">✉️</span><span class="desktop-cta__text">Contact</span>';
    document.body.appendChild(cta);
  })();

  // --- Form micro-confirmation (Netlify form submit) ---
  (function(){
    const form = document.querySelector('form[data-netlify="true"], form[name="contact"], form[name="schedule"]');
    if(!form) return;

    form.addEventListener('submit', function(){
      const msg = document.createElement('div');
      msg.className = 'form-toast';
      msg.setAttribute('role','status');
      msg.innerHTML = '<strong>Submitting…</strong><div class="form-toast__sub">We’re sending your message now.</div>';
      document.body.appendChild(msg);
      setTimeout(()=>msg.classList.add('show'), 30);
    });
  })();

})();

// Page transitions
(function(){
  document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('page-ready');
  });

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if(!a) return;
    const href = a.getAttribute('href') || '';
    if(href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
    if(a.target === '_blank') return;
    if(!href.includes('.html') && !href.startsWith('/')) return;

    e.preventDefault();
    document.body.classList.add('page-leave');
    setTimeout(()=> window.location.href = href, 160);
  });

  // --- JAMERYKA: lightweight analytics hook + CTA tracking ---
  function jamTrack(name, params){
    try{
      if(typeof gtag === 'function'){
        gtag('event', name, params || {});
      } else if(window.dataLayer && typeof window.dataLayer.push === 'function'){
        window.dataLayer.push({ event: name, ...(params||{}) });
      }
    }catch(e){}
  }

  // Track key CTA clicks
  document.addEventListener('click', function(e){
    const a = e.target && (e.target.closest ? e.target.closest('a') : null);
    if(!a) return;
    const href = a.getAttribute('href') || '';
    const label = (a.getAttribute('data-cta') || a.textContent || '').trim().slice(0,120);
    if(href.includes('contact.html') || href.includes('#contact')){
      jamTrack('cta_contact_click', { label, href });
    }
    if(href.includes('schedule.html')){
      jamTrack('cta_schedule_click', { label, href });
    }
  });

  // --- Desktop sticky CTA (shows on wider screens) ---
  (function(){
    const existing = document.querySelector('.desktop-cta');
    if(existing) return;
    const cta = document.createElement('a');
    cta.href = 'contact.html#contact';
    cta.className = 'desktop-cta';
    cta.setAttribute('data-cta','Desktop sticky Contact');
    cta.setAttribute('aria-label','Contact JAMERYKA');
    cta.innerHTML = '<span class="desktop-cta__icon">✉️</span><span class="desktop-cta__text">Contact</span>';
    document.body.appendChild(cta);
  })();

  // --- Form micro-confirmation (Netlify form submit) ---
  (function(){
    const form = document.querySelector('form[data-netlify="true"], form[name="contact"], form[name="schedule"]');
    if(!form) return;

    form.addEventListener('submit', function(){
      const msg = document.createElement('div');
      msg.className = 'form-toast';
      msg.setAttribute('role','status');
      msg.innerHTML = '<strong>Submitting…</strong><div class="form-toast__sub">We’re sending your message now.</div>';
      document.body.appendChild(msg);
      setTimeout(()=>msg.classList.add('show'), 30);
    });
  })();

})();

// V2: Mobile Call FAB + scroll reveal
(function(){
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Inject mobile call button (only once)
  if(!document.querySelector('.call-fab')){
    const fab = document.createElement('div');
    fab.className = 'call-fab';
    fab.innerHTML = '<a href="contact.html#contact" aria-label="Contact JAMERYKA">✉️</a>';
    document.body.appendChild(fab);
  }

  // Inject mobile sticky call bar (only once)
  if(!document.querySelector('.call-bar')){
    const bar = document.createElement('div');
    bar.className = 'call-bar';
    bar.innerHTML = '<a class="call-bar__link" href="contact.html#contact" aria-label="Contact JAMERYKA"><span class="call-bar__text">Contact</span> <span class="call-bar__sub">Get Coverage Help</span></a>';
    document.body.appendChild(bar);
  }

  // Inject quick jump links (Top + Home) (only once)
  if(!document.getElementById('top')){
    const topAnchor = document.createElement('div');
    topAnchor.id = 'top';
    topAnchor.setAttribute('aria-hidden','true');
    // Put it at the very top of body
    document.body.insertBefore(topAnchor, document.body.firstChild);
  }
  if(!document.querySelector('.quick-jump')){
    const qj = document.createElement('div');
    qj.className = 'quick-jump';
    qj.innerHTML = '<a href="#top" class="quick-jump__link">Top</a><a href="index.html" class="quick-jump__link">Home</a>';
    document.body.appendChild(qj);
  }

  // Scroll reveal
  const candidates = [
    ...document.querySelectorAll('.card, .callout, .heroCard, .split > div, .footerGrid > div, .table, .notice')
  ];
  candidates.forEach(el => el.classList.add('reveal'));

  if(prefersReduced || !('IntersectionObserver' in window)){
    candidates.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  candidates.forEach(el => io.observe(el));

  // --- JAMERYKA: lightweight analytics hook + CTA tracking ---
  function jamTrack(name, params){
    try{
      if(typeof gtag === 'function'){
        gtag('event', name, params || {});
      } else if(window.dataLayer && typeof window.dataLayer.push === 'function'){
        window.dataLayer.push({ event: name, ...(params||{}) });
      }
    }catch(e){}
  }

  // Track key CTA clicks
  document.addEventListener('click', function(e){
    const a = e.target && (e.target.closest ? e.target.closest('a') : null);
    if(!a) return;
    const href = a.getAttribute('href') || '';
    const label = (a.getAttribute('data-cta') || a.textContent || '').trim().slice(0,120);
    if(href.includes('contact.html') || href.includes('#contact')){
      jamTrack('cta_contact_click', { label, href });
    }
    if(href.includes('schedule.html')){
      jamTrack('cta_schedule_click', { label, href });
    }
  });

  // --- Desktop sticky CTA (shows on wider screens) ---
  (function(){
    const existing = document.querySelector('.desktop-cta');
    if(existing) return;
    const cta = document.createElement('a');
    cta.href = 'contact.html#contact';
    cta.className = 'desktop-cta';
    cta.setAttribute('data-cta','Desktop sticky Contact');
    cta.setAttribute('aria-label','Contact JAMERYKA');
    cta.innerHTML = '<span class="desktop-cta__icon">✉️</span><span class="desktop-cta__text">Contact</span>';
    document.body.appendChild(cta);
  })();

  // --- Form micro-confirmation (Netlify form submit) ---
  (function(){
    const form = document.querySelector('form[data-netlify="true"], form[name="contact"], form[name="schedule"]');
    if(!form) return;

    form.addEventListener('submit', function(){
      const msg = document.createElement('div');
      msg.className = 'form-toast';
      msg.setAttribute('role','status');
      msg.innerHTML = '<strong>Submitting…</strong><div class="form-toast__sub">We’re sending your message now.</div>';
      document.body.appendChild(msg);
      setTimeout(()=>msg.classList.add('show'), 30);
    });
  })();

})();
