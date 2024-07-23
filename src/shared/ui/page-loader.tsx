import { Loader2 } from "lucide-react";

export function PageLoader() {
  return (
    <div className="h-[100dvh] w-[100dvw] flex items-center justify-center">
      <Loader2 className="h-24 w-24 animate-spin" />
    </div>
  )
}