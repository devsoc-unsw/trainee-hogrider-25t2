import BgOverlay from "./_components/bgoverlay";
import Nav from "./_components/nav";
import ScrollingBackgrounds from "./_components/scrollingbackgrounds";


// Anika code here!
export default async function Home() {
  
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Scrolling backgrounds with stickman */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <ScrollingBackgrounds />
      </div>

      <div className="relative z-10">
        <Nav />
      </div>
      
      <div className="relative z-20 flex h-screen items-center justify-center px-4 -mt-16">
        <div className="mx-auto max-w-3xl rounded-lg bg-white bg-opacity-90 p-8 shadow-lg">
          <h1 className="mb-4 text-center text-4xl font-bold text-gray-800">
            Welcome to I'M LATE!
          </h1>
          <p className="mb-6 text-center text-lg text-gray-700">
            Your personal excuse generator for when you're running late. Just
            click the button below to get your excuse!
          </p>
          <div className="flex justify-center">
            <a className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600" href="./excuse">
              Get Excuse
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
