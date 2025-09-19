import { useState, React } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState(null); // "success" | "error" | null

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ firstName: "", lastName: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col items-center justify-center bg-white px-6 py-16"
    >
      <h2 className="text-3xl font-bold mb-8 text-[#2E7D32]">Contact Us</h2>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg space-y-6 border border-[#2E7D32]/30"
      >
        {/* Name row (always side by side) */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-[#2E7D32]">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border border-[#2E7D32]/40 rounded-lg focus:ring-2 focus:ring-[#D97706] outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#2E7D32]">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border border-[#2E7D32]/40 rounded-lg focus:ring-2 focus:ring-[#D97706] outline-none"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-[#2E7D32]">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border border-[#2E7D32]/40 rounded-lg focus:ring-2 focus:ring-[#D97706] outline-none"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-[#2E7D32]">
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className="w-full mt-1 p-2 border resize-none border-[#2E7D32]/40 rounded-lg focus:ring-2 focus:ring-[#D97706] outline-none"
          ></textarea>
        </div>

        {/* Submit */}
        <div className="flex justify-center">
        <button
          type="submit"
          className="cursor-pointer border-1 border-[#2E7D32] text-[#2E7D32] py-1 px-4 rounded-lg hover:bg-green-200 hover:border-[#D97706] transition"
        >
          Send Message
        </button>
        </div>

        {/* Status Messages */}
        {status === "success" && (
          <p className="text-green-600 font-medium mt-4 text-center">
            ✅ Sent Successfully!
          </p>
        )}
        {status === "error" && (
          <p className="text-red-600 font-medium mt-4 text-center">
            ❌ Something went wrong. Please try again.
          </p>
        )}
      </form>
    </section>
  );
}
