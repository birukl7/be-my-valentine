"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

const MIN_WIDTH_PX = 760;

const IMAGE_ASSETS = [
  // Main GIF steps
  "/gifs/will-you-be-my-valentine.gif",
  "/gifs/are-you-sure-about-that-the-rock.gif",
  "/gifs/are-you-sure.gif",
  "/gifs/okay-black-guy.gif",
  "/gifs/he-will-marry-russian.gif",
  "/gifs/he-married-russian.gif",
  "/gifs/divorce-divorce-papers.gif",
  "/gifs/he-married-russian.gif",
  // Success screen + pattern screen
  "/gifs/love-flower.gif",
  "/images/me-wanting.jpg",
  "/images/Profile-1.png",
  // Mobile gate GIF
  "/gifs/amor-amour.gif",
] as const;

const AUDIO_ASSETS = [
  "/voices/white-man.ogg",
  "/voices/Tamrat-Desta.mp3",
  "/voices/Michael-Belayneh.mp3",
] as const;

const TOTAL_ASSETS = IMAGE_ASSETS.length + AUDIO_ASSETS.length;

export default function ScreenSizeGate({ children }: { children: ReactNode }) {
  const [isBlocked, setIsBlocked] = useState<boolean | null>(null);
  const [assetsReady, setAssetsReady] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);

  // Track screen width
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

  // Preload all images, gifs and audio
  useEffect(() => {
    if (TOTAL_ASSETS === 0) {
      setAssetsReady(true);
      return;
    }

    let cancelled = false;
    let completed = 0;

    const handleDone = () => {
      if (cancelled) return;
      completed += 1;
      setLoadedCount(completed);
      if (completed === TOTAL_ASSETS) {
        setAssetsReady(true);
      }
    };

    IMAGE_ASSETS.forEach((src) => {
      const img = new window.Image();
      img.onload = handleDone;
      img.onerror = handleDone;
      img.src = src;
    });

    AUDIO_ASSETS.forEach((src) => {
      const audio = new Audio();
      const onReady = () => {
        audio.removeEventListener("canplaythrough", onReady);
        audio.removeEventListener("error", onReady);
        handleDone();
      };
      audio.addEventListener("canplaythrough", onReady);
      audio.addEventListener("error", onReady);
      audio.src = src;
      audio.load();
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const progress =
    TOTAL_ASSETS > 0 ? Math.round((loadedCount / TOTAL_ASSETS) * 100) : 0;

  // While we don't know width yet OR assets are still loading, show loading screen
  if (!assetsReady || isBlocked === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-rose-50 px-6 py-16">
        <div className="max-w-md text-center">
          <p className="text-2xl font-semibold text-rose-900">
            Getting everything ready for you...
          </p>
          <p className="mt-3 text-base text-rose-800/80">
            Loading {loadedCount} / {TOTAL_ASSETS} surprises ({progress}%)
          </p>
        </div>
      </div>
    );
  }

  // Mobile / small screens blocked
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
          <p className="mt-10 text-2xl font-semibold text-rose-900">
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

