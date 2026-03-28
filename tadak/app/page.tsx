"use client";
import { useEffect, useState } from "react";

import StartScreen from "@/app/components/StartScreen";
import Timer from "@/app/components/Timer";

type Word = {
  ko: string;
  jp: string;
};

export default function Typing() {
  const [mounted, setMounted] = useState(false);
  const [words, setWords] = useState<Word[]>([]);
  const [current, setCurrent] = useState<Word | null>(null);
  const [input, setInput] = useState("");

  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isWrong, setIsWrong] = useState(false);

  const [isStarted, setIsStarted] = useState(false);
  const [selectedTime, setSelectedTime] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    setMounted(true);

    fetch("/api/words")
      .then((res) => res.json())
      .then((data) => {
        setWords(data);
      });
  }, []);

  const getRandomWord = (list: Word[]) => {
    return list[Math.floor(Math.random() * list.length)];
  };

  const nextQuestion = () => {
    if (!words.length) return;
    setCurrent(getRandomWord(words));
    setInput("");
    setIsWrong(false);
  };

  const handleStart = () => {
    if (!words.length) return;

    setIsStarted(true);
    setIsRunning(true);
    setIsGameOver(false);
    setScore(0);
    setStreak(0);

    setCurrent(getRandomWord(words));
  };

  const handleTimeEnd = () => {
    setIsRunning(false);
    setIsGameOver(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isRunning) return;

    const value = e.target.value;
    setInput(value);

    if (!current) return;

    if (value.length < current.ko.length) {
      if (!current.ko.startsWith(value)) {
        setIsWrong(true);
        setStreak(0);
      } else {
        setIsWrong(false);
      }
      return;
    }

    if (value === current.ko) {
      setScore((prev) => prev + 10);
      setStreak((prev) => prev + 1);
      setIsWrong(false);

      setTimeout(() => {
        nextQuestion();
      }, 300);
    } else {
      setIsWrong(true);
      setStreak(0);
    }
  };

  if (!mounted) return null;

  if (!isStarted) {
    return (
      <StartScreen
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        onStart={handleStart}
        isReady={words.length > 0}
      />
    );
  }

  if (isGameOver) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <h2 className="text-2xl font-bold">게임 종료 🎉</h2>
        <p className="text-lg">최종 점수: {score}</p>
        <button
          onClick={() => setIsStarted(false)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          다시 하기
        </button>
      </div>
    );
  }

  if (!current) return <div>화이팅 ~ 곧 나옵니다</div>;

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6 p-4">
      <Timer
        duration={selectedTime}
        onEnd={handleTimeEnd}
        isRunning={isRunning}
      />

      <div className="flex gap-6 text-lg font-semibold">
        <span>점수: {score}</span>
        <span>🔥 {streak}</span>
      </div>

      <div className="text-2xl font-bold">
        {current.ko.split("").map((char, idx) => {
          let color = "text-gray-400";

          if (idx < input.length) {
            color = input[idx] === char ? "text-green-500" : "text-red-500";
          }

          return (
            <span key={idx} className={color}>
              {char}
            </span>
          );
        })}
      </div>

      <div className="text-2xl text-gray-500">{current.jp}</div>

      <input
        type="text"
        value={input}
        onChange={handleChange}
        disabled={!isRunning}
        className={`border p-3 text-lg w-full max-w-md rounded transition ${
          isWrong ? "border-red-500" : "border-gray-300"
        }`}
        placeholder="여기에 입력하세요..."
      />

      <div className="h-6">
        {!isWrong && input === current.ko && (
          <p className="text-green-500">정답입니다! 🎉</p>
        )}
      </div>
    </div>
  );
}
