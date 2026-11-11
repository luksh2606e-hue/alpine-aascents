import { useEffect, useState } from 'react';

export default function LocalClock() {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setTime(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <time dateTime={time.toISOString()}>
      {time.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })}
    </time>
  );
}
