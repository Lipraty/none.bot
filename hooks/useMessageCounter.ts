import { useState, useEffect } from 'react';

export function useMessageCounter(initialMin = 100000, initialMax = 1000000, fluctuation = 100000, intervalMs = 3000) {
  const [messagesSent, setMessagesSent] = useState(0);

  useEffect(() => {
    setMessagesSent(Math.floor(Math.random() * (initialMax - initialMin + 1)) + initialMin);

    const interval = setInterval(() => {
      setMessagesSent((prev) => {
        const change = Math.floor(Math.random() * (2 * fluctuation + 1)) - fluctuation;
        return Math.max(initialMin, prev + change);
      });
    }, intervalMs);

    return () => clearInterval(interval);
  }, [initialMin, initialMax, fluctuation, intervalMs]);

  return messagesSent;
}
