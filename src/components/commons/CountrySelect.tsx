import React, { useState, useEffect } from "react";

interface CountrySelectProps {
    hasLabel?: boolean;
    label?: string;
    labelClass?: string;
    selectClass?: string;
    multiple?: boolean;
    placeholder?: string;
    placeholderClass?: string;
    onChange: (selectedCountries: string[]) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ hasLabel, label, labelClass, selectClass, multiple = false, placeholder, placeholderClass, onChange }) => {
    const [countries, setCountries] = useState<string[]>([]);
    const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

    useEffect(() => {
        // Fetch countries from an API
        const fetchCountries = async () => {
            try {
                const response = await fetch("https://restcountries.com/v3.1/all");
                const data = await response.json();
                const countryNames = data.map((country: { name: { common: string } }) => country.name.common);
                setCountries(countryNames.sort());
            } catch (error) {
                console.error("Error fetching countries:", error);
            }
        };

        fetchCountries();
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
        setSelectedCountries(selectedOptions);
        onChange(selectedOptions); // Pass selected countries to the parent
    };

    return (
        <div>
            { hasLabel && (<label className={labelClass ?? "block mb-2 text-sm font-medium text-gray-900 dark:text-dark"}>
                {label ?? 'Select Countries'}
            </label> )}
            <select
                id="countries"
                className={ selectClass ?? "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                multiple={multiple}
                value={selectedCountries}
                onChange={handleChange}
            >
                <option className={placeholderClass} value="" disabled>
                    {placeholder}
                </option>
                {countries.map((country) => (
                    <option key={country} value={country}>
                        {country}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CountrySelect;