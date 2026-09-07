import { useState, type FormEvent, type ChangeEvent } from "react";
import emailjs from "@emailjs/browser";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./contact.css";
import { useLanguage } from "../../context/LanguageContext";

// --- Fill these in from your EmailJS dashboard (emailjs.com) ---
const EMAILJS_SERVICE_ID = "service_kfmu9jk";
const EMAILJS_TEMPLATE_ID = "template_yy2cpj7";
const EMAILJS_PUBLIC_KEY = "5cIrBPSQFu3m7ADv5";
// -----------------------------------------------------------------

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type Status = "idle" | "sending" | "success" | "error";

function ContactPage() {
  const { t } = useLanguage();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<Status>("idle");

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    emailjs
      .send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      })
      .catch((err) => {
        console.error("EmailJS error:", err);
        setStatus("error");
      });
  }

  return (
    <div className="page">
      <Header />

      <section className="contact">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">{t("contact.eyebrow") || "Get in touch"}</div>
            <h2>{t("contact.title") || "Contact Us"}</h2>
            <p>
              {t("contact.body") ||
                "Have a question about our machines or a project in mind? Send us a message and we'll get back to you."}
            </p>
          </div>

          <div className="contact__grid">
            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="form-row">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                />
              </div>

              <div className="form-row">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="form-row">
                <label htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is this about?"
                />
              </div>

              <div className="form-row">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  required
                />
              </div>

              <button
                type="submit"
                className="btn-pill"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>

              {status === "success" && (
                <p className="form-status form-status--success">
                  Your message has been sent. We'll get back to you soon!
                </p>
              )}

              {status === "error" && (
                <p className="form-status form-status--error">
                  Please fill in all required fields, or something went wrong.
                  Try again.
                </p>
              )}
            </form>

            <div className="contact__info">
              <div className="hero__info-block">
                <h4>Hours</h4>
                <p>Mon - Fri: 8:00 AM - 6:00 PM</p>
                <p>Sat: 9:00 AM - 2:00 PM</p>
              </div>

              <div className="hero__info-block">
                <h4>Address</h4>
                <p>Ghaziyeh High way</p>
                <p>Saida_Lebanon</p>
              </div>

              <div className="hero__info-block">
                <h4>Contact</h4>
                <p>+961 7 222 191</p>
                <p>+961 3 714 499</p>
                <p>info@shadow.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default ContactPage;
