import React, { useState, useEffect } from "react";

const LandingPage = () => {
  const fbLink = "https://www.facebook.com/YourJewelryPage";
  const [currentPage, setCurrentPage] = useState(1);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const products = [
    {
      id: 1,
      name: "Elegant Gold Ring",
      price: "₱12,500",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
    },
    {
      id: 2,
      name: "Diamond Necklace",
      price: "₱25,000",
      image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702",
    },
    {
      id: 3,
      name: "Luxury Bracelet",
      price: "₱18,000",
      image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3",
    },
  ];

  const productsPerPage = 9;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F4F4]">
      {/* Navbar */}
      <nav
        className={`sticky top-0 z-50 transition-all ${
          scrolled
            ? "bg-gradient-to-r from-[#051D41] via-[#0A2C66] to-[#123B73] shadow-lg"
            : "bg-gradient-to-r from-[#051D41] to-[#0A2C66]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo + Brand */}
          <div className="flex items-center space-x-3">
            <img
              src="/tablogo.png"
              alt="GoldenBear Logo"
              className="h-12 w-12 rounded-full border-2 border-[#B5992B]"
            />
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#B5992B] tracking-wide">
              GOLDENBEAR{" "}
              <span className="text-white font-serif italic">JEWELRIES</span>
            </h1>
          </div>

          {/* Navigation Links */}
          <ul className="flex space-x-6 text-sm md:text-base font-medium">
            <li>
              <a
                href="#catalog"
                className="text-white hover:text-[#B5992B] transition"
              >
                Shop
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="text-white hover:text-[#B5992B] transition"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="w-full bg-gradient-to-b from-[#051D41] via-[#0A2C66] to-[#123B73] py-20 md:py-28"
      >
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-6xl font-bold text-[#B5992B] mb-6">
              Timeless Elegance
            </h2>
            <p className="text-lg md:text-xl text-white mb-8">
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
          <div className="grid grid-cols-2 gap-4">
            {[
              "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
              "https://images.unsplash.com/photo-1522337660859-02fbefca4702",
              "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3",
              "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
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

      {/* Product Catalog */}
      <section id="catalog" className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-[#B5992B] mb-8 border-b-2 border-[#B5992B] inline-block">
          Our Catalog
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-5">
                <h3 className="text-lg font-semibold text-[#051D41]">
                  {product.name}
                </h3>
                <p className="text-gray-600">{product.price}</p>
                <a
                  href={fbLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 block w-full bg-[#051D41] text-white py-2 rounded hover:bg-[#093679] text-center font-medium"
                >
                  View on Facebook
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-10 space-x-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-4 py-2 border rounded-lg disabled:opacity-50 text-[#051D41] hover:bg-[#B5992B] hover:text-white transition"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 border rounded-lg ${
                currentPage === i + 1
                  ? "bg-[#B5992B] text-white"
                  : "text-[#051D41] hover:bg-[#B5992B] hover:text-white"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-4 py-2 border rounded-lg disabled:opacity-50 text-[#051D41] hover:bg-[#B5992B] hover:text-white transition"
          >
            Next
          </button>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#B5992B] mb-6 border-b-2 border-[#B5992B] inline-block">
              Contact Us
            </h2>
            <p className="text-[#051D41] mb-2">
              📍 Address: Porac, Pampanga, Philippines
            </p>
            <p className="text-[#051D41] mb-2">📞 Phone: +63 912 345 6789</p>
            <p className="text-[#051D41] mb-2">
              ✉️ Email: goldenbear@example.com
            </p>
          </div>
          <div>
            <iframe
              title="GoldenBear Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7723.123456789!2d120.543!3d15.071!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3396f123456789%3A0xabcdef123456789!2sPorac%2C%20Pampanga!5e0!3m2!1sen!2sph!4v1670000000000"
              width="100%"
              height="300"
              style={{ border: "2px solid #B5992B", borderRadius: "8px" }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#051D41] text-[#F3F4F4] py-8 text-center border-t-2 border-[#B5992B]">
        <p className="text-sm md:text-base font-medium">
          © 2026 GoldenBear Jewelry ✦ All rights reserved.
        </p>
        <p className="text-xs text-gray-400 mt-2">
          Crafted with elegance in Porac, Pampanga
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
