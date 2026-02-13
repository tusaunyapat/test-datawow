import { useAppContext } from "../context/AppContext";
import ConcertCard from "./ConcertCard";

export default function Overview() {
  const { concerts } = useAppContext();
  return (
    <div className="w-full h-full flex flex-col pt-4">
      <div className="flex-1 overflow-y-auto pr-2">
        <div className="flex flex-col gap-6">
          {concerts?.map((concert) => (
            <ConcertCard key={concert.id} concert={concert} />
          ))}
        </div>
      </div>
    </div>
  );
}
