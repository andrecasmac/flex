import { PageTitle } from "@/components/page-title";
import MultipleTagsInput from "./multiple-tags";
import { Label } from "@/components/ui/label";

const defaultTags = ["tag1", "tag2", "tag3", "tag4"];

export default function Page() {
  return (
    <>
      <PageTitle title="Multiple tags" />
      <div className="space-y-5 flex flex-col items-center w-[80%]">


          <MultipleTagsInput PreviousTags={defaultTags} />

      </div>
    </>
  );
}
