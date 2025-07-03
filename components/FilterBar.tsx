// components/FilterBar.tsx
type FilterBarProps = {
  locations: string[];
  selected: string;
  onChange: (location: string) => void;
};

export default function FilterBar({ locations, selected, onChange }: FilterBarProps) {
  return (
    <div className="mb-6">
      <label htmlFor="location" className="mr-2 font-medium">Filter by Location:</label>
      <select
        id="location"
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="border px-3 py-1 rounded"
      >
        <option value="All">All</option>
        {locations.map((loc) => (
          <option key={loc} value={loc}>{loc}</option>
        ))}
      </select>
    </div>
  );
}
