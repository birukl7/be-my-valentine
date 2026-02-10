"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const GIFS = [
  "/gifs/will-you-be-my-valentine.gif",
  "/gifs/are-you-sure-about-that-the-rock.gif",
  "/gifs/are-you-sure.gif",
  "/gifs/okay-black-guy.gif",
  "/gifs/he-will-marry-russian.gif",
  "/gifs/he-married-russian.gif",
  "/gifs/divorce-divorce-papers.gif",
  "/gifs/he-married-russian.gif", // 👈 married again
] as const;


const NO_BUTTON_TEXTS = [
  "No",
  "Noo!",
  "NO!",
  "Dude is not a very light skin man pleazzz",
  "No",
  "No",
  "No",
  "No",
] as const;


const YES_BUTTON_SIZES = [
  "text-base px-6 py-3",
  "text-lg px-12 py-6",
  "text-xl px-24 py-12",
  "text-xl px-24 py-12",
  "text-2xl px-48 py-24",
  "text-2xl px-52 py-26",
  "text-2xl px-56 py-28",
  "text-2xl px-60 py-30",
] as const;

export default function Home() {
  const [noStep, setNoStep] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const headingText =
  noStep === 3
    ? "Dude is not a white guy pleaszz"
    : noStep === 4
    ? "እምቢ ካልሽ ለrussian እድረዋለው"
    : noStep === 6
    ? "Divorced, Please give him a chance"
    : noStep === 7
    ? "Ahh, He's married russian again.😭😭"
    : noStep < 5
    ? "Will you be my Valentine?"
    : "he's married russian. Let's give him a chance.";


  useEffect(() => {
    if (noStep === 3) {
      const audio = new Audio("/voices/white-man.ogg");
      audioRef.current = audio;
      audio.play().catch(() => {});
      return () => {
        audio.pause();
      };
    }
    if (noStep === 7) {
      const audio = new Audio("/voices/Tamrat-Desta.mp3");
      audioRef.current = audio;
      audio.play().catch(() => {});
      return () => {
        audio.pause();
      };
    }
  }, [noStep]);

  function handleNo() {
    if (noStep < 7) {
      setNoStep((s) => s + 1);
    } else {
      const agree = window.confirm("Maybe let's start over?");
      if (agree) {
        window.location.reload();
      }
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-rose-50 font-sans dark:bg-rose-950/30">
      <main className="flex min-h-screen w-full max-w-2xl flex-col items-center justify-center gap-8 px-6 py-16">
        <div className="relative w-full max-w-sm overflow-hidden rounded-lg">
          <Image
            src={GIFS[noStep]}
            alt=""
            width={400}
            height={300}
            className="h-auto w-full object-contain"
            unoptimized
          />
        </div>

        <h1 className="text-center text-3xl font-semibold tracking-tight text-rose-900 dark:text-rose-100 sm:text-4xl">
          {headingText}
        </h1>

        <div className="flex  items-center justify-center gap-4 ">
          <button
            type="button"
            onClick={() => {}}
            className={`cursor-pointer rounded-full bg-rose-500 font-medium text-white shadow-md transition hover:scale-105 hover:bg-rose-600 active:scale-100 ${YES_BUTTON_SIZES[noStep]}`}
          >
            Yes
          </button>

          <button
            type="button"
            onClick={handleNo}
            className="cursor-pointer rounded-full border-2 border-rose-300 bg-white px-6 py-3 text-base font-medium text-rose-700 transition hover:border-rose-400 hover:bg-rose-50 dark:border-rose-600 dark:bg-rose-900/30 dark:text-rose-200 dark:hover:bg-rose-900/50"
          >
            {noStep === 3 ? "No" : NO_BUTTON_TEXTS[noStep]}
          </button>
        </div>
      </main>
    </div>
  );
}
