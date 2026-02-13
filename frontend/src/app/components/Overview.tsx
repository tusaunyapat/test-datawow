import { ConcertCardProps } from "../type";
import ConcertCard from "./ConcertCard";

export default function Overview() {
  const MOCK_CONCERTS: ConcertCardProps[] = [
    {
      id: "c1",
      name: "Summer Sound Festival 2026",
      description: "The biggest outdoor electronic music event in Bangkok.",
      total: 5000,
      reservedSeat: 4200,
    },
    {
      id: "c2",
      name: "Jazz Night: Blue Note Sessions",
      description: "An intimate evening with world-class jazz musicians.",
      total: 200,
      reservedSeat: 185,
    },
    {
      id: "c3",
      name: "Rock the World: World Tour",
      // description is optional, so we can omit it
      total: 15000,
      reservedSeat: 14500,
    },
    {
      id: "c4",
      name: "Acoustic Vibes",
      description: "Unplugged sessions featuring local indie artists.",
      total: 500,
      reservedSeat: 120,
    },
  ];
  return (
    <div className="w-full h-full flex flex-col pt-4">
      <div className="flex-1 overflow-y-auto pr-2">
        <div className="flex flex-col gap-6">
          {MOCK_CONCERTS.map((concert) => (
            <ConcertCard key={concert.id} {...concert} />
          ))}
        </div>
      </div>
    </div>
  );
}
