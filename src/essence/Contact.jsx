import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

function Contact() {
  const formRef = useRef();
  const [status, setStatus] = useState("");
  const date = new Date();

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("Sending...");

    emailjs
      .sendForm(
        "service_gmail",   // your service ID
        "contact_form",    // your template ID
        formRef.current,
        "u8u-UjwSjxOaMp_IL" // your public key
      )
      .then(
        () => {
          setStatus("Sent Successfully!");
          setTimeout(() => setStatus(""), 3000);
          formRef.current.reset();
        },
        (error) => {
          console.error(error);
          setStatus("❌ Failed to send. Try again.");
          setTimeout(() => setStatus(""), 3000);
        }
      );
  };

  return (
    <div id="contact" className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
      <form
        ref={formRef}
        onSubmit={sendEmail}
        className="bg-white border border-[#2E7D32]/20 rounded-2xl p-8 w-full max-w-lg space-y-6"
      >
        <h2 className="text-2xl font-semibold text-[#2E7D32] text-center">Contact Us</h2>

        <input type="hidden" name="time" value={date.toISOString()} />

        {/* First + Last name */}
        <div className="flex space-x-3">
          <input
            type="text"
            name="first_name"
            placeholder="First Name *"
            required
            className="w-1/2 border border-[#2E7D32] rounded-lg p-2 text-sm focus:outline-none focus:border-amber-600"
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name *"
            required
            className="w-1/2 border border-[#2E7D32] rounded-lg p-2 text-sm focus:outline-none focus:border-amber-600"
          />
        </div>

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email *"
          required
          className="w-full border border-[#2E7D32] rounded-lg p-2 text-sm focus:outline-none focus:border-amber-600"
        />

        {/* Message */}
        <textarea
          name="message"
          rows="4"
          placeholder="Your Message"
          className="w-full border border-[#2E7D32] rounded-lg p-2 text-sm resize-none focus:outline-none focus:border-amber-600"
        ></textarea>

        {/* Submit */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-2 rounded-full border border-[#2E7D32] text-[#2E7D32] hover:bg-[#2E7D32] hover:text-white text-sm transition-all"
          >
            Send
          </button>
        </div>

        {/* Status */}
        {status && (
          <p className="text-center text-sm mt-2 text-gray-600">{status}</p>
        )}
      </form>
    </div>
  );
}

export default Contact;
