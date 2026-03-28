"use client";
import { useEffect, useState } from "react";

export default function Splash({ fadeOut }: { fadeOut: boolean }) {
  const [text, setText] = useState("");
  const fullText = "TadaK";

  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      setText(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(interval);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`
        fixed inset-0 flex flex-col items-center justify-center
        transition-opacity duration-700
        ${fadeOut ? "opacity-0" : "opacity-100"}

        bg-gradient-to-br from-white to-gray-100
        dark:from-black dark:to-gray-900
      `}
    >
      <h1 className="text-5xl font-bold tracking-widest text-gray-900 dark:text-white flex items-center">
        {text}
        <span className="ml-1 animate-pulse">|</span>
      </h1>

      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        Korean Typing Practice (TOPIK)
      </p>

      <div className="w-40 h-[2px] mt-6 bg-gray-300 dark:bg-gray-700 overflow-hidden rounded">
        <div className="h-full w-1/2 bg-gray-900 dark:bg-white animate-[slide_1.2s_infinite]" />
      </div>

      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-72 h-72 bg-gray-300/20 dark:bg-white/10 blur-3xl rounded-full animate-pulse" />
      </div>

      <style>{`
        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
}
