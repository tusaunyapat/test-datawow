"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  APP_MENU,
  ROLE,
  ReservationAction,
  AppMenu,
  Role,
} from "../common_variable";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { Concert, Reservation } from "../type";
import getAllConcerts, { deleteConcert } from "../api/concert";
import { createConcert } from "../api/concert";
import { useCallback } from "react";
import {
  getAllReservations,
  createReservation,
  getAllReservationsByName,
} from "../api/reservation";

interface ContextType {
  activeTab: AppMenu;
  setActiveTab: (tab: AppMenu) => void;

  role: Role;
  setRole: (role: Role) => void;

  concerts: Concert[] | null;
  setConcerts: (concerts: Concert[]) => void;
  addConcert: (
    name: string,
    totalSeats: number,
    description: string,
  ) => Promise<void>;
  removeConcert: (id: string) => void;

  reservations: Reservation[] | null;
  setReservations: (concerts: Reservation[]) => void;

  myReservations: Reservation[] | null;
  setMyReservations: (concerts: Reservation[]) => void;
  addReservation: (
    name: string,
    cid: string,
    action: ReservationAction,
  ) => void;

  refreshConcerts: () => Promise<void>;
  refreshReservations: () => Promise<void>;
  refreshMyReservations: () => Promise<void>;
}

const AppContext = createContext<ContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<AppMenu>(APP_MENU.HOME);
  const [role, setRole] = useState<Role>(ROLE.ADMIN);
  const [concerts, setConcerts] = useState<Concert[] | null>([]);
  const [reservations, setReservations] = useState<Reservation[] | null>([]);
  const [myReservations, setMyReservations] = useState<Reservation[] | null>(
    [],
  );

  const refreshConcerts = useCallback(async () => {
    try {
      const data = await getAllConcerts();
      console.log(data);
      setConcerts(data);
    } catch (error) {
      console.error("Failed to fetch concerts:", error);
    }
  }, []);

  const refreshReservations = useCallback(async () => {
    try {
      const data = await getAllReservations();
      console.log(data);
      setReservations(data);
    } catch (error) {
      console.error("Failed to fetch concerts:", error);
    }
  }, []);

  const refreshMyReservations = useCallback(async () => {
    try {
      const data = await getAllReservationsByName();
      console.log(data);
      setMyReservations(data);
    } catch (error) {
      console.error("Failed to fetch concerts:", error);
    }
  }, []);

  const addConcert = async (
    name: string,
    totalSeats: number,
    description: string,
  ) => {
    try {
      const response = await createConcert({
        name: name,
        totalSeats: totalSeats,
        description: description,
      });

      await refreshConcerts();

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Created successfully",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    } catch (error) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Failed to Create",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      throw error;
    }
  };

  const removeConcert = async (id: string) => {
    try {
      const response = await deleteConcert(id);

      await refreshConcerts();

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Deleted successfully",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    } catch (error) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Failed to Delete",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      throw error;
    }
  };

  const addReservation = async (
    name: string,
    cid: string,
    action: ReservationAction,
  ) => {
    try {
      const response = await createReservation({
        name: name,
        cid: cid,
        action: action,
      });

      console.log(response);

      await refreshReservations();
      await refreshMyReservations();
      if (response.status >= 200 && response.status < 300) {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Created successfully",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      } else {
        // This handles 400 (Bad Request), 401 (Unauthorized), etc.
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title:
            response.status === 400
              ? "Already Reserved"
              : "Something went wrong",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Failed to Reserve",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      throw error;
    }
  };

  useEffect(() => {
    refreshConcerts();
    refreshReservations();
  }, []);

  useEffect(() => console.log("selected tap", activeTab), [activeTab]);
  useEffect(() => console.log("role", role), [role]);

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        role,
        setRole,
        concerts,
        setConcerts,
        reservations,
        setReservations,
        myReservations,
        setMyReservations,
        addReservation,
        refreshConcerts,
        addConcert,
        removeConcert,
        refreshReservations,
        refreshMyReservations,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
}
