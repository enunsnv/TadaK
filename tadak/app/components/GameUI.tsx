import { Word } from "./GameContainer";
import { decompose } from "@/app/utils/hangul";

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
    <>
      <div className="flex gap-6 text-lg font-semibold">
        <span>점수: {score}</span>
        <span>🔥 {streak}</span>
      </div>

      <div className="text-2xl font-bold">
        {current.ko.split("").map((char, idx) => {
          let color = "text-gray-400";

          if (idx < input.length) {
            const inputChar = input[idx];

            const target = decompose(char).join("");
            const typed = decompose(inputChar).join("");

            if (target.startsWith(typed)) {
              color = "text-gray-700";
            } else {
              color = "text-red-700";
            }
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
        key={current.ko}
        type="text"
        value={input}
        onChange={(e) => onChange(e.target.value)}
        disabled={!isRunning}
        className={`border p-3 text-lg w-full max-w-md rounded transition ${
          isWrong ? "border-red-500" : "border-gray-300"
        }`}
        placeholder="여기에 입력하세요..."
      />

      <div className="h-6">
        {isFilled && isCorrect && (
          <p className="text-green-500">정답입니다! 🎉</p>
        )}
      </div>
    </>
  );
}
