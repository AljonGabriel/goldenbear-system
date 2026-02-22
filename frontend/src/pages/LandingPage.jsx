import React, { useState, useEffect } from "react";

const LandingPage = () => {
  const fbLink = "https://www.facebook.com/YourJewelryPage";
  const [currentPage, setCurrentPage] = useState(1);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

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
    {
      id: 4,
      name: "Pearl Earrings",
      price: "₱9,500",
      image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
    },
    {
      id: 5,
      name: "Rose Gold Pendant",
      price: "₱15,000",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    },
    {
      id: 6,
      name: "Silver Bracelet",
      price: "₱8,500",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
    },
    {
      id: 7,
      name: "Gold Chain",
      price: "₱20,000",
      image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702",
    },
    {
      id: 8,
      name: "Diamond Ring",
      price: "₱30,000",
      image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3",
    },
    {
      id: 9,
      name: "Luxury Watch",
      price: "₱50,000",
      image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
    },
    {
      id: 10,
      name: "Gold Earrings",
      price: "₱12,000",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    },
    {
      id: 11,
      name: "Platinum Necklace",
      price: "₱45,000",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
    },
    {
      id: 12,
      name: "Ruby Ring",
      price: "₱35,000",
      image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702",
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
      <nav
        className={`sticky top-0 z-50 transition-all ${
          scrolled
            ? "bg-gradient-to-r from-[#051D41] via-[#0A2C66] to-[#123B73]"
            : "bg-gradient-to-r from-[#051D41] to-[#0A2C66]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          {/* Logo + Brand */}
          <div className="flex items-center space-x-3">
            <div className="bg-white rounded-full p-1">
              <img
                src="/tablogo.png"
                alt="GoldenBear Logo"
                className="h-10 w-10 object-contain rounded-full"
              />
            </div>
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl md:text-2xl font-bold text-[#B5992B] tracking-wide">
                GOLDENBEAR
              </h1>
              <span className="text-[#B5992B] text-xl">✦</span>
              <span className="text-lg md:text-xl font-serif italic text-white">
                JEWELRIES
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <ul className="flex space-x-4 md:space-x-6 text-sm md:text-base">
            <li>
              <a href="#catalog" className="text-white hover:text-[#B5992B]">
                Shop
              </a>
            </li>
            <li>
              <a href="#contact" className="text-white hover:text-[#B5992B]">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="w-full bg-gradient-to-b from-[#051D41] via-[#0A2C66] to-[#123B73] py-16 md:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Text */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-bold text-[#B5992B] mb-4">
              Timeless Elegance
            </h2>
            <p className="text-base md:text-lg text-white mb-6">
              Discover handcrafted jewelry designed to shine forever.
            </p>
            <a
              href={fbLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#B5992B] text-white px-4 md:px-6 py-2 md:py-3 rounded-lg shadow hover:bg-[#a38724] transition text-sm md:text-base"
            >
              Shop Now
            </a>
          </div>

          {/* Puzzle Photo Grid */}
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9"
              alt="Gold Ring"
              className="w-full h-32 md:h-40 object-cover rounded-lg shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1522337660859-02fbefca4702"
              alt="Necklace"
              className="w-full h-32 md:h-40 object-cover rounded-lg shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3"
              alt="Bracelet"
              className="w-full h-32 md:h-40 object-cover rounded-lg shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f"
              alt="Earrings"
              className="w-full h-32 md:h-40 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Product Catalog */}
      <section id="catalog" className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <h2 className="text-xl md:text-2xl font-semibold text-[#B5992B] mb-6 border-b border-[#B5992B] inline-block">
          Our Catalog
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 min-h-[600px]">
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow rounded-lg overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 md:h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-base md:text-lg font-semibold text-[#051D41]">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  {product.price}
                </p>
                <a
                  href={fbLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 block w-full bg-[#051D41] text-white py-2 rounded hover:bg-[#093679] text-center text-sm md:text-base"
                >
                  View on Facebook
                </a>
              </div>
            </div>
          ))}

          {/* Fill empty slots to keep grid consistent */}
          {Array.from({ length: productsPerPage - currentProducts.length }).map(
            (_, i) => (
              <div key={i} className="bg-transparent"></div>
            ),
          )}
        </div>

        {/* Pagination Controls */}
        <div className="flex flex-wrap justify-center mt-8 gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-4 py-2 border rounded disabled:opacity-50 text-[#051D41]"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 border rounded ${
                currentPage === i + 1
                  ? "bg-[#051D41] text-white"
                  : "text-[#051D41]"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-4 py-2 border rounded disabled:opacity-50 text-[#051D41]"
          >
            Next
          </button>
        </div>
      </section>

      {/* Contact + Map */}
      <section id="contact" className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-[#B5992B] mb-4 border-b border-[#B5992B] inline-block">
              Contact Us
            </h2>
            <p className="text-[#051D41] text-sm md:text-base">
              📍 Address: Porac, Pampanga, Philippines
            </p>
            <p className="text-[#051D41] text-sm md:text-base">
              📞 Phone: +63 912 345 6789
            </p>
            <p className="text-[#051D41] text-sm md:text-base">
              ✉️ Email: goldenbear@example.com
            </p>
          </div>
          <div>
            <iframe
              title="GoldenBear Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7723.123456789!2d120.543!3d15.071!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3396f123456789%3A0xabcdef123456789!2sPorac%2C%20Pampanga!5e0!3m2!1sen!2sph!4v1670000000000"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#051D41] text-[#F3F4F4] py-6 text-center border-t border-[#B5992B]">
        <p className="text-sm md:text-base">
          © 2026 GoldenBear Jewelry. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
