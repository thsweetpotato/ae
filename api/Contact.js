import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { firstName, lastName, email, message } = req.body;

    if (!firstName || !lastName || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      const { data, error } = await resend.emails.send({
        from: "Assam Essence Web <onboarding@resend.dev>", // ✅ you can change this later to hello@yourdomain.com
        to: "raajroych@gmail.com", // 🔑 replace with your actual inbox
        subject: `New Contact Form Submission from ${firstName} ${lastName}`,
        text: `
          You have a new message from your website contact form:

          Name: ${firstName} ${lastName}
          Email: ${email}
          Message: ${message || "(No message provided)"}
        `,
      });

      if (error) {
        console.error("❌ Resend error:", error);
        return res.status(500).json({ error: "Failed to send message" });
      }

      console.log("📩 Email sent:", data);
      return res.status(200).json({ success: true });
    } catch (err) {
      console.error("❌ Unexpected error:", err);
      return res.status(500).json({ error: "Something went wrong" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

