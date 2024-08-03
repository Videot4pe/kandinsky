import { authOptions } from "@/shared/lib/auth";

export async function getAvailableProviders() {
  const providers = authOptions.providers?.map((it) => ({
    name: it.name,
    id: it.id,
    type: it.type,
  }));

  return providers ?? [];
}

export async function getOauthProviders() {
  return (await getAvailableProviders()).filter((it) => it.type === "oauth");
}
