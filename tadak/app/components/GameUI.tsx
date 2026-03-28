"use client";

import { decompose } from "@/app/utils/hangul";
import { Word } from "./GameContainer";

type Props = {
  current: Word;
  input: string;
  score: number;
  streak: number;
  isWrong: boolean;
  isRunning: boolean;
  onChange: (value: string) => void;
};

export default function GameUI({
  current,
  input,
  score,
  streak,
  isWrong,
  isRunning,
  onChange,
}: Props) {
  const isFilled = input.length === current.ko.length;
  const isCorrect = input === current.ko;

  return (
    <div className="flex flex-col items-start justify-start gap-4 w-full p-4 max-w-[1200px] mx-auto">
      <div className="flex gap-6 text-sm text-gray-500 dark:text-gray-400 w-full justify-between">
        <span>점수 {score}</span>
        <span>🔥 {streak}</span>
      </div>

      <div className="text-3xl font-semibold tracking-wide w-full text-left break-words">
        {current.ko.split("").map((char, idx) => {
          let color = "text-gray-300";

          if (idx < input.length) {
            const inputChar = input[idx];

            const target = decompose(char).join("");
            const typed = decompose(inputChar).join("");

            if (typed.length < target.length) {
              color = "text-gray-900 dark:text-white";
            } else if (target === typed) {
              color = "text-gray-900 dark:text-white";
            } else {
              color = "text-red-700";
            }
          }

          return (
            <span key={idx} className={`${color} transition`}>
              {char}
            </span>
          );
        })}
      </div>

      <input
        key={current.ko}
        type="text"
        value={input}
        onChange={(e) => onChange(e.target.value)}
        disabled={!isRunning}
        autoFocus
        className={`
          w-full
          bg-transparent
          font-semibold
          text-left
          text-3xl
          outline-none
          border-b-2
          py-2
          transition-all
          ${
            isWrong
              ? "border-red-700"
              : "border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:border-gray-900 dark:focus:border-white"
          }
        `}
        placeholder=""
      />

      <div className="text-3xl text-gray-400 dark:text-gray-500 w-full text-left break-words">
        {current.jp}
      </div>
    </div>
  );
}
