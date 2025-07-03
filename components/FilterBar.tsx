import { FunnelIcon } from "@heroicons/react/24/solid";

type FilterBarProps = {
  locations: string[];
  selected: string;
  onChange: (location: string) => void;
};

export default function FilterBar({ locations, selected, onChange }: FilterBarProps) {
  return (
    <div className="flex items-center flex-col sm:flex-row gap-3 md:gap-0 mb-4 md:mb-0">
      <div className="flex items-center gap-2">
        <FunnelIcon className="w-6 h-6 text-blue-500" aria-hidden="true" />
        <label htmlFor="location" className="mr-2 font-medium text-gray-800">Filter by Location:</label>
      </div>
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
  );
}
