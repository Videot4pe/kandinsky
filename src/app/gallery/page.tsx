import { Gallery } from "@/widgets/gallery";
import { Suspense } from "react";
import { Header } from "@/app/header";

export default async function GalleryPage() {
  // const queryClient = new QueryClient({
  //   defaultOptions: {
  //     queries: {
  //       staleTime: 60 * 1000,
  //     },
  //   },
  // });
  // await queryClient.prefetchQuery({
  //   queryKey: ["gallery"],
  //   queryFn: () => getMessages({ orderBy: { createdAt: "desc" } }),
  // });

  return (
    // <HydrationBoundary state={dehydrate(queryClient)}>
    <div className="h-[100dvh] w-full flex flex-col">
      <Header />
      <main className="flex-1 gap-4 overflow-auto p-4">
        <Suspense fallback="Loading gallery...">
          <Gallery />
        </Suspense>
      </main>
    </div>
    // </HydrationBoundary>
  );
}
