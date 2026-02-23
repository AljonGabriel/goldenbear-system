import React from "react";

const About = () => {
  return (
    <>
      {/* About Section */}
      <section id="about" className="bg-white py-12 md:py-26">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Image */}
          <div className="flex justify-center mb-8 md:mb-0">
            <img
              src="/website-about-ring.png" // <-- replace with your actual ring PNG file
              alt="GoldenBear Ring"
              className="w-40 h-40 md:w-64 md:h-64 object-contain drop-shadow-lg"
            />
          </div>

          {/* Text */}
          <div
            className="text-center md:text-left"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[#B5992B] mb-6">
              About Goldenbear ✦
            </h2>
            <p className="text-[#051D41] text-base md:text-lg leading-relaxed mb-4">
              GoldenBear Jewelries offers a wide variety of timeless pieces —
              from rings and necklaces to bracelets and watches — designed to
              bring elegance to every occasion.
            </p>
            <p className="text-[#051D41] text-base md:text-lg leading-relaxed">
              Beyond our handcrafted collections, we also provide expert jewelry
              and watch repair services, ensuring that your treasured items
              continue to shine for years to come.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
