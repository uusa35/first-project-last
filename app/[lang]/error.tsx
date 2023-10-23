"use client";
import Link from "next/link";
import SamplePage from "@/appImages/logo.png";
import Image from "next/image";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);
  return (
    <main className='relative isolate mx-auto flex flex-col gap-y-6 justify-center items-center max-w-7xl min-h-screen capitalize'>
      <Image src={SamplePage} alt={"error"} width={100} height={100} />
      <div>
        <Link href={`/en`} className='text-xl'>
          home
        </Link>
      </div>
    </main>
  );
}
