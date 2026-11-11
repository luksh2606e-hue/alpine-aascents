import React from 'react';

export default function SectionHeading(eyebrow, title, desc) {
  return <div className="section-heading reveal"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{desc && <p>{desc}</p>}</div>;
}
