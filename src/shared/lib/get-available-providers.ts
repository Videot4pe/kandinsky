import { getProviders } from "next-auth/react";

export async function getAvailableProviders() {
  const providers = await getProviders();

  return providers ?? [];
}
