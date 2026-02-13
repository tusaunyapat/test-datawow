import { FiTrash2, FiUser } from "react-icons/fi";
import { ConcertCardProps } from "../type";
import BaseCard from "./BaseCard";
export default function ConcertCard({
  id,
  name,
  description,
  total,
  reservedSeat,
}: ConcertCardProps) {
  return (
    <BaseCard title={name}>
      <p className="text-black text-sm w-full">
        {description ?? "No Description"}
      </p>
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-row gap-2 items-center text-black ">
          <FiUser className="text-xl" />
          <span className="text-xs items-end">{total}</span>
        </div>
        <button className="bg-red-400 rounded-sm  text-xs px-4 py-2 capitalize flex flex-row gap-2 items-center">
          <FiTrash2 className="text-[1rem]" />
          <span className="text-xs font-semibold">Delete</span>
        </button>
      </div>
    </BaseCard>
  );
}
