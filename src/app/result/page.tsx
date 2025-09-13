// Mary code here!!!
"use client";
import { useRouter } from "next/navigation";
import Nav from "../_components/nav";
import { useEffect, useState } from "react";

export default function Result() {
  const router = useRouter();
  const [resultString, setResultString] = useState<string | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const [colourScheme, setColourScheme] = useState<any>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedResult = sessionStorage.getItem("processedResultString");

      if (storedResult) {
        setResultString(storedResult);
      } else {
        void router.replace("/aiexample"); // note : change later to actual form page
      }

      const backgrounds = [
        {
          bg: "url('/images/imlate-bg1.jpg')",
          scheme: {
            sorryBox: "bg-gradient-to-br from-purple-700 to-[#9A5DCC]",
            responseBox: "bg-white/95 border-l-4 border-purple-400 shadow-purple-900/80",
            button: "bg-gradient-to-br from-purple-700 to-[#9A5DCC]"
          }
        },
        {
          bg: "url('/images/imlate-bg2.jpg')",
          scheme: {
            sorryBox: "bg-gradient-to-br from-orange-700 to-red-900",
            responseBox: "bg-white/95 border-l-4 border-red-400 shadow-red-900/80",
            button: "bg-gradient-to-br from-orange-700 to-red-900"
          }
        },
        {
          bg: "url('/images/imlate-bg3.jpg')",
          scheme: {
            sorryBox: "bg-gradient-to-br from-[#316532] to-[#4FA050]",
            responseBox: "bg-white/95 border-l-4 border-[#4FA050] shadow-green-900/80",
            button: "bg-gradient-to-br from-[#316532] to-[#4FA050]"
          }
        }
      ];
  
      const randomScheme = backgrounds[Math.floor(Math.random() * backgrounds.length)]!;
      setBackgroundImage(randomScheme.bg);
      setColourScheme(randomScheme.scheme);
    }
  }, []);

  return (
    <div className=" relative min-h-screen bg-blue-500"
        style={{
          backgroundImage: backgroundImage,
          backgroundSize: "100% 95%",
          backgroundPosition: "center 50px"
        }}>
      
      {/* bg image overlay */}
      <div className="absolute inset-x-0 top-12 bottom-0 bg-black opacity-50"></div>
      <Nav />
      
      {/* ai-generated excuse */}
      <main className="relative z-10 flex gap-15 mx-auto px-16 min-h-[15vh] mt-[70px]">
          <div className={`w-80 flex items-center justify-center ${colourScheme.sorryBox || 'bg-gradient-to-br from-gray-600 to-gray-900'} p-4 rounded-lg text-white drop-shadow-2xl shadow-2xl shadow-black/40`}>
            <p className="mt-0.5 text-[3.5rem] font-bold leading-tight -rotate-[3deg] font-brush ">
              <span className="block">SORRY</span>
              <span className="block -ml-2">GUYS...!</span>
            </p>
          </div>

          <div className={`flex-1 ${colourScheme.responseBox || 'bg-white'} font-light tracking-wide p-6 rounded-lg text-lg leading-relaxed drop-shadow-2xl shadow-lg shadow-black/50`}>
            {resultString || "LOADING..."} 
          </div>
        </main>

        <aside className="fixed bottom-16 left-16 w-50 z-40">
          <button
            className={`py-3 px-6 ${colourScheme.button || 'bg-black'} text-white rounded-lg font-semibold w-full drop-shadow-2xl shadow-black/50 hover:scale-105 hover:transition-all duration-200 cursor-pointer shadow-2xl`}
            onClick={() => {
              router.push("/excuse");
            }}
          >
            TRY AGAIN?
          </button>
        </aside>
      </div>
    );
  }