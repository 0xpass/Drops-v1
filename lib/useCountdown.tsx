import { useEffect, useState } from "react";
const MS_PER_SEC = 1000;
const MS_PER_MIN = 60 * MS_PER_SEC;
const MS_PER_HOUR = 60 * MS_PER_MIN;
const MS_PER_DAY = 24 * MS_PER_HOUR;

export default function useCountdown(dropTime: Date, dropCallback?: Function) {
  const [ms, setMs] = useState(dropTime.getTime() - Date.now());
  const [countdownInterval, setCountdownInterval] = useState();

  useEffect(() => {
    const interval = setInterval(() => {
      setMs(dropTime.getTime() - Date.now());
    }, 1000);
    setCountdownInterval(countdownInterval);
    return () => clearInterval(interval);
  }, [countdownInterval, dropTime]);

  useEffect(() => {
    if (ms < 0) {
      dropCallback?.();
      setMs(0);
      clearInterval(countdownInterval);
    }
  }, [countdownInterval, dropCallback, ms]);

  const days = Math.floor(ms / MS_PER_DAY);
  const hours = Math.floor((ms % MS_PER_DAY) / MS_PER_HOUR);
  const minutes = Math.floor((ms % MS_PER_HOUR) / MS_PER_MIN);
  const seconds = Math.floor((ms % MS_PER_MIN) / MS_PER_SEC);
  return {
    days,
    hours,
    minutes,
    seconds, 
  }
}
