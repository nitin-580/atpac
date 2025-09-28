"use client";

import React from "react";

interface Company {
  _id: string;
  name: string;
  jobTitle: string;
  type: string;
  package: string;
  location: string;
  minCgpa: string;
  batch: string;
}

interface CompanyListProps {
  companies: Company[];
  onView: (company: Company) => void;
}

const CompanyList: React.FC<CompanyListProps> = ({ companies, onView }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-xl border border-gray-300 mt-6 shadow-sm">
      <table className="w-full text-left text-gray-700">
        {/* Table Head */}
        <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
          <tr>
            <th className="px-4 py-3">Company</th>
            <th className="px-4 py-3">Job Title</th>
            <th className="px-4 py-3">Type</th>
            <th className="px-4 py-3">Package</th>
            <th className="px-4 py-3">Location</th>
            <th className="px-4 py-3">Min CGPA</th>
            <th className="px-4 py-3">Batch</th>
            <th className="px-4 py-3">Details</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {companies.map((company) => (
            <tr
              key={company._id}
              className="border-t border-gray-200 hover:bg-gray-50"
            >
              <td className="px-4 py-3 font-medium">{company.name}</td>
              <td className="px-4 py-3">{company.jobTitle}</td>
              <td className="px-4 py-3">
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    company.type === "Internship"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {company.type}
                </span>
              </td>
              <td className="px-4 py-3">{company.package}</td>
              <td className="px-4 py-3">{company.location}</td>
              <td className="px-4 py-3">{company.minCgpa}</td>
              <td className="px-4 py-3">{company.batch}</td>
              <td className="px-4 py-3">
                <button
                  onClick={() => onView(company)}
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyList;
