import CalloutContainer from "./CalloutContainer";
import AdminTools from "./AdminTools";
import { useAppContext } from "../context/AppContext";
import { ROLE } from "../common_variable";
import UserConcertContainer from "./UserConcertContainer";
export default function Homepage() {
  const { role } = useAppContext();
  return (
    <div className="flex flex-col py-12 px-4 gap-6">
      {role == ROLE.USER ? (
        <UserConcertContainer />
      ) : (
        <>
          <CalloutContainer />
          <AdminTools />
        </>
      )}
    </div>
  );
}
