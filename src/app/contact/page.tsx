"use client"; // <-- add this at the very top

import React, { useState } from "react";

const ContactPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("https://script.google.com/macros/s/AKfycbxEJCUzqgXng1qdjW26FYwzpGxJeNiOe1jp5V8Kz92YrNs9pXjqfVRxXZCkxsjikAp30g/exec", {
        method: "POST",
        body: JSON.stringify(form),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (data.status === "success") {
        setStatus("Message sent successfully!");
        setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setStatus("Failed to send message. Try again.");
      }
    } catch (err) {
      console.error(err);
      setStatus("Error sending message. Try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Contact ATPAC</h1>
      <p className="mb-6">
        Fill out the form below to contact the Alumni, Training, and Placement Affairs Council.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email Address"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          placeholder="Subject"
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Your Message"
          required
          className="w-full p-2 border rounded"
          rows={5}
        ></textarea>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Send Message
        </button>
      </form>

      {status && <p className="mt-4 text-green-600">{status}</p>}
    </div>
  );
};

export default ContactPage;
