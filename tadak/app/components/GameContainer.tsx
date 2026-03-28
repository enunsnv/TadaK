"use client";
import { useEffect, useState } from "react";
import Splash from "@/app/components/Splash";
import StartScreen from "@/app/components/StartScreen";
import Timer from "@/app/components/Timer";
import GameUI from "./GameUI";
import GameOver from "./GameOver";

export type Word = {
  ko: string;
  jp: string;
};

export default function GameContainer() {
  const [phase, setPhase] = useState<
    "splash" | "ready" | "playing" | "gameover"
  >("splash");

  const [fadeOut, setFadeOut] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [words, setWords] = useState<Word[]>([]);
  const [current, setCurrent] = useState<Word | null>(null);
  const [input, setInput] = useState("");

  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isWrong, setIsWrong] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const [selectedTime, setSelectedTime] = useState(60);

  useEffect(() => {
    setMounted(true);

    fetch("/api/words")
      .then((res) => res.json())
      .then((data) => {
        setWords(data);

        setTimeout(() => setFadeOut(true), 1200);
        setTimeout(() => setPhase("ready"), 1800);
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

    setScore(0);
    setStreak(0);
    setIsRunning(true);
    setPhase("playing");

    setCurrent(getRandomWord(words));
  };

  const handleTimeEnd = () => {
    setIsRunning(false);
    setPhase("gameover");
  };

  const handleChange = (value: string) => {
    if (!isRunning) return;

    if (current && value.length > current.ko.length) return;

    setInput(value);

    if (!current) return;

    if (value.length < current.ko.length) {
      setIsWrong(false);
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

  if (phase === "splash") {
    return <Splash fadeOut={fadeOut} />;
  }

  if (phase === "ready") {
    return (
      <StartScreen
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        onStart={handleStart}
        isReady={words.length > 0}
      />
    );
  }

  if (phase === "gameover") {
    return <GameOver score={score} onRetry={() => setPhase("ready")} />;
  }

  if (!current) return <div>로딩 중...</div>;

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6 p-4">
      <Timer
        duration={selectedTime}
        onEnd={handleTimeEnd}
        isRunning={isRunning}
      />

      <GameUI
        current={current}
        input={input}
        score={score}
        streak={streak}
        isWrong={isWrong}
        isRunning={isRunning}
        onChange={handleChange}
      />
    </div>
  );
}
