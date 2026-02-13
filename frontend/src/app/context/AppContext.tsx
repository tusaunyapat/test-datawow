"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { APP_MENU, ROLE } from "../common_variable";
import { useEffect } from "react";
import { Concert, Reservation } from "../type";
import getAllConcerts, { deleteConcert } from "../api/concert";
import { createConcert } from "../api/concert";
import { useCallback } from "react";
import getAllReservations from "../api/reservation";
type MenuType = (typeof APP_MENU)[keyof typeof APP_MENU];
type RoleType = (typeof ROLE)[keyof typeof ROLE];

interface ContextType {
  activeTab: MenuType;
  setActiveTab: (tab: MenuType) => void;

  role: RoleType;
  setRole: (role: RoleType) => void;

  concerts: Concert[] | null;
  setConcerts: (concerts: Concert[]) => void;

  reservations: Reservation[] | null;
  setReservations: (concerts: Reservation[]) => void;

  refreshConcerts: () => Promise<void>;
  refreshReservations: () => Promise<void>;
  addConcert: (
    name: string,
    totalSeats: number,
    description: string,
  ) => Promise<void>;
  removeConcert: (id: string) => void;
}

const AppContext = createContext<ContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<MenuType>(APP_MENU.HOME);
  const [role, setRole] = useState<RoleType>(ROLE.ADMIN);
  const [concerts, setConcerts] = useState<Concert[] | null>([]);
  const [reservations, setReservations] = useState<Reservation[] | null>([]);

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

      console.log("Concert created successfully!");
    } catch (error) {
      console.error("Error creating concert:", error);
      throw error;
    }
  };

  const removeConcert = async (id: string) => {
    try {
      const response = await deleteConcert(id);

      await refreshConcerts();

      console.log("Concert delete successfully!");
    } catch (error) {
      console.error("Error deleting concert:", error);
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
        refreshConcerts,
        addConcert,
        removeConcert,
        refreshReservations,
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
