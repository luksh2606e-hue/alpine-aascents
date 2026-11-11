import React, { useRef } from 'react';
import { Mountain, Menu, X, Globe2, Sun, Moon } from 'lucide-react';
import { useVisitorCount, VisitorCounter } from './VisitorCounter';

export default function SiteHeader({ open, setOpen, theme, setTheme, links }) {
  const menuRef = useRef(null);
  const scrollFrame = useRef(null);
  const [moreOpen, setMoreOpen] = React.useState(false);
  const close = () => setOpen(false);
  const visits = useVisitorCount();
  const [activeHref, setActiveHref] = React.useState(() => window.location.hash || '#home');

  const navigate = (event, href) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (!href.startsWith('#')) {
      close();
      return;
    }

    const target = document.getElementById(href.slice(1));
    if (!target) {
      close();
      return;
    }

    event.preventDefault();
    setActiveHref(href);
    close();
    setMoreOpen(false);
    if (scrollFrame.current !== null) window.cancelAnimationFrame(scrollFrame.current);
    scrollFrame.current = null;
    window.history.pushState(null, '', href);

    const startY = window.scrollY;
    const headerHeight = document.querySelector('.header')?.getBoundingClientRect().height ?? 84;
    const targetY = Math.max(0, target.getBoundingClientRect().top + startY - headerHeight - 12);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.scrollTo(0, targetY);
      return;
    }

    const duration = 1400;
    let startTime;
    const animate = (time) => {
      if (startTime === undefined) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      window.scrollTo(0, startY + (targetY - startY) * eased);
      if (progress < 1) scrollFrame.current = window.requestAnimationFrame(animate);
      else scrollFrame.current = null;
    };
    scrollFrame.current = window.requestAnimationFrame(animate);
  };

  return <>
    <div className="topline">
      <span><Mountain size={14} /> Explore responsibly. Respect the mountains.</span>
      <span><Globe2 size={14} /> Mountain knowledge for everyone</span>
    </div>
    <header className="header">
      <a className="brand" href="#home" onClick={(event) => navigate(event, '#home')}>
        <span className="brand-mark"><Mountain size={24} /></span>
        <span><b>ALPINE ASCENTS</b><small>THE MOUNTAIN JOURNEY</small></span>
      </a>
      <div className="header-visitor"><VisitorCounter visits={visits} /></div>
      <div className="header-actions">
        <button className="menu-toggle" aria-label={open ? 'Close navigation' : 'Toggle navigation'} onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <nav className={open ? 'nav open' : 'nav'} ref={menuRef}>
        {links.filter(([, href]) => ['#home', '#learn', '#mountain-map', '#gallery', '#guidelines'].includes(href)).map(([name, href]) => <a className={activeHref === href ? 'active' : ''} href={href} key={href} onClick={(event) => navigate(event, href)}>{name}</a>)}
        <div className={`nav-more ${moreOpen ? 'expanded' : ''}`}>
          <button className="nav-more-trigger" aria-expanded={moreOpen} onClick={() => setMoreOpen(!moreOpen)}>Explore <span aria-hidden="true">⌄</span></button>
          <div className="nav-more-menu">
            {links.filter(([, href]) => !['#home', '#learn', '#mountain-map', '#gallery', '#guidelines'].includes(href)).map(([name, href]) => <a className={activeHref === href ? 'active' : ''} href={href} key={href} onClick={(event) => navigate(event, href)}>{name}</a>)}
          </div>
        </div>
        <button className="theme-toggle" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`} title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}>
          {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
          <span>{theme === 'light' ? 'Dark' : 'Light'} mode</span>
        </button>
      </nav>
    </header>
  </>;
}
