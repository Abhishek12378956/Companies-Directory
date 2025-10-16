import { useState, useEffect, useCallback } from 'react';
import { Company, CompanyFilters, SortConfig } from '../types/company';
import mockApi from '../lib/mockApi';

interface UseCompaniesResult {
  companies: Company[];
  loading: boolean;
  error: string | null;
  totalCount: number;
  fetchCompanies: () => Promise<void>;
}

const ITEMS_PER_PAGE = 9;

export function useCompanies(
  filters: CompanyFilters,
  sortConfig: SortConfig,
  currentPage: number
): UseCompaniesResult {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  const fetchCompanies = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Build query parameters based on filters and sort config
      const query: any = {};
      
      if (filters.search) {
        query.eq = { ...query.eq, name: filters.search };
      }
      
      if (filters.industry) {
        query.eq = { ...query.eq, industry: filters.industry };
      }
      
      if (filters.location) {
        query.eq = { ...query.eq, location: filters.location };
      }
      
      if (sortConfig.field) {
        query.order = { [sortConfig.field]: sortConfig.order };
      }

      // Get all companies with current filters/sort
      const allCompanies = await mockApi.getCompanies(query);
      
      // Handle pagination
      const from = (currentPage - 1) * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE;
      const paginatedCompanies = allCompanies.slice(from, to);
      
      setCompanies(paginatedCompanies);
      setTotalCount(allCompanies.length);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching companies:', err);
    } finally {
      setLoading(false);
    }
  }, [filters, sortConfig, currentPage]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  return { companies, loading, error, totalCount, fetchCompanies };
}

export function useIndustries() {
  const [industries, setIndustries] = useState<string[]>([]);

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        // Get all companies
        const companies = await mockApi.getCompanies();
        
        // Extract unique industries
        const uniqueIndustries = Array.from(
          new Set(companies.map((company: Company) => company.industry))
        ).filter(Boolean) as string[]; // Filter out any undefined/null values
        
        setIndustries(uniqueIndustries.sort());
      } catch (error) {
        console.error('Error fetching industries:', error);
      }
    };

    fetchIndustries();
  }, []);

  return industries;
}

export const ITEMS_PER_PAGE_EXPORT = ITEMS_PER_PAGE;
