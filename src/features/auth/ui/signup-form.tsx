import { Label } from "@/shared/ui/label";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";

export function SignupForm() {
  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="first-name">First name</Label>
          <Input id="first-name" placeholder="Max" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="last-name">Last name</Label>
          <Input id="last-name" placeholder="Robinson" required />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="m@example.com" required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" />
      </div>
      <Button type="submit" className="w-full">
        Create an account
      </Button>
    </div>
  );
}
