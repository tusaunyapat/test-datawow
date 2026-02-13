export interface ConcertCardProps {
  id: string;
  name: string;
  description?: string;
  totalSeats: number;
  reservedSeat: number;
}

export interface UserConcertCardProps {
  id: string;
  name: string;
  description?: string;
  total: number;
  isReserved: boolean;
}

export interface Concert {
  id: string;
  name: string;
  description?: string;
  totalSeats: number;
  reservedSeat: number;
  createdAt: Date;
  updatedAt: Date;
}
