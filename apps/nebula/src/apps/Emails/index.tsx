import { themeColor } from "../../Router";

export default function EmailCard() {
  return (
    <div>
      <div
        className={`max-w-sm p-6 bg-${themeColor} border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700`}
      >
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Send Emails</h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Use this to send email easily</p>
        <a
          href="#"
          className={`inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-${themeColor}-300 rounded-lg hover:bg-${themeColor}-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-${themeColor}-600 dark:hover:bg-${themeColor}-700 dark:focus:ring-${themeColor}-800`}
        >
          Access Now
        </a>
      </div>
    </div>
  );
}
