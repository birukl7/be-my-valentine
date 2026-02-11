"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

const MIN_WIDTH_PX = 760;


export default function ScreenSizeGate({ children }: { children: ReactNode }) {
  const [isBlocked, setIsBlocked] = useState<boolean | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsBlocked(window.innerWidth < MIN_WIDTH_PX);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isBlocked === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-rose-50 px-6 py-16">
        <p className="text-center text-base font-medium text-rose-900">
          Loading...
        </p>
      </div>
    );
  }

  if (isBlocked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-rose-50 px-6 py-16">
        <div className="max-w-md text-center">

        <Image
        className="mx-auto"
          src="/gifs/amor-amour.gif"
          alt="love"
          width={200}
          height={200}
          unoptimized
        />
          <p className="text-2xl font-semibold text-rose-900 mt-10">
            hey cutee use your pc please, it doesn&apos;t work on phone.
          </p>
          <p className="mt-3 text-base text-rose-800/80">
            Open this on a screen at least {MIN_WIDTH_PX}px wide.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

