import { FiTrash2, FiUser } from "react-icons/fi";
import { UserConcertCardProps } from "../type";
import BaseCard from "./BaseCard";
export default function UserConcertCard({
  id,
  name,
  description,
  total,
  isReserved,
}: UserConcertCardProps) {
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
        <button
          className={`${
            isReserved ? "bg-red-500" : "bg-blue-500"
          } hover:opacity-90 transition-opacity rounded-sm text-white text-xs px-4 py-2 capitalize flex flex-row gap-2 items-center`}
        >
          <span className="text-xs font-semibold">
            {isReserved ? "Cancel" : "Reserve"}
          </span>
        </button>
      </div>
    </BaseCard>
  );
}
