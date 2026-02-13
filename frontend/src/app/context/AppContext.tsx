"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { APP_MENU, ROLE } from "../common_variable";
import { useEffect } from "react";

type MenuType = (typeof APP_MENU)[keyof typeof APP_MENU];
type RoleType = (typeof ROLE)[keyof typeof ROLE];

interface ContextType {
  activeTab: MenuType;
  setActiveTab: (tab: MenuType) => void;

  role: RoleType;
  setRole: (role: RoleType) => void;
}

const AppContext = createContext<ContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<MenuType>(APP_MENU.HOME);
  const [role, setRole] = useState<RoleType>(ROLE.ADMIN);

  useEffect(() => console.log("selected tap", activeTab), [activeTab]);
  useEffect(() => console.log("role", role), [role]);
  return (
    <AppContext.Provider value={{ activeTab, setActiveTab, role, setRole }}>
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
