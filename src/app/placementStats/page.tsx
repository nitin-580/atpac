"use client";

import React, { useState, useEffect } from "react";
import Filter from "@/components/Filter";
import CompanyList from "@/components/CompanyList";
import { Company, Filters } from "@/types";

const Page: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Filters>({
    category: "All Categories",
    degree: "All Degrees",
    company: "All Companies",
    batch: "All Batches",
    placementType: "All Types",
    cgpa: 0,
  });
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  // Fetch companies
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await fetch("https://atpac-backend-2.onrender.com/api/companies/");
        if (!res.ok) throw new Error("Failed to fetch companies");
        const data: Company[] = await res.json();
        setCompanies(data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };
    fetchCompanies();
  }, []);

  const handleSearch = (query: string) => setSearchQuery(query);
  const handleApply = (newFilters: Filters) => setFilters(newFilters);
  const handleReset = () => {
    setSearchQuery("");
    setFilters({
      category: "All Categories",
      degree: "All Degrees",
      company: "All Companies",
      batch: "All Batches",
      placementType: "All Types",
      cgpa: 0,
    });
  };

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (company.jobTitle || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (company.location || "").toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCompany =
      !filters.company || filters.company === "All Companies"
        ? true
        : company.name === filters.company;

    const matchesBatch =
      !filters.batch || filters.batch === "All Batches"
        ? true
        : company.batch === filters.batch;

    const matchesType =
      !filters.placementType || filters.placementType === "All Types"
        ? true
        : company.type === filters.placementType;

    const matchesCgpa =
      !filters.cgpa || filters.cgpa === 0
        ? true
        : company.minCgpa === "N/A" || Number(company.minCgpa) <= filters.cgpa;

    return matchesSearch && matchesCompany && matchesBatch && matchesType && matchesCgpa;
  });

  return (
    <div className="p-6 max-w-6xl mx-auto mt-10">
      <Filter companies={companies} onSearch={handleSearch} onApply={handleApply} onReset={handleReset} />
      <CompanyList companies={filteredCompanies} onView={setSelectedCompany} />

      {selectedCompany && (
        <div className="mt-8 p-6 border rounded-lg bg-gray-100">
          <h2 className="text-xl font-bold">{selectedCompany.name}</h2>
          <p>Role: {selectedCompany.jobTitle || "Not specified"}</p>
          <p>Package: {selectedCompany.package || "Not specified"}</p>
          <p>Location: {selectedCompany.location || "Not specified"}</p>
          <p>Min CGPA: {selectedCompany.minCgpa || "N/A"}</p>
          <p>Batch: {selectedCompany.batch}</p>
        </div>
      )}
    </div>
  );
};

export default Page;
