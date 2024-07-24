import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { SignBtn } from "@/features/auth/ui/sign-btn";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/ui/sheet";
import { Menu } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export function Header({ children }: { children?: any }) {
  return (
    <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
      <div className="w-full flex justify-between">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <h1 className="text-xl font-semibold self-center">Kandinsky</h1>
          </Link>
          <Link
            href="/"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Home
          </Link>
          <Link
            href="/gallery"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Gallery
          </Link>
        </nav>
        <div className="flex">
          <Sheet>
            <SheetTitle>
              <VisuallyHidden>Menu</VisuallyHidden>
            </SheetTitle>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden mr-2"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetDescription>
                  <VisuallyHidden>Side menu</VisuallyHidden>
                </SheetDescription>
              </SheetHeader>
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-lg font-semibold md:text-base"
                >
                  <h1 className="text-xl font-semibold self-center">
                    Kandinsky
                  </h1>
                </Link>
                <Link
                  href="/"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Home
                </Link>
                <Link
                  href="/gallery"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Gallery
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          {children}
        </div>
        <SignBtn />
      </div>
    </header>
  );
}
