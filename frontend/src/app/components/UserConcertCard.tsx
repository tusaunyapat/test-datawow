import { FiTrash2, FiUser } from "react-icons/fi";
import { Concert, UserConcertCardProps } from "../type";
import BaseCard from "./BaseCard";
import { useAppContext } from "../context/AppContext";
import { RESERVATION_ACTION } from "../common_variable";
export default function UserConcertCard({ concert }: { concert: Concert }) {
  const { reservations, addReservation } = useAppContext();
  const latestReservation = reservations
    ?.filter((res) => res.cid === concert.id)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )[0];
  const isReserved = latestReservation?.action == RESERVATION_ACTION.RESERVED;

  const handleClick = async () => {
    console.log("clic reserve");
    if (isReserved) {
      await addReservation("user", concert.id, RESERVATION_ACTION.CANCEL);
      return;
    }
    await addReservation("user", concert.id, RESERVATION_ACTION.RESERVED);
  };
  return (
    <BaseCard title={concert.name}>
      <p className="text-black text-sm w-full">
        {concert.description ?? "No Description"}
      </p>
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-row gap-2 items-center text-black ">
          <FiUser className="text-xl" />
          <span className="text-xs items-end">{concert.totalSeats}</span>
        </div>
        <button
          onClick={handleClick}
          className={`transition-color duration-150 ${
            isReserved
              ? "bg-red-500 hover:bg-red-700"
              : "bg-blue-500 hover:bg-blue-700"
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
