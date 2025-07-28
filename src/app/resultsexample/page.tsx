"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DisplayResultPage() {
  const router = useRouter();
  const [resultString, setResultString] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

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
    </div>
  );
}
