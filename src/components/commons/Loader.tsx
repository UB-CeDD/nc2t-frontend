import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray bg-opacity-50">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      <span className="sr-only text-gray-700">Loading...</span>
    </div>
  );
};

export default Loader;
