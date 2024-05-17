import Badge  from "@/components/badge";

export default function Page() {
  return (
    <div className="flex gap-x-4">
      <Badge label="In Process"/>
      <Badge label="Complete"/>
      <Badge label="Cancelled"/>
      <Badge label="Anything Else"/>
    </div>
  );
}
