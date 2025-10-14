import React from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";

const ErrorPage: React.FC = () => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <MainLayout>
      <div className="text-center">
        <h1 className="text-9xl font-bold text-red-600">Error</h1>
        <p className="text-2xl font-semibold md:text-3xl">
          Oops! Something went wrong.
        </p>
        <p className="mt-4 mb-8 text-gray-600">
          We are sorry, but our application has encountered an error.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleReload}
            className="px-8 py-3 font-semibold rounded bg-red-500 text-gray-50 hover:bg-red-600"
          >
            Reload Page
          </button>
          <Link
            to="/"
            className="px-8 py-3 font-semibold rounded bg-cyan-500 text-gray-50 hover:bg-cyan-600"
          >
            Back to homepage
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default ErrorPage;
