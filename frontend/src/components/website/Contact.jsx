import React from "react";

const Contact = () => {
  return (
    <>
      {/* Contact Section */}
      <section
        id="contact"
        className="bg-white py-16"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#B5992B] mb-6 inline-block">
              Contact Us ✦
            </h2>
            <p className="text-[#051D41] mb-2">
              📍 Address: 6014 Jesus St, Angeles, Pampanga
            </p>
            <p className="text-[#051D41] mb-2">📞 Phone: +63 912 345 6789</p>
            <p className="text-[#051D41] mb-2">
              ✉️ Email: goldenbear@example.com
            </p>
          </div>
          <div>
            <iframe
              title="GoldenBear Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d962.8320376214033!2d120.5872880696163!3d15.1403126990883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3396f2448c90ef45%3A0x62b158bab914ff45!2s6014%20Jesus%20St%2C%20Angeles%2C%20Pampanga!5e0!3m2!1sen!2sph!4v1771794578003!5m2!1sen!2sph"
              width="100%"
              height="300"
              style={{ border: "2px solid #B5992B", borderRadius: "8px" }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
