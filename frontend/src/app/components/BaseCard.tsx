import { ReactNode } from "react";

interface BaseCardProps {
  title: string;
  children: ReactNode;
}

export default function BaseCard({ title, children }: BaseCardProps) {
  return (
    <div className="rounded-md border border-gray-300 w-full flex flex-col gap-3 p-6 bg-white">
      <h1 className="text-sky-600 font-semibold text-xl">{title}</h1>
      <hr />
      {children}
    </div>
  );
}
