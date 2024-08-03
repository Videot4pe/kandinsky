import { SignupWidget } from "@/widgets/signup-widget";
import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/api/auth-options";
import { redirect } from "next/navigation";
import { getAvailableProviders } from "@/shared/lib/get-available-providers";
import { ProviderBtn } from "@/features/auth/ui/provider-btn";

export default async function SignupPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  const providers = await getAvailableProviders();

  return (
    <div className="h-[100dvh] w-full flex flex-col justify-center">
      <SignupWidget>
        {Object.values(providers).map((provider) => (
          <ProviderBtn key={provider.id} provider={provider} type="signup" />
        ))}
      </SignupWidget>
    </div>
  );
}
