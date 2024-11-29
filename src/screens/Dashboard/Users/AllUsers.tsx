import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FaBan, FaUndo, FaSpinner } from "react-icons/fa";
import axiosInstance from "@/Globals/Interceptor";
import { toast } from "react-toastify";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null); // Tracks action loading for specific user ID

  // Fetch users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/api/admin/users");
        setUsers(response.data.data);
        
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Ban a user
  const handleBan = async (id:any) => {
    setActionLoading(id); 
    try {
      await axiosInstance.put(`/api/admin/ban/${id}`);
     
      setUsers((prevUsers:any) =>
        prevUsers.map((user:any) =>
          user.id === id ? { ...user, is_banned: true } : user
        )
      );

      toast.success("User banned Successfully")
    } catch (error) {
      console.error("Error banning user:", error);
    } finally {
      setActionLoading(null); 
    }
  };

  // Unban a user
  const handleUnban = async (id:any) => {
    setActionLoading(id); // Set the loading state for the specific user
    try {
      await axiosInstance.patch(`/api/admin/${id}/unban`);
      // Update the user's status locally after a successful unban
      setUsers((prevUsers:any) =>
        prevUsers.map((user:any) =>
          user.id === id ? { ...user, is_banned: false } : user
        )
      );

      toast.success("User unbanned Successfully")
    } catch (error) {
      console.error("Error unbanning user:", error);
    } finally {
      setActionLoading(null); 
    }
  };

 
  const columns = [
    {
      name: "ID",
      selector: (row:any) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row:any) => `${row?.profile?.firstname} ${row?.profile?.lastname}`,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row:any) => row.email,
      sortable: true,
    },
    {
      name: "Country",
      selector: (row:any) => row?.profile?.country,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row:any) => row?.profile?.phone,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row:any) => (row.role === 0 ? "User" : "Admin"),
    },
    {
      name: "Banned",
      selector: (row:any) => (row.is_banned ? "Yes" : "No"),
    },
    {
      name: "Created At",
      selector: (row:any) => new Date(row.created_at).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row:any) => (
        <div className="flex items-center gap-2">
          {actionLoading === row.id ? (
            <div className="flex items-center">
              <FaSpinner className="animate-spin text-blue-500 mr-2" size={16} />
              <span className="text-blue-500 font-semibold">Processing...</span>
            </div>
          ) : row.is_banned ? (
            <button
              onClick={() => handleUnban(row.id)}
              className="flex items-center text-green-500 hover:text-green-700"
            >
              <FaUndo size={16} className="mr-1" />
              <span>Unban</span>
            </button>
          ) : (
            <button
              onClick={() => handleBan(row.id)}
              className="flex items-center text-red-500 hover:text-red-700"
            >
              <FaBan size={16} className="mr-1" />
              <span>Ban</span>
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="p-5 bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 mt-16">Users List</h1>
      <DataTable
        columns={columns}
        data={users}
        progressPending={loading}
        pagination
        highlightOnHover
        striped
        className="bg-white shadow-md rounded"
      />
    </div>
  );
};

export default UsersTable;
















// import React, { useState, useEffect } from "react";
// import DataTable from "react-data-table-component";
// import axiosInstance from "@/Globals/Interceptor";

// const UsersTable = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);


//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axiosInstance.get("/api/admin/users");
//         setUsers(response.data.data); 
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       } finally {
//         setLoading(false); 
//       }
//     };

//     fetchUsers();
//   }, []);

//   // Define columns for the data table
//   const columns = [
//     {
//       name: "ID",
//       selector: (row:any) => row.id,
//       sortable: true,
//     },
//     {
//       name: "Name",
//       selector: (row:any) => `${row?.profile?.firstname} ${row?.profile?.lastname}`,
//       sortable: true,
//     },
//     {
//       name: "Email",
//       selector: (row:any) => row.email,
//       sortable: true,
//     },
//     {
//       name: "Country",
//       selector: (row:any) => row?.profile?.country,
//       sortable: true,
//     },
//     {
//       name: "Phone",
//       selector: (row:any) => row?.profile?.phone,
//       sortable: true,
//     },
//     {
//       name: "Role",
//       selector: (row:any) => (row.role === 0 ? "User" : "Admin"),
//     },
//     {
//       name: "Banned",
//       selector: (row:any):any => (row.is_banned ? "Yes" : "No"),
//     },
//     {
//       name: "Created At",
//       selector: (row:any) => new Date(row.created_at).toLocaleDateString(),
//       sortable: true,
//     },
//   ];

//   return (
//     <div className="p-5 bg-gray-100">
//       <h1 className="text-2xl font-bold text-gray-800 mb-4 mt-16">Users List</h1>
//       <DataTable
//         columns={columns}
//         data={users}
//         progressPending={loading}
//         pagination
//         highlightOnHover
//         striped
//         className="bg-white shadow-md rounded"
//       />
//     </div>
//   );
// };

// export default UsersTable;
