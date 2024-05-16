import Modals from ".";

export default function Page() {
  return (
    <div className="space-y-5 flex flex-col items-center ">
      <Modals modalPartner={true} />
      <Modals modalTest={true} />
    </div>
  );
}
