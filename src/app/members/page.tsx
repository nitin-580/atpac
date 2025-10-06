"use client";
import React from "react";
import InstagramEmbed from "@/components/InstagramEmbed";

const MembersPage: React.FC = () => {
  const instagramPosts = [
    "https://www.instagram.com/p/DOlU48gjL_d/",
    // Add more public posts here
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 mt-10">
          Meet the ATPAC Team
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl max-w-3xl mx-auto">
          Our members work tirelessly to bridge students with opportunities, organize events, 
          and enhance career initiatives on campus.
        </p>
      </header>

      {/* Instagram Posts Section */}
      <div className="mb-12 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
          ATPAC on Instagram
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
          {instagramPosts.map((url, i) => (
            <div key={i} className="w-full max-w-[400px]">
              <InstagramEmbed url={url} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MembersPage;
