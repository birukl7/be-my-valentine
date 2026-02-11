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
  "/gifs/he-married-russian.gif",
] as const;

const YES_BUTTON_SIZES = [
  "text-base px-6 py-3",
  "text-lg px-10 py-4",
  "text-xl px-16 py-6",
  "text-2xl px-20 py-8",
  "text-3xl px-24 py-10",
  "text-4xl px-28 py-12",
  "text-5xl px-32 py-14",
  "text-6xl px-36 py-16",
] as const;


export default function Home() {
  const [noStep, setNoStep] = useState(0);
  const [stage, setStage] = useState<"main" | "pattern" | "success">("main");
  const [patternInput, setPatternInput] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const headingText =
    noStep === 3
      ? "Dude is not a white guy pleaszz"
      : noStep === 4
      ? "እምቢ ካልሽ ለrussian እድረዋለው"
      : noStep === 6
      ? "Divorced, Please give him a chance"
      : noStep === 7
      ? "Ahh, He's married russian again.😭😭, still his heart is open"
      : noStep < 5
      ? "Will you be my Valentine?"
      : "he's married russian. Let's give him a chance.";

  useEffect(() => {
    if (noStep === 3) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const audio = new Audio("/voices/white-man.ogg");
      audio.loop = true;
      audioRef.current = audio;
      audio.play().catch(() => {});
      return () => audio.pause();
    }
    if (noStep === 7) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const audio = new Audio("/voices/Tamrat-Desta.mp3");
      audio.loop = true;
      audioRef.current = audio;
      audio.play().catch(() => {});
      return () => audio.pause();
    }
  }, [noStep]);

  useEffect(() => {
    if (stage === "success") {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const audio = new Audio("/voices/Michael-Belayneh.mp3");
      audio.loop = true;
      audioRef.current = audio;
      audio.play().catch(() => {});
      return () => audio.pause();
    }
  }, [stage]);

  function handleNo() {
    if (noStep < 7) {
      setNoStep((s) => s + 1);
    } else {
      const agree = window.confirm("Maybe let's start over?");
      if (agree) window.location.reload();
    }
  }

  function handleYes() {
    setStage("pattern");
  }

  function handlePatternSubmit() {
    if (patternInput === "321475698") {
      setStage("success");
    } else {
      alert("Wrong pattern 😢");
    }
  }

  // SUCCESS SCREEN
  if (stage === "success") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-rose-50 px-6 py-16">
        <Image
          src="/gifs/love-flower.gif"
          alt="love"
          width={300}
          height={300}
          unoptimized
        />

        <h1 className="text-3xl font-bold text-rose-700 text-center">
        ❤️ You're his favorite person in the world.
        </h1>

        <Image
          src="/images/me-wanting.jpg"
          alt="me wanting"
          width={300}
          height={300}
        />

        <p className="text-lg text-gray-700 max-w-[600px] mx-auto">
        There was a time when our chats felt a little dry, and I honestly didn’t like that at all. So I came up with the most random excuse just to talk to you again. I tried approaching you as "a mate,” acting cool, when really I just wanted more moments with you. <br></br>

         I’m so grateful for every small effort I made, every random message, every excuse to say hi. Because somehow, those little things led me here. and you're my valentine, now. Send me the screenshot of this page as your acceptance. I love you. ❤️
        </p>
      </div>
    );
  }

  // PATTERN INPUT SCREEN
  if (stage === "pattern") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-rose-50 px-6 py-16">
        <Image
          src="/images/Profile-1.png"
          alt="profile"
          width={250}
          height={250}
        />

        <h1 className="text-center text-2xl font-semibold text-rose-900">
          place input the mapped number of your phone pattern
        </h1>

        <div className="flex flex-col items-center gap-4">
          <input
            type="text"
            value={patternInput}
            onChange={(e) => setPatternInput(e.target.value)}
            className="rounded-lg border border-rose-300 px-4 py-2 text-lg text-center outline-none focus:border-rose-500 text-rose-800"
            placeholder="Enter pattern number"
          />

          <button
            onClick={handlePatternSubmit}
            className="rounded-full bg-rose-500 px-6 py-3 font-medium text-white transition hover:bg-rose-600"
          >
            Submit
          </button>
        </div>
      </div>
    );
  }

  // MAIN SCREEN
  return (
    <div className="flex min-h-screen items-center justify-center bg-rose-50 font-sans">
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

        <h1 className="text-center text-3xl font-semibold text-rose-900 sm:text-4xl">
          {headingText}
        </h1>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handleYes}
            className={`cursor-pointer rounded-full bg-rose-500 px-6 py-3 font-medium text-white shadow-md transition hover:scale-105 hover:bg-rose-600 active:scale-100 ${YES_BUTTON_SIZES[noStep]}`}
          >
            Yes
          </button>

          <button
            onClick={handleNo}
            className="cursor-pointer rounded-full border-2 border-rose-300 bg-white px-6 py-3 text-base font-medium text-rose-700 transition hover:border-rose-400 hover:bg-rose-50"
          >
            No
          </button>
        </div>
      </main>
    </div>
  );
}
