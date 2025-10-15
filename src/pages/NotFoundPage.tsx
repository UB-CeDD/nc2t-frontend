import React from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";

const NotFoundPage: React.FC = () => {
  return (
    <MainLayout>
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-800">404</h1>
        <p className="text-2xl font-semibold md:text-3xl">
          Sorry, we couldn't find this page.
        </p>
        <p className="mt-4 mb-8 text-gray-600">
          But dont worry, you can find plenty of other things on our homepage.
        </p>
        <Link
          to="/"
          className="px-8 py-3 font-semibold rounded bg-cyan-500 text-gray-50 hover:bg-cyan-600"
        >
          Back to homepage
        </Link>
      </div>
    </MainLayout>
  );
};

export default NotFoundPage;
