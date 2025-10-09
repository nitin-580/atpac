'use client';

import { useState, useEffect, useMemo } from 'react';

// Child Component Imports
import DashboardFilters from '@/components/DashboardFilters';
import Preloader from '@/components/Preloader';
import DepartmentPerformanceChart from '@/components/DepartmentPerformanceChart';
import BatchStatusChart from '@/components/BatchStatusChart';
import TopCompaniesChart from '@/components/TopCompaniesChart';

// --- Type definitions are now in this file ---
export interface IDepartmentStat {
    _id: string;
    departmentName: string;
    degree: string;
    batchYear: number;
    totalStudents: number;
    eligibleStudents: number;
    placementsPlaced: number;
    internshipsPlaced: number;
    unplaced: number;
}

export interface IPlacement {
    _id: string;
    companyName: string;
    departmentName: string;
    degree: string;
    batchYear: number;
    studentCount: number;
    type: "Placement" | "Internship";
}

const API_BASE_URL = "http://localhost:5003/api";

export default function Page() {
    const [filters, setFilters] = useState({ batchYear: 2025, degree: "BTech" });
    const [stats, setStats] = useState<IDepartmentStat[]>([]);
    const [placements, setPlacements] = useState<IPlacement[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // --- API fetching logic is now directly in useEffect ---
    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            const statsQuery = new URLSearchParams({
                batchYear: filters.batchYear.toString(),
                degree: filters.degree,
            });
            const placementsQuery = new URLSearchParams({
                batchYear: filters.batchYear.toString(),
                // We can fetch all degrees for top companies chart or filter by degree
                degree: filters.degree 
            });

            try {
                const [statsRes, placementsRes] = await Promise.all([
                    fetch(`${API_BASE_URL}/stats?${statsQuery.toString()}`),
                    fetch(`${API_BASE_URL}/placements?${placementsQuery.toString()}`),
                ]);

                if (!statsRes.ok || !placementsRes.ok) {
                    throw new Error("Failed to fetch data");
                }

                const statsData = await statsRes.json();
                const placementsData = await placementsRes.json();

                setStats(statsData);
                setPlacements(placementsData);

            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [filters]);

    const topCompanies = useMemo(() => {
        const companyMap = new Map<string, number>();
        placements.forEach(p => {
            companyMap.set(p.companyName, (companyMap.get(p.companyName) || 0) + p.studentCount);
        });
        return Array.from(companyMap.entries())
            .sort(([, a], [, b]) => b - a)
            .slice(0, 15)
            .map(([name, count]) => ({ name, count }));
    }, [placements]);

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
            <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto pt-24">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                    Placement Dashboard
                </h1>

                <DashboardFilters filters={filters} onFilterChange={setFilters} disabled={isLoading} />

                {isLoading ? (
                    <Preloader />
                ) : stats.length > 0 ? (
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md transition-colors duration-300">
                                <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Department Performance</h2>
                                <DepartmentPerformanceChart data={stats} />
                            </div>
                            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md transition-colors duration-300">
                                <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Overall Batch Status</h2>
                                <BatchStatusChart data={stats} />
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md transition-colors duration-300">
                            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Top Hiring Companies</h2>
                            <TopCompaniesChart data={topCompanies} />
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-slate-500 dark:text-slate-400 mt-16">
                        No data available for the selected criteria.
                    </p>
                )}
            </div>
        </main>
    );
}