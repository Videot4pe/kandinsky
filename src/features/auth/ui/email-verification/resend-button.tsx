import { useFormStatus } from "react-dom";
import { Button } from "@/shared/ui/button";
import { Loader2 } from "lucide-react";

export default function ResendButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="secondary"
      className="w-full"
      disabled={pending}
    >
      {pending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
      Resend verification link{pending ? "..." : ""}
    </Button>
  );
}
