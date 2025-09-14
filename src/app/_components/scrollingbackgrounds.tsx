"use client";

export default function ScrollingBackgrounds() {
  const images = [
    '/images/imlate-bg1.jpg',
    '/images/imlate-bg2.jpg',
    '/images/imlate-bg3.jpg'
  ];

  return (

    <div className="w-full h-screen relative">
      {/* Scrolling background images */}

      <div className="flex animate-scroll-infinite">
        {[...images, ...images].map((image, index) => (
          <div
            key={index}

            className="min-w-full h-screen bg-cover bg-center"

            style={{ backgroundImage: `url('${image}')` }}
          />
        ))}
      </div>
      
      {/* Multiple stickman running animations */}
      {/* Bottom runners */}
      <div className="absolute bottom-20 left-0 w-full h-32 overflow-hidden">
        <img 
          src="/stickman-animations/stickman-running-animation.gif" 
          alt="Running stickman" 
          className="h-32 w-32 animate-run-across brightness-75 contrast-125"
        />
      </div>
      
      <div className="absolute bottom-32 left-0 w-full h-24 overflow-hidden">
        <img 
          src="/stickman-animations/stickman-running-animation.gif" 
          alt="Running stickman" 
          className="h-24 w-24 animate-run-across-delayed opacity-90 brightness-75 contrast-125"
        />
      </div>
      
      <div className="absolute bottom-48 left-0 w-full h-20 overflow-hidden">
        <img 
          src="/stickman-animations/stickman-running-animation.gif" 
          alt="Running stickman" 
          className="h-20 w-20 animate-run-across-slow opacity-80 brightness-75 contrast-125"
        />
      </div>
      
      {/* Top runners */}
      <div className="absolute top-20 left-0 w-full h-28 overflow-hidden">
        <img 
          src="/stickman-animations/stickman-running-animation.gif" 
          alt="Running stickman" 
          className="h-28 w-28 animate-run-across-top opacity-90 brightness-75 contrast-125"
        />
      </div>
      
      <div className="absolute top-48 left-0 w-full h-24 overflow-hidden">
        <img 
          src="/stickman-animations/stickman-running-animation.gif" 
          alt="Running stickman" 
          className="h-24 w-24 animate-run-across-top-delayed opacity-80 brightness-75 contrast-125"
        />
      </div>
      
      <div className="absolute top-72 left-0 w-full h-20 overflow-hidden">
        <img 
          src="/stickman-animations/stickman-running-animation.gif" 
          alt="Running stickman" 
          className="h-20 w-20 animate-run-across-top-slow opacity-70 brightness-75 contrast-125"
        />
      </div>

      <style jsx>{`
        @keyframes scroll-infinite {
          100% {
            transform: translateX(-300%);
          }
        }

        @keyframes run-across {
          0% {
            transform: translateX(-150px);
          }
          100% {
            transform: translateX(calc(100vw + 50px));
          }
        }
        @keyframes run-across-delayed {
          0% {
            transform: translateX(-150px);
          }
          100% {
            transform: translateX(calc(100vw + 50px));
          }
        }
        @keyframes run-across-slow {
          0% {
            transform: translateX(-150px);
          }
          100% {
            transform: translateX(calc(100vw + 50px));
          }
        }
        @keyframes run-across-top {
          0% {
            transform: translateX(-150px);
          }
          100% {
            transform: translateX(calc(100vw + 50px));
          }
        }
        @keyframes run-across-top-delayed {
          0% {
            transform: translateX(-150px);
          }
          100% {
            transform: translateX(calc(100vw + 50px));
          }
        }
        @keyframes run-across-top-slow {
          0% {
            transform: translateX(-150px);
          }
          100% {
            transform: translateX(calc(100vw + 50px));
          }
        }
        .animate-scroll-infinite {
          animation: scroll-infinite 12s linear infinite;
        }
        .animate-run-across {
          animation: run-across 8s linear infinite;
        }
        .animate-run-across-delayed {
          animation: run-across-delayed 10s linear infinite 2s;
        }
        .animate-run-across-slow {
          animation: run-across-slow 12s linear infinite 4s;
        }
        .animate-run-across-top {
          animation: run-across-top 9s linear infinite 1s;
        }
        .animate-run-across-top-delayed {
          animation: run-across-top-delayed 11s linear infinite 3s;
        }
        .animate-run-across-top-slow {
          animation: run-across-top-slow 13s linear infinite 5s;
        }

      `}</style>
    </div>
  );
}