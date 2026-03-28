export default function GameOver({
  score,
  onRetry,
}: {
  score: number;
  onRetry: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h2 className="text-2xl font-bold">게임 종료 🎉</h2>
      <p className="text-lg">최종 점수: {score}</p>
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        다시 하기
      </button>
    </div>
  );
}