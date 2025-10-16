import { useState } from 'react';
import { Building2 } from 'lucide-react';
import { FilterBar } from './components/FilterBar';
import { CompanyList } from './components/CompanyList';
import { LoadingState } from './components/LoadingState';
import { ErrorState } from './components/ErrorState';
import { Pagination } from './components/Pagination';
import { useCompanies, useIndustries, ITEMS_PER_PAGE_EXPORT } from './hooks/useCompanies';
import { CompanyFilters, SortConfig } from './types/company';

function App() {
  const [filters, setFilters] = useState<CompanyFilters>({
    search: '',
    industry: '',
    location: '',
  });

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: 'name',
    order: 'asc',
  });

  const [currentPage, setCurrentPage] = useState(1);

  const { companies, loading, error, totalCount, fetchCompanies } = useCompanies(
    filters,
    sortConfig,
    currentPage
  );

  const industries = useIndustries();

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE_EXPORT);

  const handleFilterChange = (newFilters: CompanyFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSortChange = (newSort: SortConfig) => {
    setSortConfig(newSort);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl shadow-lg mb-4">
            <Building2 className="text-white" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">
            Companies Directory
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover and explore leading companies across various industries
          </p>
          <div className="mt-4 text-sm text-slate-500">
            {totalCount} {totalCount === 1 ? 'company' : 'companies'} found
          </div>
        </header>

        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          sortConfig={sortConfig}
          onSortChange={handleSortChange}
          industries={industries}
        />

        {loading && <LoadingState />}

        {error && <ErrorState message={error} onRetry={fetchCompanies} />}

        {!loading && !error && (
          <>
            <CompanyList companies={companies} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>

      <footer className="bg-white border-t border-slate-200 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-600">
          <p>Made ❤️ by Abhishek Tiwari</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
