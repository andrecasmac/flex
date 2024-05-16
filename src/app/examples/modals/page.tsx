import { Button } from "@/components/ui/button";


export default function Page() {
    return(
        <div className="flex flex-col items-center justify-between pt-20">
            <Button
                asChild
                variant="default"
                size="lg"
                className="rounded-2xl active:scale-95 transition-all"
            >
                <a href="/examples/modals/upload-document">Upload Document</a>
            </Button>
        </div>
    )
}