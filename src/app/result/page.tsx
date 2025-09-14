// Mary code here!!!
"use client";
import { useRouter } from "next/navigation";
import Nav from "../_components/nav";
import BgOverlay from "../_components/bgoverlay";
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import PhoneIcon from "../_components/phoneIcon";

export default function Result() {
  const router = useRouter();
  const [resultString, setResultString] = useState<string | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const [colourScheme, setColourScheme] = useState<any>({});
  const [character, setCharacter] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>("+61");
  const callMutation = api.ai.callSomeone.useMutation();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedResult = sessionStorage.getItem("processedResultString");
      const storedCharacter = sessionStorage.getItem("character");

      if (storedResult && storedCharacter) {
        setResultString(storedResult);
        setCharacter(storedCharacter);
      } else {
        void router.replace("/excuse");
      }

      const backgrounds = [
        {
          bg: "url('/images/imlate-bg1.jpg')",
          scheme: {
            sorryBox: "bg-gradient-to-br from-purple-700 to-[#9A5DCC]",
            responseBox:
              "bg-white/95 border-l-4 border-purple-400 shadow-purple-900/80",
            button: "bg-gradient-to-br from-purple-700 to-[#9A5DCC]",
          },
        },
        {
          bg: "url('/images/imlate-bg2.jpg')",
          scheme: {
            sorryBox: "bg-gradient-to-br from-orange-700 to-red-900",
            responseBox:
              "bg-white/95 border-l-4 border-red-400 shadow-red-900/80",
            button: "bg-gradient-to-br from-orange-700 to-red-900",
          },
        },
        {
          bg: "url('/images/imlate-bg3.jpg')",
          scheme: {
            sorryBox: "bg-gradient-to-br from-[#316532] to-[#4FA050]",
            responseBox:
              "bg-white/95 border-l-4 border-[#4FA050] shadow-green-900/80",
            button: "bg-gradient-to-br from-[#316532] to-[#4FA050]",
          },
        },
      ];

      const randomScheme =
        backgrounds[Math.floor(Math.random() * backgrounds.length)]!;
      setBackgroundImage(randomScheme.bg);
      setColourScheme(randomScheme.scheme);
    }
  }, []);

  return (
    <div
      className="relative min-h-screen bg-blue-500"
      style={{
        backgroundImage: backgroundImage,
        backgroundSize: "100% 95%",
        backgroundPosition: "center 50px",
      }}
    >
      <BgOverlay />
      <Nav />

      {/* ai-generated excuse */}
      <main className="relative z-10 mx-auto mt-[70px] flex min-h-[15vh] gap-15 px-16">
        <div
          className={`flex w-80 items-center justify-center ${colourScheme.sorryBox || "bg-gradient-to-br from-gray-600 to-gray-900"} rounded-lg p-4 text-white shadow-2xl shadow-black/40 drop-shadow-2xl`}
        >
          <p className="font-brush mt-0.5 -rotate-[3deg] text-[3.5rem] leading-tight font-bold">
            <span className="block">SORRY</span>
            <span className="-ml-2 block">GUYS...!</span>
          </p>
        </div>

        <div
          className={`flex-1 ${colourScheme.responseBox || "bg-white"} rounded-lg p-6 text-lg leading-relaxed font-light tracking-wide shadow-lg shadow-black/50 drop-shadow-2xl`}
        >
          {resultString || "LOADING..."}
        </div>
      </main>

      <aside className="fixed bottom-16 left-16 z-40 w-50">
        <button
          className={`px-6 py-3 ${colourScheme.button || "bg-black"} w-full cursor-pointer rounded-lg font-semibold text-white shadow-2xl shadow-black/50 drop-shadow-2xl duration-200 hover:scale-105 hover:transition-all`}
          onClick={() => {
            router.push("/excuse");
          }}
        >
          TRY AGAIN?
        </button>
      </aside>

      <div className="fixed right-16 bottom-16 z-40">
        <div className="flex items-end gap-4">
          <input
            type="text"
            placeholder="Phone Number"
            className={`${colourScheme.responseBox} h-12 rounded-lg border-1 p-2 text-lg font-light tracking-wide shadow-lg shadow-black/50 drop-shadow-2xl`}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <div
            onClick={() => {
              callMutation.mutate({
                text: resultString!,
                character: character!,
                phoneNumber: phoneNumber,
              });
            }}
            className={`${colourScheme.button || "bg-black"} mt-4 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-white shadow-2xl shadow-black/50 drop-shadow-2xl duration-200 hover:scale-105 hover:transition-all`}
          >
            <PhoneIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
