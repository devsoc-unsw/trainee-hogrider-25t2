// Mary code here!!!
"use client";

export default function Result() {
  return (
    <div className="bg-cover bg-center relative min-h-screen bg-blue-500" 
         style={{ 
           backgroundImage: "url('/images/imlate-bg2.jpg')",
           backgroundPosition: "center 50px"
         }}>
      
      {/* bg image overlay */}
      <div className="absolute inset-0 bg-black
       opacity-20"></div>
      
      {/* temp navbar */}
      <nav className="relative z-30 fixed top-0 left-0 right-0 h-20 bg-black flex justify-end items-center px-6">
        <h1 className="text-white font-bold text-xl">I'M LATE!</h1>
      </nav>

      {/* ai-generated excuse */}
      <main className="relative z-10 flex gap-40 mx-25 min-h-[15vh] mt-[70px]">
        <div className="flex-[0.5] flex items-center justify-center bg-black p-4 rounded-lg text-white drop-shadow-2xl">
          <p className="mt-0.5 text-6xl font-bold leading-tight -rotate-[3deg] font-brush">
            <span className="block">SORRY</span>
            <span className="block -ml-2">GUYS...!</span>
          </p>
        </div>

        <div className="flex-[2] bg-white p-4 rounded-lg text-[1.6rem] drop-shadow-2xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </div>
      </main>

      {/* see reactions */}
      <aside className="fixed bottom-16 left-16 w-50 z-40 font-brush drop-shadow-2xl">
        <button
          className="py-2 px-4 bg-white text-black rounded-lg border-none cursor-pointer font-semibold w-full box-border"
          onClick={() => {
            alert("wop wop not working yet");
          }}
        >
          SEE REACTIONS...
        </button>
      </aside>
    </div>
  );
}