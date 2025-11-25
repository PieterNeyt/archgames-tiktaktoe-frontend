import type { PlayerMark } from "@/models/game";

interface Props {
  value: PlayerMark;
  onClick: () => void;
}

export default function Cell({ value, onClick }: Props) {
  return (
    <button
      className="
        w-24 h-24 bg-gray-800 text-white text-4xl
        flex items-center justify-center
        rounded-xl hover:bg-gray-700 transition
      "
      onClick={onClick}
    >
      {value && value !== " " ? value : ""}
    </button>
  );
}
