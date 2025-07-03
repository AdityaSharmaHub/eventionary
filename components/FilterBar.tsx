import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";

type FilterBarProps = {
  locations: string[];
  selected: string;
  onChange: (location: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
};

export default function FilterBar({ locations, selected, onChange, searchQuery, onSearchChange }: FilterBarProps) {
  return (
    <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 w-full">
      <div className="flex items-center gap-2 flex-1">
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          className="w-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 px-4 py-2 rounded-lg shadow-sm bg-white text-gray-900 transition outline-none"
          aria-label="Search events by title or description"
        />
      </div>
      <div className="flex items-center gap-2 flex-1 max-w-xs">
        <FunnelIcon className="w-6 h-6 text-blue-500" aria-hidden="true" />
        <label htmlFor="location" className="font-medium text-gray-800 whitespace-nowrap">Location:</label>
        <select
          id="location"
          aria-label="Filter events by location"
          value={selected}
          onChange={(e) => onChange(e.target.value)}
          className="border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 px-4 py-2 rounded-lg shadow-sm bg-white text-gray-900 transition outline-none"
        >
          <option value="All">All</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
