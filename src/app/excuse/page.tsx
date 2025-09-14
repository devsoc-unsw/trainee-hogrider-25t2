"use client";

import { useState } from "react";
import Nav from "../_components/nav";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

import ScrollingBackgrounds from "../_components/plainscrollingbackgrounds";

import BgOverlay from "../_components/bgoverlay";

// Ethan code here!!!
export default function Excuse() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const burnMoney = api.ai.burnMoney.useMutation();
  const { data } = api.ai.getCharacters.useQuery();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const location = formData.get("location") as string;
    const destination = formData.get("destination") as string;
    const time = formData.get("time") as string;
    const reason = formData.get("reason") as string;
    const character = formData.get("character") as string;
    const text = `I'm currently at ${location} and need to get to ${destination}. I'm running late because: ${reason}, and it is currently ${time}.
                  Please generate a creative and believable excuse for why I'm late.`;

    try {
      const result = await burnMoney.mutateAsync({
        text,
        location,
        character,
        destination,
      });

      if (typeof window !== "undefined") {
        sessionStorage.setItem("processedResultString", result);
        sessionStorage.setItem("character", character);
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
    <div className="min-h-screen">
      <ScrollingBackgrounds />
      <BgOverlay />
      <div className="absolute inset-0 z-10">
        <Nav />

        {/* Form Section */}
        <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-2xl font-bold">What's your excuse?</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="mb-1 block text-lg font-medium">WYA</label>
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
                defaultValue={new Date().toTimeString().slice(0, 5)}
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-lg font-medium">Why Late</label>
              <textarea
                name="reason"
                className="w-full rounded border border-gray-300 p-2 text-lg"
                placeholder="Explain why you're late"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-lg font-medium">
                Character
              </label>
              <select
                name="character"
                className="w-full rounded border border-gray-300 p-2 text-lg"
              >
                {data?.map((character) => (
                  <option key={character} value={character}>
                    {character}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-black py-2 text-xl text-white hover:bg-gray-800 disabled:opacity-50"
            >
              {isSubmitting ? "Generating..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
