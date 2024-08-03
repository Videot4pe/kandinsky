import NextAuth from "next-auth";
import { authOptions } from "@/shared/api/auth-options";

// Exporting the authentication middleware using NextAuth and the provided configuration
export default NextAuth(authOptions).auth;

// Additional configuration for the middleware
export const config = {
  // Defining a matcher to specify routes where the middleware should be applied
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
