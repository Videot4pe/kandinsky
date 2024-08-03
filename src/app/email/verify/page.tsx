import VerifyEmail from "@/features/auth/ui/verify-email";

// Import the Suspense component from React
import { Suspense } from "react";

// Define the Verify function component
export default function Verify() {
  return (
    // Wrap the VerifyEmail component in a Suspense component.
    // The Suspense component is used to handle asynchronous data loading in React applications.
    // When a component needs to fetch data from an external source (e.g., an API call),
    // it can be wrapped in Suspense
    <Suspense>
      <div className="flex flex-col">
        {/* Render the VerifyEmail component */}
        <VerifyEmail />
      </div>
    </Suspense>
  );
}
