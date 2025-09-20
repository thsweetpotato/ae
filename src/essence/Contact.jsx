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
        "service_gmail",     // from EmailJS
        "contact_form",    // from EmailJS
        formRef.current,
        "u8u-UjwSjxOaMp_IL"      // from EmailJS
      )
      .then(
        () => {
          setStatus("Sent Successfully!");
          formRef.current.reset(); // clear form
        },
        (error) => {
          console.error(error);
          setStatus("❌ Failed to send. Try again.");
        }
      );
  };

  return (
    <div id="contact" className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
      <form
        ref={formRef}
        onSubmit={sendEmail}
        className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-[#2E7D32] text-center">Contact Us</h2>
        <input type="hidden" name="time" value={date}></input>
        <div className="flex space-x-2">
          <div className="w-1/2">
            <label className="text-sm font-medium text-gray-700">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="first_name"
              required
              className="w-full border border-green-700 rounded-lg p-2 text-sm"
            />
          </div>
          <div className="w-1/2">
            <label className="text-sm font-medium text-gray-700">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="last_name"
              required
              className="w-full border border-green-700 rounded-lg p-2 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            required
            className="w-full border border-green-700 rounded-lg p-2 text-sm"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Message</label>
          <textarea
            name="message"
            rows="4"
            className="w-full border resize-none border-green-700 rounded-lg p-2 text-sm"
          ></textarea>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="px-4 py-2 border border-[#2E7D32] text-[#2E7D32] rounded-lg hover:bg-[#2E7D32] hover:text-white text-sm"
          >
            Send Message
          </button>
        </div>

        {status && (
          <p className="text-center text-sm mt-2 text-gray-600">{status}</p>
        )}
      </form>
    </div>
  );
}

export default Contact;
