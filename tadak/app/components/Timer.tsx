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

  const progress = (time / duration) * 100;
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-28 h-28 flex items-center justify-center">
        <svg className="absolute w-full h-full rotate-[-90deg]">
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            strokeWidth="6"
            className="stroke-gray-200 dark:stroke-gray-700"
            fill="transparent"
          />
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            strokeWidth="6"
            strokeLinecap="round"
            className="stroke-gray-900 dark:stroke-white transition-all duration-1000 ease-linear"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>

        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900 dark:text-white">
            {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, "0")}
          </div>
        </div>
      </div>

      <span className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        남은 시간
      </span>
    </div>
  );
}
