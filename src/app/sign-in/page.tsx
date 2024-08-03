import { SigninWidget } from "@/widgets/signin-widget";
import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/api/auth-options";
import { ProviderBtn } from "@/features/auth/ui/provider-btn";
import { redirect } from "next/navigation";
import { getAvailableProviders } from "@/shared/lib/get-available-providers";

export default async function SignIn() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  const providers = await getAvailableProviders();

  return (
    <>
      <div className="h-[100dvh] w-full flex flex-col justify-center">
        <SigninWidget>
          {Object.values(providers).map((provider) => (
            <ProviderBtn key={provider.id} provider={provider} type="signin" />
          ))}
        </SigninWidget>
      </div>
    </>
  );
}
