export const APP_MENU = {
  HOME: "home",
  HISTORY: "history",
  SWITCH: "switch",
} as const;

export const RESERVATION_ACTION = {
  RESERVED: "reserved",
  CANCEL: "cancel",
} as const;

export type AppMenu = (typeof APP_MENU)[keyof typeof APP_MENU];
export type ReservationAction =
  (typeof RESERVATION_ACTION)[keyof typeof RESERVATION_ACTION];
