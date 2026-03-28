"use client";

import { useState, useEffect } from "react";

export default function Typing() {
  const [text, setText] = useState("사과를 먹어요");
  const [input, setInput] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    if (input.length === 0) {
      setIsCorrect(null);
      return;
    }
    setIsCorrect(text.startsWith(input));
  }, [input, text]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleReset = () => {
    setInput("");
    setIsCorrect(null);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6 p-4">
      {/* 문제 문장 */}
      <div className="text-2xl font-bold">
        {text.split("").map((char, idx) => {
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

      {/* 입력창 */}
      <input
        type="text"
        value={input}
        onChange={handleChange}
        className="border p-3 text-lg w-full max-w-md rounded"
        placeholder="여기에 입력하세요..."
      />

      {/* 결과 메시지 */}
      {isCorrect === false && <p className="text-red-500">틀렸어요 ❌</p>}
      {input === text && <p className="text-green-500">정답입니다! 🎉</p>}

      {/* 리셋 버튼 */}
      <button
        onClick={handleReset}
        className="bg-black text-white px-4 py-2 rounded"
      >
        다시하기
      </button>
    </div>
  );
}
