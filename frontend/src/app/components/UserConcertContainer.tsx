"use client";
import React from "react";
import UserConcertCard from "./UserConcertCard";
export default function UserConcertContainer() {
  const MOCK_USER_CONCERTS = [
    {
      id: "1",
      name: "The festival Int 2024",
      description:
        "Experience the ultimate international music festival with top-tier artists and immersive light shows.",
      total: 500,
      isReserved: false,
    },
    {
      id: "2",
      name: "Jazz in the Park",
      description:
        "A soulful evening under the stars featuring local and international jazz legends.",
      total: 200,
      isReserved: true,
    },
    {
      id: "3",
      name: "Rock Arena Tour",
      description:
        "High-energy rock performances featuring pyrotechnics and legendary anthems.",
      total: 1200,
      isReserved: false,
    },
  ];
  return (
    <div className="w-full h-full flex flex-col p-8 overflow-hidden">
      {/* Scrollable Grid Area */}
      <div className="flex-1 overflow-y-auto pr-2">
        <div className="flex flex-col gap-8">
          {MOCK_USER_CONCERTS.map((concert) => (
            <UserConcertCard key={concert.id} {...concert} />
          ))}
        </div>
      </div>
    </div>
  );
}
