export interface ConcertCardProps {
  id: string;
  name: string;
  description?: string;
  total: number;
  reservedSeat: number;
}

export interface UserConcertCardProps {
  id: string;
  name: string;
  description?: string;
  total: number;
  isReserved: boolean;
}
