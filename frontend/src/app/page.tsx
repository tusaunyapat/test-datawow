"use client";
import { useAppContext } from "./context/AppContext";
import Homepage from "./components/Homepage";
import { APP_MENU } from "./common_variable";

export default function Home() {
  const { activeTab } = useAppContext();
  return (
    <div className="h-screen w-full flex flex-col font-sans dark:bg-black overflow-hidden">
      <main className="flex-1 bg-gray-100 overflow-y-auto">
        {activeTab === APP_MENU.HOME && <Homepage />}
        {activeTab === APP_MENU.HISTORY && <div>History View</div>}
      </main>
    </div>
  );
}
