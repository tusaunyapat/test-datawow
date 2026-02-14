import { RESERVATION_ACTION } from "../common_variable";
import { useAppContext } from "../context/AppContext";
import Callout from "./Callout";
import { FiUser, FiXCircle, FiAward } from "react-icons/fi";

export default function CalloutContainer() {
  const { reservations, concerts } = useAppContext();
  const total_seat = concerts?.reduce((sum, concert) => {
    return sum + (concert.totalSeats || 0); // Ensure fallback to 0 if property is missing
  }, 0);

  // 2. Count total "RESERVE" actions
  const reserve = reservations?.filter(
    (res) => res.action === RESERVATION_ACTION.RESERVED,
  ).length;

  // 3. Count total "CANCEL" actions
  const cancel = reservations?.filter(
    (res) => res.action === RESERVATION_ACTION.CANCEL,
  ).length;

  return (
    <div className="flex flex-row gap-2 justify-between w-full">
      <Callout
        label="total of seats"
        total={total_seat ?? 0}
        icon={<FiUser />}
        backgroundColor="bg-sky-700"
      />
      <Callout
        label="reserve"
        total={reserve ?? 0}
        icon={<FiAward />}
        backgroundColor="bg-teal-600"
      />
      <Callout
        label="Cancel"
        total={cancel ?? 0}
        icon={<FiXCircle />}
        backgroundColor="bg-red-400"
      />
    </div>
  );
}
