"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

const MIN_WIDTH_PX = 760;


export default function ScreenSizeGate({ children }: { children: ReactNode }) {
  const [isBlocked, setIsBlocked] = useState<boolean | null>(null);

  useEffect(() => {
    const query = `(max-width: ${MIN_WIDTH_PX - 1}px)`;
    const mql = window.matchMedia(query);

    const update = () => setIsBlocked(mql.matches);
    update();

    // Safari fallback: addListener/removeListener
    if ("addEventListener" in mql) {
      mql.addEventListener("change", update);
      return () => mql.removeEventListener("change", update);
    }

    // eslint-disable-next-line deprecation/deprecation
    mql.addListener(update);
    // eslint-disable-next-line deprecation/deprecation
    return () => mql.removeListener(update);
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

