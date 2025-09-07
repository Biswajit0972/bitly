// src/pages/NotFound.tsx
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="h-full w-full flex items-center justify-center text-gray-200">
            <div className="flex flex-col items-center text-center px-4 py-10">
                <h1 className="text-6xl sm:text-7xl font-extrabold tracking-tight text-white">404</h1>
                <p className="mt-4 text-lg sm:text-xl text-gray-400">
                    Oops! The page you’re looking for doesn’t exist.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium hover:bg-blue-500 transition-colors"
                    >
                        Go Home
                    </Link>
                    <Link
                        to="/login"
                        className="inline-flex items-center justify-center rounded-md border border-gray-700 px-5 py-2.5 text-sm font-medium hover:bg-gray-800 transition-colors"
                    >
                        Login
                    </Link>
                </div>

                <p className="mt-6 text-xs text-gray-500">
                    If you believe this is an error, please check the URL or navigate using the buttons above.
                </p>
            </div>
        </div>
    );
};

export default NotFound;