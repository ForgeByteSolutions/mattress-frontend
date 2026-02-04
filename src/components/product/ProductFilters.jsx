export default function ProductFilters({ filters, setFilters, availableValues, clearFilters }) {
    const categories = [
        { label: "Product Type", key: "product_type", values: availableValues.productTypes },
        { label: "Brand", key: "brand_name", values: availableValues.brands },
        { label: "Audience", key: "audience", values: availableValues.audiences },
        { label: "Firmness", key: "firmness", values: ["Soft", "Medium", "Firm", "Extra Firm"] },
    ];

    const handleCheckboxChange = (key, value) => {
        setFilters(prev => {
            const current = prev[key] || [];
            const updated = current.includes(value)
                ? current.filter(v => v !== value)
                : [...current, value];
            return { ...prev, [key]: updated };
        });
    };

    return (
        <div className="space-y-8">
            {/* Header with Clear All */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                <button
                    onClick={clearFilters}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                    Clear All
                </button>
            </div>

            {/* Categories */}
            {categories.map((cat) => (
                <div key={cat.label} className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">
                        {cat.label}
                    </h3>
                    <div className="space-y-3">
                        {cat.values.map((val) => (
                            <label key={val} className="flex items-center group cursor-pointer">
                                <div className="relative flex items-center justify-center">
                                    <input
                                        type="checkbox"
                                        checked={filters[cat.key]?.includes(val) || false}
                                        onChange={() => handleCheckboxChange(cat.key, val)}
                                        className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-200 transition-all checked:border-blue-600 checked:bg-blue-600 hover:border-blue-400"
                                    />
                                    <span className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                </div>
                                <span className="ml-3 text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                                    {val}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
            ))}

        </div>
    );
}
