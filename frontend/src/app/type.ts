import { RESERVATION_ACTION, ReservationAction } from "./common_variable";
type ReservationType =
  (typeof RESERVATION_ACTION)[keyof typeof RESERVATION_ACTION];

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

export interface Reservation {
  id: string;
  name: string;
  cid: string;
  action: ReservationType;
  createdAt: Date;
}
