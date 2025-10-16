export interface Company {
  id: string;
  name: string;
  industry: string;
  location: string;
  employee_count: number;
  founded_year: number;
  description: string;
  website: string;
  created_at: string;
}

export interface CompanyFilters {
  search: string;
  industry: string;
  location: string;
}

export type SortField = 'name' | 'employee_count' | 'founded_year';
export type SortOrder = 'asc' | 'desc';

export interface SortConfig {
  field: SortField;
  order: SortOrder;
}
