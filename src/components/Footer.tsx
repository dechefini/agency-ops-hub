
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-xl font-semibold text-gradient">
              AgencyOS
            </Link>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              The all-in-one platform for AI agencies
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 tracking-wider uppercase">
              Product
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/dashboard" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/proposals" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400">
                  Proposals
                </Link>
              </li>
              <li>
                <Link to="/clients" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400">
                  Client CRM
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 tracking-wider uppercase">
              Resources
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400">
                  Template Gallery
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 tracking-wider uppercase">
              Legal
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400">
                  GDPR Compliance
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} AgencyOS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
