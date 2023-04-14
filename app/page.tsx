import { Suspense } from "react";
import { TemplateView } from "../components/template";

export default async function Home() {
  return (
    <main className="flex justify-center mt-2">
      <Suspense>
        <TemplateView />
      </Suspense>
    </main>
  );
}
