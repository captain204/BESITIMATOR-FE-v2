import { useState, useEffect } from "react";
import {
  FaUsers,
  FaMoneyBillWave,
  FaBullhorn,
  FaChartPie,
  FaStar,
  FaHourglassHalf,
  FaExclamationTriangle,
} from "react-icons/fa";

export default function DashboardCards() {
  const [data, setData] = useState({
    allUsers: 500,
    verifiedUsers: 300,
    bannedUsers: 50,
    unverifiedUsers: 150,
    totalPayments: 1200,
    totalAdverts: 80,
    estimateTypes: { automated: 60, custom: 30 },
    userRatings: { satisfaction: 4.5, demographics: "18-35" },
    sessionDuration: "5m 32s",
    errorRate: "2.3%",
  });

  useEffect(() => {
    // Example for fetching data dynamically (currently using dummy data)
    const fetchData = async () => {
      try {
        // Fetch or calculate data here
        // const response = await axiosInstance.get("/api/dashboard-metrics");
        // setData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className=" md:p-6 p-4">
      <div className=" flex items-center justify-center ">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
          {/* Total Users */}
          <DashboardCard
            title="All Users"
            value={data.allUsers}
            icon={<FaUsers size={20} />}
            bgColor="bg-blue-500"
          />

          {/* Total Payments */}
          <DashboardCard
            title="Total Payments"
            value={data.totalPayments}
            icon={<FaMoneyBillWave size={20} />}
            bgColor="bg-purple-500"
          />

          {/* Total Adverts */}
          <DashboardCard
            title="Total Adverts"
            value={data.totalAdverts}
            icon={<FaBullhorn size={20} />}
            bgColor="bg-orange-500"
          />

          {/* Session Duration */}
          <DashboardCard
            title="Session Duration"
            value={data.sessionDuration}
            icon={<FaHourglassHalf size={20} />}
            bgColor="bg-cyan-500"
          />

          {/* Error Rates */}
          <DashboardCard
            title="Error Rate"
            value={data.errorRate}
            icon={<FaExclamationTriangle size={20} />}
            bgColor="bg-pink-500"
          />

          {/* Estimate Types */}
          {/* Budget: ${data.estimateTypes.budget} */}
          <DashboardCard
            title="Estimate Types"
            value={
              <span className="text-sm">{`Auto: ${data.estimateTypes.automated}, Custom: ${data.estimateTypes.custom}`}</span>
            }
            icon={<FaChartPie size={20} />}
            bgColor="bg-teal-500"
          />

          {/* User Ratings */}
          <DashboardCard
            title="User Ratings"
            value={
              <span className="text-sm">{`Rating: ${data.userRatings.satisfaction}, Demo: ${data.userRatings.demographics}`}</span>
            }
            icon={<FaStar size={20} />}
            bgColor="bg-indigo-500"
          />
        </div>
      </div>
    </div>
  );
}

function DashboardCard({ title, value, icon, bgColor }: any) {
  return (
    <div className="bg-white border shadow-lg rounded-lg p-4 flex flex-col items-center hover:shadow-xl transition-shadow">
      <div className={`${bgColor} text-white p-2 rounded-full mb-4`}>
        {icon}
      </div>
      <h2 className="text-lg font-bold text-gray-800">{title}</h2>
      <p className="text-2xl font-semibold text-gray-600 mt-2">{value}</p>
    </div>
  );
}
