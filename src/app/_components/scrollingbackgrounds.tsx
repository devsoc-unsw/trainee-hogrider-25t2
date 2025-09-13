export default function ScrollingBackgrounds() {
  const images = [
    '/images/imlate-bg1.jpg',
    '/images/imlate-bg2.jpg',
    '/images/imlate-bg3.jpg'
  ];

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="flex animate-scroll-infinite">
        {images.map((image, index) => (
          <div
            key={`first-${index}`}
            className="min-w-full h-screen bg-cover bg-center flex-shrink-0"
            style={{
              backgroundImage: `url('${image}')`
            }}
          />
        ))}
        {images.map((image, index) => (
          <div
            key={`second-${index}`}
            className="min-w-full h-screen bg-cover bg-center flex-shrink-0"
            style={{
              backgroundImage: `url('${image}')`
            }}
          />
        ))}
      </div>
      <style jsx>{`
        @keyframes scroll-infinite {
          0% {
            transform: translateX(0);
          }
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
};