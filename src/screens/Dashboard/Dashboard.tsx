import { useState, useEffect } from "react";
import {
  FaUsers,
  FaCheckCircle,
  FaBan,
  FaUserClock,
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
    estimateTypes: { automated: 60, custom: 30, budget: 10 },
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
    <div className="mt-20 flex items-center justify-center p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {/* Total Users */}
        <DashboardCard
          title="All Users"
          value={data.allUsers}
          icon={<FaUsers size={20} />}
          bgColor="bg-blue-500"
        />

        {/* Verified Users */}
        {/* <DashboardCard
          title="Verified Users"
          value={data.verifiedUsers}
          icon={<FaCheckCircle size={20} />}
          bgColor="bg-green-500"
        /> */}

        {/* Banned Users */}
        {/* <DashboardCard
          title="Banned Users"
          value={data.bannedUsers}
          icon={<FaBan size={20} />}
          bgColor="bg-red-500"
        /> */}

        {/* Unverified Users */}
        {/* <DashboardCard
          title="Unverified Users"
          value={data.unverifiedUsers}
          icon={<FaUserClock size={20} />}
          bgColor="bg-yellow-500"
        /> */}

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
        <DashboardCard
          title="Estimate Types"
          value={
            <span className="text-sm">{`Auto: ${data.estimateTypes.automated}, Custom: ${data.estimateTypes.custom}, Budget: ${data.estimateTypes.budget}`}</span>
          }
          icon={<FaChartPie size={30} />}
          bgColor="bg-teal-500"
        />

        {/* User Ratings */}
        <DashboardCard
          title="User Ratings"
          value={
            <span className="text-sm">{`Rating: ${data.userRatings.satisfaction}, Demo: ${data.userRatings.demographics}`}</span>
          }
          icon={<FaStar size={30} />}
          bgColor="bg-indigo-500"
        />
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

// import { useState, useEffect } from "react";
// import { FaUsers, FaCheckCircle, FaBan, FaUserClock } from "react-icons/fa";
// import axiosInstance from "@/Globals/Interceptor";

// export default function DashboardCards() {
//   const [counts, setCounts] = useState({
//     allUsers: 0,
//     verifiedUsers: 0,
//     bannedUsers: 0,
//     unverifiedUsers: 0,
//   });

//   useEffect(() => {
//     const fetchCounts = async () => {
//       try {
//         const [allUsers, verifiedUsers, bannedUsers, unverifiedUsers] =
//           await Promise.all([
//             axiosInstance.get("/api/admin/users/count"),
//             axiosInstance.get("/api/admin/verified-users/count"),
//             axiosInstance.get("/api/admin/banned-users/count"),
//             axiosInstance.get("/api/admin/unverified-users/count"),
//           ]);

//         setCounts({
//           allUsers: allUsers.data.total_users,
//           verifiedUsers: verifiedUsers.data.total_verified_users,
//           bannedUsers: bannedUsers.data.total_banned_users,
//           unverifiedUsers: unverifiedUsers.data.total_unverified_users,
//         });
//       } catch (error) {
//         console.error("Error fetching counts:", error);
//       }
//     };

//     fetchCounts();
//   }, []);

//   return (
//     <div className="mt-20 bg-gray-100 flex items-center justify-center p-6">
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full max-w-5xl">
//         {/* Total Users */}
//         <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center hover:shadow-xl transition-shadow">
//           <div className="bg-blue-500 text-white p-4 rounded-full mb-4">
//             <FaUsers size={30} />
//           </div>
//           <h2 className="text-lg font-bold text-gray-800">All Users</h2>
//           <p className="text-2xl font-semibold text-gray-600 mt-2">
//             {counts.allUsers}
//           </p>
//         </div>

//         {/* Verified Users */}
//         <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center hover:shadow-xl transition-shadow">
//           <div className="bg-green-500 text-white p-4 rounded-full mb-4">
//             <FaCheckCircle size={30} />
//           </div>
//           <h2 className="text-lg font-bold text-gray-800">Verified Users</h2>
//           <p className="text-2xl font-semibold text-gray-600 mt-2">
//             {counts.verifiedUsers}
//           </p>
//         </div>

//         {/* Banned Users */}
//         <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center hover:shadow-xl transition-shadow">
//           <div className="bg-red-500 text-white p-4 rounded-full mb-4">
//             <FaBan size={30} />
//           </div>
//           <h2 className="text-lg font-bold text-gray-800">Banned Users</h2>
//           <p className="text-2xl font-semibold text-gray-600 mt-2">
//             {counts.bannedUsers}
//           </p>
//         </div>

//         {/* Unverified Users */}
//         <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center hover:shadow-xl transition-shadow">
//           <div className="bg-yellow-500 text-white p-4 rounded-full mb-4">
//             <FaUserClock size={30} />
//           </div>
//           <h2 className="text-lg font-bold text-gray-800">Unverified Users</h2>
//           <p className="text-2xl font-semibold text-gray-600 mt-2">
//             {counts.unverifiedUsers}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
