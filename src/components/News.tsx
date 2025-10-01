"use client"
import React from "react";
import { motion } from "framer-motion";

const newsItems = [
  {
    title: "SVNIT wins national innovation award",
    date: "26 Aug 2025",
    description:
      "Our students showcased outstanding innovation in technology and design, earning national recognition.",
  },
  {
    title: "Upcoming Workshop on AI & ML",
    date: "30 Aug 2025",
    description:
      "Join our expert-led workshop to enhance your AI and ML skills. Limited seats available!",
  },
  {
    title: "Alumni Meetup 2025",
    date: "10 Sep 2025",
    description:
      "Reconnect with fellow alumni and share your experiences at our annual meetup event.",
  },
];

const NewsSection = () => {
  return (
    <section className="py-16 px-8 md:px-16">
      <h2 className="text-3xl font-bold dark:text-white mb-8 text-center">
        Latest News
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
      </div>
    </section>
  );
};

export default NewsSection;
