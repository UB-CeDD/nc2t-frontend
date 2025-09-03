import React, { useState, useEffect } from "react";

// Define props using a discriminated union for better type safety
// This ensures that if multiple=true, onChange expects an array, and if multiple=false, it expects a string.
type CountrySelectProps = {
    hasLabel?: boolean;
    label?: string;
    labelClass?: string;
    selectClass?: string;
    placeholder?: string;
    placeholderClass?: string;
} & (
    | {
        multiple: true;
        value: string[];
        onChange: (selectedCountries: string[]) => void;
    }
    | {
        multiple?: false;
        value: string;
        onChange: (selectedCountry: string) => void;
    }
);

interface CountryData {
    name: {
        common: string;
    };
    cca2: string;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ 
    hasLabel, 
    label, 
    labelClass, 
    selectClass, 
    multiple, 
    placeholder, 
    placeholderClass, 
    value, 
    onChange 
}) => {
    const [countries, setCountries] = useState<CountryData[]>([]);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                // Added the 'fields' query parameter to specify required data
                const response = await fetch("https://restcountries.com/v3.1/all?fields=name,cca2");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: CountryData[] = await response.json();
                // Sort data based on common name
                data.sort((a, b) => a.name.common.localeCompare(b.name.common));
                setCountries(data);
            } catch (error) {
                console.error("Error fetching countries:", error);
                setCountries([]); 
            }
        };

        fetchCountries();
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (multiple) {
            const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
            (onChange as (selectedCountries: string[]) => void)(selectedOptions);
        } else {
            (onChange as (selectedCountry: string) => void)(event.target.value);
        }
    };

    return (
        <div>
            {hasLabel && (
                <label className={labelClass ?? "block mb-2 text-sm font-medium text-gray-900 dark:text-dark"}>
                    {label ?? 'Select Country'}
                </label>
            )}
            <select
                id="countries"
                className={selectClass ?? "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                multiple={multiple}
                value={value}
                onChange={handleChange}
            >
                <option className={placeholderClass} value="" disabled={!placeholder}>
                    {placeholder ?? (multiple ? "Select countries..." : "Select a country...")}
                </option>
                {countries.map((country) => (
                    <option key={country.cca2} value={country.name.common}>
                        {country.name.common}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CountrySelect;