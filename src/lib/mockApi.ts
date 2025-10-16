/**
 * Local API service using json-server for mock data
 * Simulates a RESTful API for development and testing
 * 
 * In production, replace with your actual backend API endpoints
 * @see https://github.com/typicode/json-server
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
const mockApi = {
  // Get all companies
async getCompanies(query?: any) {
  const response = await fetch(`${API_BASE_URL}/companies`);
  let data = await response.json();
  
  // Handle filtering based on query parameters
  if (query?.eq) {
    data = Object.entries(query.eq).reduce((filtered, [field, value]) => {
      if (!value) return filtered; // Skip if value is empty
      
      return filtered.filter((item: Company) => {
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
  
  // Handle sorting
  if (query?.order) {
    const [field, direction] = Object.entries(query.order)[0];
    data.sort((a: Company, b: Company) => {
      const aValue = a[field as keyof Company];
      const bValue = b[field as keyof Company];
      return direction === 'asc' 
        ? aValue > bValue ? 1 : -1 
        : aValue < bValue ? 1 : -1;
    });
  }
  
  // Handle pagination
  if (query?.range) {
    const [start, end] = query.range;
    return data.slice(start, end + 1);
  }
  
  return data;
},

  // Get a single company by ID
  async getCompany(id: string) {
    const response = await fetch(`${API_BASE_URL}/companies/${id}`);
    if (!response.ok) throw new Error('Company not found');
    return response.json();
  },

  // Add a new company
  async addCompany(data: { body: Omit<Company, 'id' | 'created_at'> }) {
    const newCompany = {
      ...data.body,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString()
    };

    const response = await fetch(`${API_BASE_URL}/companies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCompany),
    });
    return response.json();
  },

  // Update a company
  async updateCompany(id: string, updates: { body: Partial<Company> }) {
    // First get the existing company
    const existingResponse = await fetch(`${API_BASE_URL}/companies/${id}`);
    if (!existingResponse.ok) throw new Error('Company not found');
    const existingCompany = await existingResponse.json();

    // Update with new data
    const updatedCompany = { ...existingCompany, ...updates.body };

    const response = await fetch(`${API_BASE_URL}/companies/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCompany),
    });
    return response.json();
  },

  // Delete a company
  async deleteCompany(id: string) {
    const response = await fetch(`${API_BASE_URL}/companies/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete company');
    return { id };
  },
};

export default mockApi;

// Type definitions
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

// Response type for API calls
export interface ApiResponse<T> {
  data: T;
  error: Error | null;
}
