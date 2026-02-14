"use client";
import { ReactNode } from "react";
import {
  FiHome,
  FiInbox,
  FiRefreshCcw,
  FiLogOut,
  FiX,
  FiMenu,
} from "react-icons/fi";
import { APP_MENU, ROLE } from "../common_variable";
import { useAppContext } from "../context/AppContext";
import { useState } from "react";
type MenuType = (typeof APP_MENU)[keyof typeof APP_MENU];
interface NavItemProps {
  label: MenuType;
  icon: ReactNode;
}

function NavItem({ label, icon }: NavItemProps) {
  const { activeTab, setActiveTab, role, setRole } = useAppContext();
  const isActive = label == activeTab;
  const handleClick = () => {
    if (label == APP_MENU.HISTORY || label == APP_MENU.HOME) {
      setActiveTab(label);
      return;
    }

    setRole(role == ROLE.ADMIN ? ROLE.USER : ROLE.ADMIN);
    setActiveTab(APP_MENU.HOME);
  };
  return (
    <li
      key={label}
      className={`p-2 mt-2 mx-2 hover:bg-sky-200/50 cursor-pointer transition-colors text-black rounded-md flex items-center gap-3 ${
        isActive ? "bg-sky-700/10  font-medium" : "text-gray-600 "
      }`}
    >
      <button
        onClick={handleClick}
        className="flex flex-row items-center gap-2 w-full"
      >
        <span className="flex items-center text-lg">{icon}</span>
        <span className="text-sm capitalize">{label}</span>
      </button>
    </li>
  );
}

export default function Sidebar() {
  const { role } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <div className="lg:hidden p-4 bg-white border-b border-gray-200 flex justify-start items-center fixed top-0 w-full z-40">
        <button
          onClick={toggleSidebar}
          className="text-2xl text-black p-2 focus:outline-none"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
        <h1 className="text-xl text-black font-bold capitalize">{role}</h1>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-300 ease-in-out border-r border-gray-200
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:relative lg:translate-x-0 lg:flex lg:flex-col h-screen py-6 justify-between
      `}
      >
        <div className="flex flex-col">
          <div className="flex justify-between items-center px-4 mb-4">
            <h1 className="text-2xl text-black font-bold capitalize">{role}</h1>
            <button
              onClick={toggleSidebar}
              className="lg:hidden text-2xl text-black"
            >
              <FiX />
            </button>
          </div>

          <ul className="flex flex-col gap-1" onClick={() => setIsOpen(false)}>
            {" "}
            {/* ปิดเมื่อเลือกเมนู */}
            <NavItem label={APP_MENU.HOME} icon={<FiHome />} />
            <NavItem label={APP_MENU.HISTORY} icon={<FiInbox />} />
            <NavItem
              label={role === ROLE.ADMIN ? APP_MENU.TO_USER : APP_MENU.TO_ADMIN}
              icon={<FiRefreshCcw />}
            />
          </ul>
        </div>

        <div className="flex flex-col border-t border-gray-100 pt-4">
          <li className="p-2 mx-2 cursor-pointer hover:bg-sky-200/50 transition-colors text-black rounded-md flex items-center gap-3">
            <span className="flex items-center text-lg">
              <FiLogOut />
            </span>
            <span className="text-sm capitalize">Logout</span>
          </li>
        </div>
      </div>

      <div className="lg:hidden h-16" />
    </>
  );
}
