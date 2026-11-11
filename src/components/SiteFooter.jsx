import React from 'react';
import LocalClock from './LocalClock';
import CurrentDate from './CurrentDate';
import { Mountain, Camera, CirclePlay, Compass, X, MapPin } from 'lucide-react';

function LocationReadout({ userLocation }) {
  if (!userLocation) return <span><MapPin size={13} /> LOCATION · SHARE FROM MAP</span>;
  const { latitude, longitude } = userLocation;
  const lat = `${Math.abs(latitude).toFixed(2)}°${latitude >= 0 ? 'N' : 'S'}`;
  const lon = `${Math.abs(longitude).toFixed(2)}°${longitude >= 0 ? 'E' : 'W'}`;
  return <span><MapPin size={13} /> YOUR LOCATION · {lat} {lon}</span>;
}

function StatusStrip({ userLocation }) {
  const content = <>
    <span><Compass size={13} /> <CurrentDate /> · <LocalClock /></span>
    <LocationReadout userLocation={userLocation} />
    <span>CLIMB RESPONSIBLY · LEAVE NO TRACE · PLAN FOR THE CONDITIONS</span>
  </>;

  return <div className="statusbar" aria-label="Current date, local time, visitor location, and mountain safety ticker">
    <div className="statusbar-track">
      <div className="statusbar-group">{content}</div>
      <div className="statusbar-group" aria-hidden="true">{content}</div>
    </div>
  </div>;
}

export default function SiteFooter({ lightbox, setLightbox, userLocation }) {
  return <>
    <footer className="footer"><div className="footer-brand"><a className="brand" href="#home"><span className="brand-mark"><Mountain/></span><span><b>ALPINE ASCENTS</b><small>THE MOUNTAIN JOURNEY</small></span></a><p>A student informational project about mountaineering, mountain knowledge and responsible adventure.</p><span className="social"><a href="https://instagram.com" aria-label="Instagram"><Camera/></a><a href="https://youtube.com" aria-label="YouTube"><CirclePlay/></a></span></div><div><h4>Explore</h4><a href="#history">History</a><a href="#styles">Types & styles</a><a href="#techniques">Techniques</a><a href="#records">Records</a></div><div><h4>Plan wisely</h4><a href="#clubs">Clubs & maps</a><a href="#safety">Hazards</a><a href="#guidelines">Guidelines</a><a href="#updates">Developments</a></div><div className="footer-bottom"><span>© 2026 Alpine Ascents · Educational demo</span><span>Learn. Prepare. Respect the mountains.</span><a href="#home">Back to top ↑</a></div></footer>
    <StatusStrip userLocation={userLocation} />
    {lightbox && <div className="lightbox" onClick={() => setLightbox(null)} role="presentation"><button aria-label="Close image" onClick={() => setLightbox(null)}><X/></button><img src={lightbox} alt="Enlarged mountain landscape"/></div>}
  </>;
}
