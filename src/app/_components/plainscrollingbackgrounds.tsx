"use client";

export default function PlainScrollingBackgrounds() {
  const images = [
    '/images/imlate-bg1.jpg',
    '/images/imlate-bg2.jpg',
    '/images/imlate-bg3.jpg'
  ];

  return (
    <div className="w-full h-screen">
      <div className="flex animate-scroll-infinite">
        {[...images, ...images].map((image, index) => (
          <div
            key={index}
            className="min-w-full h-screen bg-cover bg-center"
            style={{ backgroundImage: `url('${image}')` }}
          />
        ))}
      </div>
      <style jsx>{`
        @keyframes scroll-infinite {
          100% {
            transform: translateX(-300%);
          }
        }
        .animate-scroll-infinite {
          animation: scroll-infinite 12s linear infinite;
        }
      `}</style>
    </div>
  );
}
