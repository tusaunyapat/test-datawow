import { ReactNode } from "react";
interface CalloutProps {
  label: string;
  icon: ReactNode;
  total: number;
  backgroundColor: string;
}

export default function Callout({
  label,
  icon,
  total,
  backgroundColor,
}: CalloutProps) {
  return (
    <div
      className={`w-full sm:w-1/3 flex flex-col items-center gap-2 px-12 py-4 rounded-md ${backgroundColor}`}
    >
      <div className="w-full flex justify-center text-2xl text-white">
        {icon}
      </div>

      <p className="capitalize text-white text-sm">{label}</p>
      <p className="text-5xl text-white font-semibold">{total}</p>
    </div>
  );
}
