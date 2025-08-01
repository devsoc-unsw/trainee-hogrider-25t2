"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

export default function DisplayResultPage() {
  const router = useRouter();
  const [resultString, setResultString] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>("+61");

  const callMutation = api.ai.callSomeone.useMutation();

  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window !== "undefined") {
      const storedResult = sessionStorage.getItem("processedResultString");

      if (storedResult) {
        setResultString(storedResult);
      } else {
        // If data isn't found, redirect back or show an error
        void router.replace("/aiexample"); // Redirect back to the form
      }
    }
  }, [router]);

  if (!resultString) {
    // Show a loading state or nothing while redirecting
    return <div className="p-4">Loading result...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Processed Result</h1>
      {resultString && (
        <div className="mb-4 rounded-md bg-green-100 p-3 text-green-700">
          {resultString}
        </div>
      )}

      <button
        onClick={() => router.back()}
        className="mt-8 text-indigo-600 hover:underline"
      >
        Go Back
      </button>
      <div>
        <input
          type="text"
          placeholder="Phone Number"
          className="border-1"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <button
          onClick={() => {
            callMutation.mutate({
              text: resultString,
              phoneNumber: phoneNumber,
            });
          }}
          className="mt-8 bg-emerald-100 text-indigo-600 hover:underline"
        >
          Call someone
        </button>
      </div>
    </div>
  );
}
