import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center">
      <Button asChild>
        <Link href="/game">Swabee</Link>
      </Button>
    </main>
  );
}
