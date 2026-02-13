"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { APP_MENU } from "../common_variable";
import { useEffect } from "react";

type MenuType = (typeof APP_MENU)[keyof typeof APP_MENU];

interface ContextType {
  activeTab: MenuType;
  setActiveTab: (tab: MenuType) => void;
}

const AppContext = createContext<ContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<MenuType>(APP_MENU.HOME);

  useEffect(() => console.log("selected tap", activeTab), [activeTab]);
  return (
    <AppContext.Provider value={{ activeTab, setActiveTab }}>
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
