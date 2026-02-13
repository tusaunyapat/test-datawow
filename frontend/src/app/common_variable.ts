export const CONCERTS = "concerts";

export const APP_MENU = {
  HOME: "home",
  HISTORY: "history",
  TO_USER: "switch to user",
  TO_ADMIN: "switch to admin",
} as const;

export const RESERVATION_ACTION = {
  RESERVED: "reserved",
  CANCEL: "cancel",
} as const;

export const ROLE = {
  USER: "user",
  ADMIN: "admin",
} as const;

export type AppMenu = (typeof APP_MENU)[keyof typeof APP_MENU];
export type ROLE = (typeof ROLE)[keyof typeof ROLE];
export type ReservationAction =
  (typeof RESERVATION_ACTION)[keyof typeof RESERVATION_ACTION];
