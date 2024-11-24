// components/DashboardCards.jsx
import { FaUsers, FaDollarSign, FaBullhorn } from 'react-icons/fa';

export default function DashboardCards() {
  return (
    <div className="mt-20 bg-gray-100 flex items-center justify-center p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {/* Number of Users */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center hover:shadow-xl transition-shadow">
          <div className="bg-blue-500 text-white p-4 rounded-full mb-4">
            <FaUsers size={30} />
          </div>
          <h2 className="text-lg font-bold text-gray-800">Number of Users</h2>
          <p className="text-2xl font-semibold text-gray-600 mt-2">1,234</p>
        </div>

        {/* Total Payments */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center hover:shadow-xl transition-shadow">
          <div className="bg-green-500 text-white p-4 rounded-full mb-4">
            <FaDollarSign size={30} />
          </div>
          <h2 className="text-lg font-bold text-gray-800">Total Payments</h2>
          <p className="text-2xl font-semibold text-gray-600 mt-2">$45,678</p>
        </div>

        {/* Adverts */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center hover:shadow-xl transition-shadow">
          <div className="bg-orange-500 text-white p-4 rounded-full mb-4">
            <FaBullhorn size={30} />
          </div>
          <h2 className="text-lg font-bold text-gray-800">Adverts</h2>
          <p className="text-2xl font-semibold text-gray-600 mt-2">56</p>
        </div>
      </div>
    </div>
  );
}
