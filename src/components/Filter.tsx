"use client";

import React, { useState } from "react";

// Company interface
interface Company {
  name: string;
  batch: string;
  type: string;
}

// Filters interface
export interface Filters {
  category: string;
  degree: string;
  company: string;
  batch: string;
  placementType: string;
  cgpa: number;
}

// Props interface
interface FilterProps {
  companies?: Company[];
  onSearch: (query: string) => void;
  onApply: (filters: Filters) => void;
  onReset: () => void;
}

const Filter: React.FC<FilterProps> = ({
  companies = [],
  onSearch,
  onApply,
  onReset,
}) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [degree, setDegree] = useState("All Degrees");
  const [company, setCompany] = useState("All Companies");
  const [batch, setBatch] = useState("All Batches");
  const [placementType, setPlacementType] = useState("All Types");
  const [cgpa, setCgpa] = useState(0);

  // Extract unique values for selects
  const companyOptions = Array.from(new Set(companies.map((c) => c.name)));
  const batchOptions = Array.from(new Set(companies.map((c) => c.batch)));
  const typeOptions = Array.from(new Set(companies.map((c) => c.type)));

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    onSearch(value);
  };

  // Handle apply filters
  const handleApply = () => {
    const filters: Filters = { category, degree, company, batch, placementType, cgpa };
    onApply(filters);
  };

  return (
    <div className="p-6 rounded-xl border border-gray-300 space-y-4 mt-10 bg-white">
      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search by job title, company, or location..."
        className="w-full border border-gray-300 text-black rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Filters */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="text-black border border-gray-300 rounded-lg px-3 py-2"
        >
          <option>All Categories</option>
          <option>Software</option>
          <option>Core</option>
          <option>Consulting</option>
        </select>

        {/* Degree */}
        <select
          value={degree}
          onChange={(e) => setDegree(e.target.value)}
          className="text-black border border-gray-300 rounded-lg px-3 py-2"
        >
          <option>All Degrees</option>
          <option>MSc Mathematics</option>
          <option>MSc Physics</option>
          <option>MSc Chemistry</option>
          <option>B.Tech</option>
          <option>M.Tech</option>
          <option>MBA</option>
        </select>

        {/* Company */}
        <select
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="text-black border border-gray-300 rounded-lg px-3 py-2"
        >
          <option>All Companies</option>
          {companyOptions.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        {/* Batch */}
        <select
          value={batch}
          onChange={(e) => setBatch(e.target.value)}
          className="text-black border border-gray-300 rounded-lg px-3 py-2"
        >
          <option>All Batches</option>
          {batchOptions.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>

        {/* CGPA */}
        <div className="col-span-2 flex flex-col">
          <label className="text-gray-700 text-sm">Your CGPA: {cgpa}</label>
          <input
            type="range"
            min={0}
            max={10}
            step={0.1}
            value={cgpa}
            onChange={(e) => setCgpa(Number(e.target.value))}
            className="w-full accent-blue-600"
          />
        </div>

        {/* Placement Type */}
        <select
          value={placementType}
          onChange={(e) => setPlacementType(e.target.value)}
          className="text-black border border-gray-300 rounded-lg px-3 py-2"
        >
          <option>All Types</option>
          {typeOptions.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3">
        <button
          onClick={onReset}
          className="px-4 py-2 border border-gray-400 text-gray-700 rounded-lg hover:bg-gray-100"
        >
          Reset Filters
        </button>
        <button
          onClick={handleApply}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default Filter;
