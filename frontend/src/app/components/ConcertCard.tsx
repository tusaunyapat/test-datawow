import { FiTrash2, FiUser } from "react-icons/fi";
import { Concert } from "../type";
import BaseCard from "./BaseCard";
import { useAppContext } from "../context/AppContext";
import { deleteConcert } from "../api/concert";
export default function ConcertCard({ concert }: { concert: Concert }) {
  const { removeConcert } = useAppContext();
  const handleClickDelete = () => {
    removeConcert(concert.id);
  };
  return (
    <BaseCard title={concert.name}>
      <p className="text-black text-sm w-full">
        {concert.id ?? "No Description"}
      </p>
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-row gap-2 items-center text-black ">
          <FiUser className="text-xl" />
          <span className="text-xs items-end">{concert.totalSeats}</span>
        </div>
        <button
          onClick={handleClickDelete}
          className="bg-red-400 rounded-sm hover:bg-red-600 text-xs px-4 py-2 capitalize flex flex-row gap-2 items-center"
        >
          <FiTrash2 className="text-[1rem]" />
          <span className="text-xs font-semibold">Delete</span>
        </button>
      </div>
    </BaseCard>
  );
}
