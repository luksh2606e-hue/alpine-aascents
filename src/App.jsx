import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { links, pics, safety, checklist } from './data';
import SectionHeading from './components/SectionHeading';
import SiteHeader from './components/SiteHeader';
import Hero from './components/Hero';
import SiteFooter from './components/SiteFooter';
import { LearnSection, HistorySection, StylesSection } from './components/LearningSections';
import { TechniquesSection, ShelterSection, SafetySection } from './components/MountainSkillsSections';
import { RecordsSection, ClubsSection, GallerySection, CampStoriesSection } from './components/CommunitySections';
import { UpdatesSection, GuidelinesSection, ClosingSection } from './components/GuidelineSections';
import MountainMap from './components/MountainMap';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState({});
  const [lightbox, setLightbox] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem('alpine-theme') || 'dark');

  useEffect(() => {
    gsap.from('.hero-copy > *', { y: 28, opacity: 0, duration: .85, stagger: .11, ease: 'power3.out', delay: .15 });
    gsap.utils.toArray('.reveal').forEach(el => gsap.fromTo(el, { y: 38, opacity: 0 }, { y: 0, opacity: 1, duration: .75, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 86%', once: true } }));
  }, []);
  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    return () => document.body.classList.remove('menu-open');
  }, [open]);
  useEffect(() => {
    if (!lightbox) return undefined;

    const body = document.body;
    const scrollY = window.scrollY;
    const previous = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
      paddingRight: body.style.paddingRight,
    };
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      Object.assign(body.style, previous);
      window.scrollTo(0, scrollY);
    };
  }, [lightbox]);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('alpine-theme', theme);
  }, [theme]);

  const sectionTitle = SectionHeading;
  return <>
    <SiteHeader open={open} setOpen={setOpen} theme={theme} setTheme={setTheme} links={links} />
    <main id="main">
      <Hero pics={pics} />
      <LearnSection sectionTitle={sectionTitle} />
      <HistorySection sectionTitle={sectionTitle} />
      <StylesSection sectionTitle={sectionTitle} />
      <TechniquesSection sectionTitle={sectionTitle} />
      <ShelterSection sectionTitle={sectionTitle} />
      <MountainMap sectionTitle={sectionTitle} onLocationChange={setUserLocation} />
      <SafetySection sectionTitle={sectionTitle} />
      <RecordsSection sectionTitle={sectionTitle} />
      <ClubsSection sectionTitle={sectionTitle} />
      <CampStoriesSection sectionTitle={sectionTitle} />
      <GallerySection sectionTitle={sectionTitle} setLightbox={setLightbox} />
      <UpdatesSection sectionTitle={sectionTitle} />
      <GuidelinesSection sectionTitle={sectionTitle} checked={checked} setChecked={setChecked} />
      <ClosingSection />
    </main>
    <SiteFooter lightbox={lightbox} setLightbox={setLightbox} userLocation={userLocation} />
  </>;
}
