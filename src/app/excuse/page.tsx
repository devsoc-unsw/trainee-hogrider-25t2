"use client";

import { useState } from "react";
import Nav from "../_components/nav";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import ScrollingBackgrounds from "../_components/scrollingbackgrounds";
import BgOverlay from "../_components/bgoverlay";

// Ethan code here!!!
export default function Excuse() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const burnMoney = api.ai.burnMoney.useMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const location = formData.get("location") as string;
    const destination = formData.get("destination") as string;
    const time = formData.get("time") as string;
    const reason = formData.get("reason") as string;
    const text = `I'm currently at ${location} and need to get to ${destination}. I'm running late because: ${reason}, and it is currently ${time}.
                  Please generate a creative and believable excuse for why I'm late.`;

    try {
      const result = await burnMoney.mutateAsync({
        text,
        location,
        destination,
      });

      if (typeof window !== "undefined") {
        sessionStorage.setItem("processedResultString", result);
      }

      router.push("/result");

      // Alternatively since this is all going to an AI you can put all the info into a string and push it to BE
      // Since its all going to get stringified in the end <-- This is probably going to be easier
      // TODO navigate to the results page
      // Data should be maintained, several ways to do this. slug etc. Pretty googleable u got this :thumbsup:
    } catch (error) {
      // Todo Handle Error
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen overflow-hidden">
      <ScrollingBackgrounds />
      <BgOverlay />
      <div className="absolute inset-0 z-10 overflow-hidden">
        <Nav />
        <div className="flex h-screen pt-4 overflow-hidden">
          
          {/* Form Section */}
          <div className="w-1/3 flex items-start justify-center p-4 pt-8 pl-22">
            <div className="w-full max-w-md rounded-lg bg-white p-6 drop-shadow-2xl shadow-lg shadow-black/50">
              <h2 className="mb-4 text-2xl font-bold font-brush ml-5 mt-1 -rotate-[1deg]">What's your excuse?</h2>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="mb-1 block text-lg font-medium">WYA?</label>
                  <input
                    name="location"
                    type="text"
                    className="w-full rounded border border-gray-300 p-2 text-lg"
                    placeholder="Where are you?"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-lg font-medium">
                    Destination
                  </label>
                  <input
                    name="destination"
                    type="text"
                    className="w-full rounded border border-gray-300 p-2 text-lg"
                    placeholder="Where are you going?"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-lg font-medium">Time</label>
                  <input
                    name="time"
                    type="time"
                    className="w-full rounded border border-gray-300 p-2 text-lg"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-lg font-medium">Anything Else?</label>
                  <textarea
                    name="reason"
                    className="w-full rounded border border-gray-300 p-2 text-lg"
                    placeholder="Explain why you're late"
                    rows={3}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-lg bg-black py-2 text-xl text-white hover:bg-gray-800 disabled:opacity-50"
                >
                  {isSubmitting ? "Generating..." : "SUBMIT"}
                </button>
              </form>
            </div>
          </div>

          {/* animation */}
          <div className="w-2/3 flex items-start justify-center p-2 pt-8">
            <div style={{ 
                width: '800px', 
                height: '1000px', 
                overflow: 'hidden',
                alignItems: 'flex-start',
              }}>
              <img 
                src="/stickman-animations/stickman-running-animation.gif"
                alt="Stickman running"
                style={{ 
                  filter: 'invert(1)',
                  transform: 'scale(3)',
                  transformOrigin: 'top center', 
                  marginTop: '-250px'
                }}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}