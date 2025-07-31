"use client";

import { api } from "~/trpc/react";
import z from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  text: z.string().min(1, "Required"),
  // TODO: Add appropiate input fields as required
});

type FormInputs = z.infer<typeof formSchema>;

export default function AiExample() {
  const dataMutation = api.ai.burnMoney.useMutation();

  const router = useRouter();

  const { register, handleSubmit } = useForm<FormInputs>();
  const onSubmit = handleSubmit((data) => {
    dataMutation.mutate(
      { text: data.text },
      {
        async onSuccess(data) {
          // Store the long string in session storage
          if (typeof window !== "undefined") {
            sessionStorage.setItem("processedResultString", data);
          }

          // Navigate to the display page
          router.push("/resultsexample");
        },
      },
      // Todo handle failure cases
    );
  });
  return (
    <form onSubmit={onSubmit} className="m-4 flex w-128 flex-col items-center">
      <label>Some text to prompt the AI</label>
      <input className="w-full border-1" {...register("text")} />
      <button
        className={`m-3 w-full cursor-pointer ${dataMutation.isPending ? "animate-pulse bg-gray-200" : "bg-blue-500"}`}
        disabled={dataMutation.isPending}
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
