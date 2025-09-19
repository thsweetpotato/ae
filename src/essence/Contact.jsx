import React from 'react';
import { useState } from "react";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); // stop refresh
    setSent(true);

    // Optional: reset confirmation after a delay
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-6 py-12"
    >
      <div className="max-w-2xl w-full">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-[#2E7D32] mb-2">
          Contact Us
        </h2>
        <p className="text-center text-gray-600 mb-12">
          We’d love to hear from you. Please fill out the form below.
        </p>

        {/* Form */}
        <form className="space-y-10" onSubmit={handleSubmit}>
          {/* First + Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="relative">
              <label
                htmlFor="firstName"
                className="absolute -top-5 left-0 text-sm font-medium text-gray-700"
              >
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                required
                placeholder="John"
                className="w-full border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#2E7D32] p-2"
              />
            </div>

            <div className="relative">
              <label
                htmlFor="lastName"
                className="absolute -top-5 left-0 text-sm font-medium text-gray-700"
              >
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                required
                placeholder="Doe"
                className="w-full border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#2E7D32] p-2"
              />
            </div>
          </div>

          {/* Email */}
          <div className="relative">
            <label
              htmlFor="email"
              className="absolute -top-5 left-0 text-sm font-medium text-gray-700"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              required
              placeholder="john@example.com"
              className="w-full border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#2E7D32] p-2"
            />
          </div>

          {/* Phone Number */}
          <div className="relative">
            <label
              htmlFor="phone"
              className="absolute -top-5 left-0 text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              placeholder="+91 98765 43210"
              className="w-full border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#2E7D32] p-2"
            />
          </div>

          {/* Message */}
          <div className="relative">
            <label
              htmlFor="message"
              className="absolute -top-5 left-0 text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              id="message"
              rows="4"
              placeholder="Type your message..."
              className="w-full border-b border-gray-300 bg-transparent focus:outline-none focus:border-[#2E7D32] p-2 resize-none"
            ></textarea>
          </div>

          {/* Submit or Confirmation */}
          <div className="flex justify-center">
            {sent ? (
              <p className="text-green-700 font-semibold bg-green-100 px-6 py-3 rounded-full shadow-md">
                Message Sent!
              </p>
            ) : (
              <button
                type="submit"
                className="bg-[#2E7D32] cursor-pointer text-white font-semibold px-8 py-3 rounded-full shadow-md hover:bg-green-700 transition-colors"
              >
                Send Message
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
