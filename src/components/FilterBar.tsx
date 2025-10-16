import { Search, Filter, ArrowUpDown } from 'lucide-react';
import { CompanyFilters, SortConfig, SortField, SortOrder } from '../types/company';

interface FilterBarProps {
  filters: CompanyFilters;
  onFilterChange: (filters: CompanyFilters) => void;
  sortConfig: SortConfig;
  onSortChange: (config: SortConfig) => void;
  industries: string[];
}

export function FilterBar({ filters, onFilterChange, sortConfig, onSortChange, industries }: FilterBarProps) {
  const handleSearchChange = (value: string) => {
    onFilterChange({ ...filters, search: value });
  };

  const handleIndustryChange = (value: string) => {
    onFilterChange({ ...filters, industry: value });
  };

  const handleLocationChange = (value: string) => {
    onFilterChange({ ...filters, location: value });
  };

  const handleSortFieldChange = (field: SortField) => {
    if (sortConfig.field === field) {
      onSortChange({ field, order: sortConfig.order === 'asc' ? 'desc' : 'asc' });
    } else {
      onSortChange({ field, order: 'asc' });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Search Companies
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search by name..."
              value={filters.search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            <Filter className="inline mr-1" size={16} />
            Industry
          </label>
          <select
            value={filters.industry}
            onChange={(e) => handleIndustryChange(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
          >
            <option value="">All Industries</option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            <Filter className="inline mr-1" size={16} />
            Location
          </label>
          <input
            type="text"
            placeholder="Filter by location..."
            value={filters.location}
            onChange={(e) => handleLocationChange(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            <ArrowUpDown className="inline mr-1" size={16} />
            Sort By
          </label>
          <div className="flex gap-2">
            <select
              value={sortConfig.field}
              onChange={(e) => handleSortFieldChange(e.target.value as SortField)}
              className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
            >
              <option value="name">Name</option>
              <option value="employee_count">Employees</option>
              <option value="founded_year">Founded Year</option>
            </select>
            <button
              onClick={() => onSortChange({ ...sortConfig, order: sortConfig.order === 'asc' ? 'desc' : 'asc' })}
              className="px-3 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition"
              title={sortConfig.order === 'asc' ? 'Ascending' : 'Descending'}
            >
              {sortConfig.order === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
