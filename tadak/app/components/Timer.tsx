"use client";
import { useEffect, useState } from "react";

type TimerProps = {
  duration: number;
  onEnd: () => void;
  isRunning: boolean;
};

export default function Timer({ duration, onEnd, isRunning }: TimerProps) {
  const [time, setTime] = useState(duration);

  useEffect(() => {
    setTime(duration);
  }, [duration]);

  useEffect(() => {
    if (!isRunning) return;

    if (time <= 0) {
      onEnd();
      return;
    }

    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [time, isRunning]);

  return (
    <div className="text-xl font-bold">
      ⏱ {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, "0")}
    </div>
  );
}
