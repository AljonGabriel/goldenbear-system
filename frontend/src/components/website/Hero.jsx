import React from "react";

const Hero = ({ fbLink }) => {
  return (
    <>
      {/* Hero Section */}
      <section id="hero" className="w-full bg-[#051D41] py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="text-center md:text-left">
            <h2
              className="text-4xl md:text-6xl text-[#B5992B] italic tracking-wide leading-relaxed"
              style={{ fontFamily: "'Great Vibes', cursive" }}
            >
              Timeless Elegance
            </h2>
            <p
              className="text-lg md:text-xl text-white mb-8"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Discover handcrafted jewelry designed to shine forever.
            </p>
            <a
              href={fbLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#B5992B] text-white px-6 py-3 rounded-lg shadow hover:bg-[#a38724] transition font-semibold"
            >
              Shop Now
            </a>
          </div>

          {/* Puzzle Photo Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "/hero-bracelet.jpg",
              "https://images.unsplash.com/photo-1522337660859-02fbefca4702",
              "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3",
              "hero-watch.jpg",
              "hero-neklace.jpg",
              "hero-ring.jpg",
            ].map((src, i) => (
              <img
                key={i}
                src={src}
                alt="Jewelry"
                className="w-full h-40 md:h-48 object-cover rounded-lg shadow-lg hover:scale-105 transition"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
