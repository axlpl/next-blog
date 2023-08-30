export default function SearchField({ value, onChange }) {
  return (
    <input
      type="search"
      value={value}
      onChange={onChange}
      className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-100 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
      placeholder="Search"
    />
  )
}
