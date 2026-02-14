"use client";
import React from "react";
import UserConcertCard from "./UserConcertCard";
import { useAppContext } from "../context/AppContext";
export default function UserConcertContainer() {
  const { concerts } = useAppContext();
  return (
    <div className="w-full h-full flex flex-col p-8 overflow-hidden">
      {/* Scrollable Grid Area */}
      <div className="flex-1 overflow-y-auto pr-2">
        <div className="flex flex-col gap-8">
          {concerts?.map((concert) => (
            <UserConcertCard key={concert.id} concert={concert} />
          ))}
        </div>
      </div>
    </div>
  );
}
