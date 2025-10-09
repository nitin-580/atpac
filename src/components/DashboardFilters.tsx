'use client';

interface Filters {
  batchYear: number;
  degree: string;
}

interface DashboardFiltersProps {
  filters: Filters;
  onFilterChange: (newFilters: Filters) => void;
  disabled: boolean;
}

export default function DashboardFilters({ filters, onFilterChange, disabled }: DashboardFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-md transition-colors duration-300">
      <div>
        <label htmlFor="batchYear" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Batch Year</label>
        <select
          id="batchYear"
          value={filters.batchYear}
          disabled={disabled}
          onChange={(e) => onFilterChange({ ...filters, batchYear: parseInt(e.target.value) })}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md disabled:opacity-50"
        >
          <option>2025</option>
          <option>2024</option>
          <option>2023</option>
        </select>
      </div>
      <div>
        <label htmlFor="degree" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Degree</label>
        <select
          id="degree"
          value={filters.degree}
          disabled={disabled}
          onChange={(e) => onFilterChange({ ...filters, degree: e.target.value })}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md disabled:opacity-50"
        >
          <option>BTech</option>
          <option>MTech</option>
          <option>MSc</option>
        </select>
      </div>
    </div>
  );
}