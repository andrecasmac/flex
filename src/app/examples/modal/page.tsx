import Modals from "./modals";

export default function Page() {
  return (
    <div className="space-y-5 flex flex-col items-center ">
      <Modals modalPartner={true} ButtonContent="Show Modal" />
    </div>
  );
}
