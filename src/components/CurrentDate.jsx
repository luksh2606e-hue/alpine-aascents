import { useEffect, useState } from 'react';
export default function CurrentDate() {
  const [date, setDate] = useState(() => new Date());
  useEffect(() => { const timer = window.setInterval(() => setDate(new Date()), 60000); return () => window.clearInterval(timer); }, []);
  return <time dateTime={date.toISOString()}>{date.toLocaleDateString()}</time>;
}
