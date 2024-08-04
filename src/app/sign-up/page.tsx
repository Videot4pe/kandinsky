import { SignupWidget } from "@/widgets/signup-widget";
import { redirect } from "next/navigation";
import { getOauthProviders } from "@/shared/lib/get-available-providers";
import { auth } from "@/shared/lib/auth";
import { ProviderCard } from "@/features/auth/provider/provider-card";

export default async function SignupPage() {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  const oauthProviders = await getOauthProviders();

  return (
    <div className="h-[100dvh] w-full flex flex-col justify-center">
      <SignupWidget>
        {Object.values(oauthProviders).map((provider) => (
          <ProviderCard key={provider.id} provider={provider} type="signup" />
        ))}
      </SignupWidget>
    </div>
  );
}
