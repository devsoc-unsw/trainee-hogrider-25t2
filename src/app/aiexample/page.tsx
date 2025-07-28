"use client"

import { useState } from "react";
import { api } from "~/trpc/react";
import debounce from 'debounce';

// Anika code here!
export default function AiExample() {

  const [query, setState] = useState("what is love?");
  
  const {data} = api.ai.burnMoney.useQuery({text: query});

  return (
    <>
      <p>Home page</p>
      <p>{data}</p>
      <input value={query} onChange={(e) => debounce(() => setState(e.target.value), 1000)}></input>
    </>
  );
}
