import React from 'react';
import { Compass, ArrowDown, ArrowUpRight } from 'lucide-react';

export default function Hero({ pics }) {
  return <section className="hero" id="home" style={{backgroundImage:`linear-gradient(90deg,rgba(12,31,31,.83),rgba(12,31,31,.35) 64%,rgba(12,31,31,.08)),linear-gradient(0deg,rgba(7,24,22,.46),transparent 46%),url(${pics.hero})`}}><div className="hero-copy"><span className="eyebrow light">A GUIDE TO THE HIGH PLACES</span><h1>Find your next<br/><em>great ascent.</em></h1><p>Discover the skills, stories, places and principles behind the world of mountaineering.</p><div className="hero-actions"><a className="button primary" href="#learn">Explore mountaineering <ArrowDown size={18}/></a><a className="button outline" href="#clubs">Find climbing clubs</a></div><div className="hero-note"><Compass size={15}/> Knowledge is the first step toward a safer adventure.</div><div className="hero-stats"><div><b>01</b><span>Learn the basics</span></div><div><b>02</b><span>Understand the risks</span></div><div><b>03</b><span>Plan with care</span></div></div></div><div className="field-note">FIELD NOTES / 001 <span>THE MOUNTAINS ARE CALLING</span></div></section>
}
