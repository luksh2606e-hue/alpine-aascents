import React from 'react';

const VISIT_KEY = 'alpine-ascents-page-loads';

export function useVisitorCount() {
  const [visits, setVisits] = React.useState(0);

  React.useEffect(() => {
    // Count every document load, including manual reloads. This works on static
    // hosting and does not depend on a third-party counter response.
    try {
      const previous = Number(window.localStorage.getItem(VISIT_KEY)) || 0;
      const next = previous + 1;
      window.localStorage.setItem(VISIT_KEY, String(next));
      setVisits(next);
    } catch {
      // Still show a count if the visitor's browser blocks local storage.
      setVisits((current) => current + 1);
    }
  }, []);

  return visits;
}

export function VisitorCounter({ visits }) {
  return <span className="visitor-counter" title="Page loads recorded in this browser; this count rises on each reload"><span className="visitor-label">VISITORS</span> <b>{visits}</b></span>;
}
