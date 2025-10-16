// Define the Company interface
interface Company {
  id: string;
  name: string;
  industry: string;
  location: string;
  employee_count: number;
  founded_year: number;
  description: string;
  website: string;
  created_at: string;
  updated_at?: string; // Optional field
}

// Use local data in production, otherwise use json-server
const isProduction = import.meta.env.PROD;
const API_BASE_URL = isProduction ? '' : 'http://localhost:3001';

// Import the local JSON data
// @ts-ignore - We know the shape of the imported JSON
import companiesData from '../../db.json';

interface MockApi {
  getCompanies(query?: any): Promise<Company[]>;
  getCompany(id: string): Promise<Company | undefined>;
  addCompany(data: { body: Omit<Company, 'id' | 'created_at'> }): Promise<Company>;
  updateCompany(id: string, updates: { body: Partial<Company> }): Promise<Company | null>;
  deleteCompany(id: string): Promise<{ success: boolean }>;
}

const mockApi: MockApi = {
  // Get all companies with optional filtering, sorting, and pagination
  async getCompanies(query?: any) {
    let data: Company[] = [];
    
    if (isProduction) {
      // Use local data in production
      data = [...(companiesData as any).companies || []];
    } else {
      // Use json-server in development
      const response = await fetch(`${API_BASE_URL}/companies`);
      if (!response.ok) throw new Error('Failed to fetch companies');
      data = await response.json();
    }
    
    // Apply filtering if query parameters are provided
    if (query?.eq) {
      data = Object.entries(query.eq).reduce((filtered, [field, value]) => {
        if (!value) return filtered;
        
        return filtered.filter((item) => {
          const itemValue = item[field as keyof Company];
          if (itemValue === undefined) return false;
          
          // Case-insensitive comparison for string fields
          if (typeof itemValue === 'string' && typeof value === 'string') {
            return itemValue.toLowerCase().includes(value.toLowerCase());
          }
          return itemValue === value;
        });
      }, data);
    }
    
    // Apply sorting if specified
    if (query?.order) {
      const [field, direction] = Object.entries(query.order)[0];
      data.sort((a, b) => {
        const aValue = a[field as keyof Company];
        const bValue = b[field as keyof Company];
        if (aValue === undefined || bValue === undefined) return 0;
        return direction === 'asc'
          ? aValue > bValue ? 1 : -1
          : aValue < bValue ? 1 : -1;
      });
    }
    
    // Apply pagination if range is specified
    if (query?.range) {
      const [start, end] = query.range;
      return data.slice(start, end + 1);
    }
    
    return data;
  },

  // Get a single company by ID
  async getCompany(id: string) {
    if (isProduction) {
      return ((companiesData as any).companies || []).find((company: Company) => company.id === id);
    }
    
    const response = await fetch(`${API_BASE_URL}/companies/${id}`);
    if (!response.ok) throw new Error('Company not found');
    return response.json();
  },

  // Add a new company
  async addCompany(data: { body: Omit<Company, 'id' | 'created_at'> }) {
    const newCompany: Company = {
      ...data.body,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
    };
    
    if (isProduction) {
      (companiesData as any).companies = [...((companiesData as any).companies || []), newCompany];
      return newCompany;
    }
    
    const response = await fetch(`${API_BASE_URL}/companies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCompany),
    });
    
    if (!response.ok) throw new Error('Failed to add company');
    return response.json();
  },

  // Update a company
  async updateCompany(id: string, updates: { body: Partial<Company> }) {
    if (isProduction) {
      const companies = (companiesData as any).companies || [];
      const index = companies.findIndex((company: Company) => company.id === id);
      if (index !== -1) {
        const updatedCompany = { 
          ...companies[index],
          ...updates.body,
          id, // Ensure ID doesn't get overwritten
          updated_at: new Date().toISOString()
        };
        companies[index] = updatedCompany;
        (companiesData as any).companies = companies;
        return updatedCompany;
      }
      return null;
    }

    const response = await fetch(`${API_BASE_URL}/companies/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates.body),
    });
    
    if (!response.ok) throw new Error('Failed to update company');
    return response.json();
  },

  // Delete a company
  async deleteCompany(id: string) {
    if (isProduction) {
      const companies = (companiesData as any).companies || [];
      const initialLength = companies.length;
      (companiesData as any).companies = companies.filter((company: Company) => company.id !== id);
      return { success: (companiesData as any).companies.length < initialLength };
    }

    const response = await fetch(`${API_BASE_URL}/companies/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) throw new Error('Failed to delete company');
    return { success: true };
  },
};

export default mockApi;
