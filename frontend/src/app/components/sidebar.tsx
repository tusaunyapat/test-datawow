"use client";
import { ReactNode } from "react";
import { FiHome, FiInbox, FiRefreshCcw, FiLogOut } from "react-icons/fi";
import { APP_MENU } from "../common_variable";
import { useAppContext } from "../context/AppContext";
type MenuType = (typeof APP_MENU)[keyof typeof APP_MENU];
interface NavItemProps {
  label: MenuType;
  icon: ReactNode;
}

function NavItem({ label, icon }: NavItemProps) {
  const { activeTab, setActiveTab } = useAppContext();
  const isActive = label == activeTab;
  return (
    <li
      className={`p-2 mt-2 mx-2 hover:bg-sky-200/50 cursor-pointer transition-colors text-black rounded-md flex items-center gap-3 ${
        isActive ? "bg-sky-700/10  font-medium" : "text-gray-600 "
      }`}
    >
      <button
        onClick={() => setActiveTab(label)}
        className="flex flex-row items-center gap-2"
      >
        <span className="flex items-center text-lg">{icon}</span>
        <span className="text-sm capitalize">{label}</span>
      </button>
    </li>
  );
}

export default function Sidebar() {
  const menuItems = [
    { label: APP_MENU.HOME, icon: <FiHome /> },
    { label: APP_MENU.HISTORY, icon: <FiInbox /> },
    { label: APP_MENU.SWITCH, icon: <FiRefreshCcw /> },
  ];

  return (
    <div className="flex flex-col h-screen bg-white justify-between py-6 border-r border-gray-200">
      <div className="flex flex-col">
        <h1 className="text-2xl text-black font-bold p-4">Admin</h1>
        <ul className="flex flex-col gap-1">
          {menuItems.map((item) => (
            <NavItem key={item.label} label={item.label} icon={item.icon} />
          ))}
        </ul>
      </div>
      <div className="flex flex-col">
        <li
          className={`p-2 mt-2 mx-2 cursor-pointer hover:bg-sky-200/50 transition-colors text-black rounded-md flex items-center gap-3 `}
        >
          <span className="flex items-center text-lg">
            <FiLogOut />
          </span>
          <span className="text-sm capitalize">{"Logout"}</span>
        </li>
      </div>
    </div>
  );
}
