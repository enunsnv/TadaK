"use client";

type Props = {
  selectedTime: number;
  setSelectedTime: (time: number) => void;
  onStart: () => void;
  isReady: boolean;
};

const times = [60, 120, 180, 240, 300];

export default function StartScreen({
  selectedTime,
  setSelectedTime,
  onStart,
  isReady,
}: Props) {
  return (
    <div
      className="flex flex-col items-center justify-center h-screen px-4 gap-10
      bg-gradient-to-br from-white to-gray-100
      dark:from-black dark:to-gray-900"
    >
      <h1 className="text-4xl font-bold tracking-widest text-gray-900 dark:text-white">
        TadaK
        <span className="ml-2 text-lg text-gray-400">カチャ</span>
      </h1>

      <div className="flex gap-3 flex-wrap justify-center">
        {times.map((t) => (
          <button
            key={t}
            onClick={() => setSelectedTime(t)}
            className={`
              px-5 py-3 rounded-xl text-sm font-medium transition-all

              backdrop-blur-md
              border

              ${
                selectedTime === t
                  ? "bg-gray-900 text-white dark:bg-white dark:text-black scale-105 shadow-lg"
                  : "bg-white/50 dark:bg-white/10 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:scale-105"
              }
            `}
          >
            {t / 60}분
          </button>
        ))}
      </div>

      <button
        onClick={onStart}
        disabled={!isReady}
        className={`
          px-10 py-4 rounded-2xl text-lg font-semibold transition-all

          ${
            isReady
              ? "bg-gray-900 text-white dark:bg-white dark:text-black hover:scale-105 active:scale-95 shadow-xl"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }
        `}
      >
        게임 시작
      </button>
    </div>
  );
}
