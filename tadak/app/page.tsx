"use client";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    setMounted(true);

    fetch("/api/words")
      .then((res) => res.json())
      .then((data) => {
        setWords(data);
        setCurrent(getRandomWord(data));
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      }, 500);
    } else {
      setIsWrong(true);
      setStreak(0);
    }
  };

  if (!mounted) return null;
  if (!current) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6 p-4">
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

      <div className="text-lg text-gray-500">{current.jp}</div>

      <input
        type="text"
        value={input}
        onChange={handleChange}
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
