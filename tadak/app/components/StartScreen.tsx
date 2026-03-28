"use client";

type Props = {
  selectedTime: number;
  setSelectedTime: (time: number) => void;
  onStart: () => void;
  isReady: boolean; // ✅ 추가
};

export default function StartScreen({
  selectedTime,
  setSelectedTime,
  onStart,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      <h1 className="text-3xl font-bold">타닥 カチャ</h1>

      <select
        value={selectedTime}
        onChange={(e) => setSelectedTime(Number(e.target.value))}
        className="border p-3 rounded"
      >
        <option value={60}>1분</option>
        <option value={120}>2분</option>
        <option value={180}>3분</option>
        <option value={240}>4분</option>
        <option value={300}>5분</option>
      </select>

      <button
        onClick={onStart}
        className="px-6 py-3 bg-blue-500 text-white rounded text-lg"
      >
        게임 시작 🚀
      </button>
    </div>
  );
}
