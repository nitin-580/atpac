"use client";

import React, { useEffect, useState } from "react";

interface Internship {
  _id: string;
  name: string;
  jobTitle: string;
  type: string;
  package: string;
  location: string;
  batch: string;
  website?: string;
  logoURL?: string; // optional logo
}

const InternshipCard: React.FC<{ internship: Internship }> = ({ internship }) => {
  return (
    <div className="border rounded-lg shadow p-5 bg-white hover:shadow-lg transition flex flex-col justify-between">
      {/* Logo */}
      {internship.logoURL && (
        <img
          src={internship.logoURL}
          alt={internship.name}
          className="w-full h-32 object-contain mb-3"
        />
      )}

      {/* Internship Details */}
      <h2 className="text-xl font-semibold mb-2 text-black">{internship.name}</h2>
      {internship.jobTitle && (
        <p className="text-gray-600 mb-1">
          <strong>Job Title:</strong> {internship.jobTitle}
        </p>
      )}
      {internship.location && (
        <p className="text-gray-600 mb-1">
          <strong>Location:</strong> {internship.location}
        </p>
      )}
      {internship.batch && (
        <p className="text-gray-600 mb-1">
          <strong>Batch:</strong> {internship.batch}
        </p>
      )}
      {internship.package && (
        <p className="text-gray-600 mb-3">
          <strong>Package:</strong> {internship.package}
        </p>
      )}

      {/* Apply Button */}
      {internship.website ? (
        <a
          href={internship.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 text-center"
        >
          Apply Now
        </a>
      ) : (
        <button className="text-white bg-gray-400 px-4 py-2 rounded cursor-not-allowed text-center">
          No Link
        </button>
      )}
    </div>
  );
};

const InternshipsPage: React.FC = () => {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const res = await fetch("https://atpac-backend-2.onrender.com/api/companies");
        const json = await res.json();

        // Handle API returning data directly or inside a "data" field
        const data = json.data || json;

        // Filter only internships
        const internshipData = data.filter((item: Internship) => item.type === "Internship");
        setInternships(internshipData);
      } catch (err) {
        console.error("Error fetching internships:", err);
        setInternships([]); // fallback to empty array
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, []);

  if (loading) {
    return <p className="text-center py-10 text-gray-700">Loading internships...</p>;
  }

  return (
    <section className="py-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-10 mt-20 text-black">
        Available Internships
      </h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-5">
        {internships.length > 0 ? (
          internships.map((internship) => (
            <InternshipCard key={internship._id} internship={internship} />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">No internships available.</p>
        )}
      </div>
    </section>
  );
};

export default InternshipsPage;
