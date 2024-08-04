import { SignupWidget } from "@/widgets/signup-widget";
import { redirect } from "next/navigation";
import { getOauthProviders } from "@/shared/lib/get-available-providers";
import { ProviderButton } from "@/features/auth/ui/provider-button";
import { auth } from "@/shared/lib/auth";

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
          <ProviderButton key={provider.id} provider={provider} type="signup" />
        ))}
      </SignupWidget>
    </div>
  );
}
