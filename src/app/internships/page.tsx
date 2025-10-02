"use client";

import React, { useEffect, useState } from "react";

// A simple Preloader component for the loading state
const Preloader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
    </div>
  );
};

// Interface for the Internship data structure
interface Internship {
  _id: string;
  name: string;
  jobTitle: string;
  type: string;
  package: string;
  location: string;
  batch: string;
  website?: string;
  logoURL?: string;
}

// The redesigned InternshipCard component
const InternshipCard: React.FC<{ internship: Internship }> = ({ internship }) => {
  return (
    <div className="relative border border-slate-200 dark:border-slate-700 border-t-4 border-blue-500 rounded-lg shadow-md bg-white dark:bg-slate-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
      
      {/* Main content area */}
      <div className="p-5 flex-grow flex flex-col">

        {/* Card Header: Logo, Company Name, Job Title */}
        <div className="text-center">
          {internship.logoURL && (
            <img
              src={internship.logoURL}
              alt={`${internship.name} logo`}
              className="w-16 h-16 rounded-full object-contain mx-auto mb-3 border-2 border-slate-200 dark:border-slate-600 p-1"
            />
          )}
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">{internship.name}</h2>
          {internship.jobTitle && (
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mt-1">{internship.jobTitle}</p>
          )}
        </div>

        {/* Divider */}
        <hr className="my-4 border-slate-200 dark:border-slate-700" />

        {/* Card Body: Details with Icons */}
        <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400 flex-grow">
          {internship.location && (
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{internship.location}</span>
            </div>
          )}
          {internship.package && (
            <div className="flex items-center gap-2">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="font-medium text-slate-700 dark:text-slate-300">{internship.package}</span>
            </div>
          )}
          {internship.batch && (
            <div className="flex items-center gap-2">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Batch of {internship.batch}</span>
            </div>
          )}
        </div>
      </div>

      {/* Card Footer: Apply Button */}
      <div className="px-5 pb-5 mt-4">
        {internship.website ? (
          <a
            href={internship.website}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 font-semibold transition-colors duration-300"
          >
            Apply Now
          </a>
        ) : (
          <button 
            disabled
            className="block w-full text-center text-slate-500 bg-slate-200 dark:text-slate-400 dark:bg-slate-700 px-4 py-2 rounded-md cursor-not-allowed font-semibold"
          >
            No Link Available
          </button>
        )}
      </div>
    </div>
  );
};

// The main page component that fetches data and displays the cards
const InternshipsPage: React.FC = () => {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const res = await fetch("https://atpac-backend-2.onrender.com/api/companies");
        const json = await res.json();
        const data = json.data || json;
        const internshipData = data.filter((item: Internship) => item.type === "Internship");
        setInternships(internshipData);
      } catch (err) {
        console.error("Error fetching internships:", err);
        setInternships([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <section className="py-12 bg-slate-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-5">
        <h1 className="text-4xl font-extrabold text-center mb-12 mt-20 text-slate-900 dark:text-white">
          Available Internships
        </h1>

        {internships.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {internships.map((internship) => (
              <InternshipCard key={internship._id} internship={internship} />
            ))}
          </div>
        ) : (
          <p className="text-center text-lg col-span-full text-slate-500 dark:text-slate-400">
            No internships are available at this time. Please check back later!
          </p>
        )}
      </div>
    </section>
  );
};

export default InternshipsPage;