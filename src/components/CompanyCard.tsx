import { Building2, MapPin, Users, Calendar, ExternalLink } from 'lucide-react';
import { Company } from '../types/company';

interface CompanyCardProps {
  company: Company;
}

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-blue-300 transition-all duration-300 overflow-hidden group">
      <div className="h-2 bg-gradient-to-r from-blue-500 to-cyan-500"></div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md">
              {company.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition">
                {company.name}
              </h3>
              <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full mt-1">
                {company.industry}
              </span>
            </div>
          </div>
        </div>

        <p className="text-slate-600 text-sm mb-4 line-clamp-2 min-h-[40px]">
          {company.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <MapPin size={16} className="text-slate-400" />
            <span>{company.location}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Users size={16} className="text-slate-400" />
            <span>{company.employee_count?.toLocaleString() || 'N/A'} employees</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Calendar size={16} className="text-slate-400" />
            <span>Founded {company.founded_year || 'N/A'}</span>
          </div>
        </div>

        {company.website && (
          <a
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm group/link"
          >
            Visit Website
            <ExternalLink size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
          </a>
        )}
      </div>
    </div>
  );
}
