import Callout from "./Callout";
import { FiUser, FiXCircle, FiAward } from "react-icons/fi";

export default function CalloutContainer() {
  const total_seat = 500;
  const reserve = 120;
  const cancel = 12;

  return (
    <div className="flex flex-row gap-2 justify-between w-full">
      <Callout
        label="total of seats"
        total={total_seat}
        icon={<FiUser />}
        backgroundColor="bg-sky-700"
      />
      <Callout
        label="reserve"
        total={reserve}
        icon={<FiAward />}
        backgroundColor="bg-teal-600"
      />
      <Callout
        label="Cancel"
        total={cancel}
        icon={<FiXCircle />}
        backgroundColor="bg-red-400"
      />
    </div>
  );
}
