import CalloutContainer from "./CalloutContainer";
import AdminTools from "./AdminTools";
export default function Homepage() {
  return (
    <div className="flex flex-col py-12 px-4 gap-6">
      <CalloutContainer />
      <AdminTools />
    </div>
  );
}
