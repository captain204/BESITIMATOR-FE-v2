// components/ResultSent.js
export default function ResultSent() {
  return (
    <div className="flex items-center justify-center mt-10 ">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg text-center border">
        <div className="mb-6">
          <svg
            className="w-16 h-16 text-green-500 mx-auto"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2l4-4m6 2a9 9 0 11-18 0a9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Results Sent Successfully!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for using{" "}
          <span className="font-semibold">Building Estimator</span>. Your
          results have been sent to your email (
          <span className="font-semibold text-black">
            austineblaise@gmail.com
          </span>
          ). Please check your inbox (or spam folder).
        </p>
        <p className="text-gray-600 mb-6">
          If you have any questions or need further assistance, feel free to
          contact us at{" "}
          <a
            href="mailto:support@buildingestimator.com"
            className="text-blue-500 underline"
          >
            support@buildingestimator.com
          </a>
          .
        </p>
        <button
          onClick={() => (window.location.href = "/")}
          className="bg-yellow-800 text-white px-6 py-3 rounded-lg shadow  focus:outline-none focus:ring-2  focus:ring-offset-2"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
