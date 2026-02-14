"use client";
import { useAppContext } from "./context/AppContext";
import Homepage from "./components/Homepage";
import { APP_MENU } from "./common_variable";
import History from "./components/History";
import { ROLE } from "./common_variable";
import UserConcertContainer from "./components/UserConcertContainer";
export default function Home() {
  const { activeTab, role } = useAppContext();
  return (
    <div className="h-screen w-full flex flex-col font-sans dark:bg-black overflow-hidden">
      <main className="flex-1 bg-gray-100 overflow-y-auto">
        {activeTab === APP_MENU.HOME && <Homepage />}
        {activeTab === APP_MENU.HISTORY && <History />}
      </main>
    </div>
  );
}
