import { useState, useRef, useEffect } from 'react'

const CategoryDropdown = ({
  category,
  categories,
  handleCategoryChange,
  getCategoryNames,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300"
      >
        {category ? getCategoryNames([category]) : 'Categories'}
        <svg
          className="w-2.5 h-2.5 ml-2.5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="z-10 top-11 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
          <ul className="py-2 text-sm text-gray-700">
            {categories.map((category) => (
              <li
                key={category.id}
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  handleCategoryChange(category.id)
                  setIsOpen(false)
                }}
              >
                {category.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default CategoryDropdown
