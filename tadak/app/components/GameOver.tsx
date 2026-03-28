"use client";

import Image from "next/image";

export default function GameOver({
  score,
  onRetry,
}: {
  score: number;
  onRetry: () => void;
}) {
  const getMessage = () => {
    if (score >= 200) return "🔥 대단해요！すごい！";
    if (score >= 100) return "👏 잘했어요！いいね！";
    if (score >= 50) return "👍 괜찮아요！いい感じ！";
    return "🙂 다시 도전！もう一度！";
  };

  const isHighScore = score >= 50;

  const imgIndex = Math.floor(Math.random() * 5) + 1;

  const imgFiles = isHighScore
    ? [
        "correct-1.jpg",
        "correct-2.gif",
        "correct-3.jpg",
        "correct-4.jpg",
        "correct-5.png",
      ]
    : [
        "wrong-1.png",
        "wrong-2.jpg",
        "wrong-3.jpg",
        "wrong-4.jpg",
        "wrong-5.jpg",
      ];

  const imgFile = imgFiles[imgIndex - 1];

  const isGif = imgFile.endsWith(".gif");

  return (
    <div
      className="
        h-screen flex items-center justify-center
        bg-gradient-to-br from-white to-gray-100
        dark:from-black dark:to-gray-900
      "
    >
      <div
        className="
          w-full max-w-md p-10
          rounded-2xl
          bg-white/70 dark:bg-white/10
          backdrop-blur-lg
          border border-gray-200 dark:border-gray-700
          shadow-xl
          flex flex-col items-center gap-6
        "
      >
        {/* 타이틀 */}
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          게임 종료 🎉
        </h2>

        {/* 점수 */}
        <div className="text-5xl font-bold text-gray-900 dark:text-white">
          {score}
        </div>

        <div className="w-80 h-80 relative">
          {isGif ? (
            <img
              src={`/${isHighScore ? "correct" : "wrong"}/${imgFile}`}
              alt={isHighScore ? "잘했어요" : "아쉬워요"}
              className="object-contain w-full h-full rounded-lg shadow-lg"
            />
          ) : (
            <Image
              src={`/${isHighScore ? "correct" : "wrong"}/${imgFile}`}
              alt={isHighScore ? "잘했어요" : "아쉬워요"}
              fill
              className="object-contain rounded-lg shadow-lg"
            />
          )}
        </div>

        {/* 메시지 */}
        <p className="text-gray-500 dark:text-gray-400 text-center">
          {getMessage()}
        </p>

        {/* 버튼 */}
        <button
          onClick={onRetry}
          className="
            mt-4
            px-8 py-3
            rounded-xl
            font-medium
            transition-all

            bg-gray-900 text-white
            dark:bg-white dark:text-black

            hover:scale-105 active:scale-95
            shadow-lg
          "
        >
          다시 하기 / もう一度
        </button>

        {/* 서브 텍스트 */}
        <p className="text-xs text-gray-400">
          계속 연습해봐요 ⚡ / 練習を続けよう
        </p>
      </div>
    </div>
  );
}
