import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import {
  FaBan,
  FaUndo,
  FaSpinner,
  FaSearch,
  FaFileExport,
  FaChevronDown,
  FaFilePdf,
  FaFileExcel,
} from "react-icons/fa";
import axiosInstance from "@/Globals/Interceptor";
import { toast } from "react-toastify";
import { Spinner } from "@material-tailwind/react";
import * as XLSX from "xlsx";

const BannedUsers = () => {
  const [users, setUsers] = useState([]);
  const [actionLoading, setActionLoading] = useState(null);
  const [loadingUsers, setLoadingUsers] = useState<boolean>(true);
  const [response, setResponse] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");
  const [exportDropdownOpen, setExportDropdownOpen] = useState<boolean>(false);

  const customStyles: any = {
    title: {
      style: {
        fontColor: "blue",
        fontWeight: "bold",
      },
    },
    rows: {
      style: {
        minHeight: "50px",
      },
    },
    headCells: {
      style: {
        fontSize: "13px",
        fontWeight: "bold",
        textTransform: "uppercase",
        paddingLeft: "10px",
        backgroundColor: "#F6F9FC",
      },
    },
    cells: {
      style: {
        fontSize: "14px",
        paddingLeft: "10px",
      },
    },
  };

  const handleExport = (format: "pdf" | "xlsx") => {
    if (format === "xlsx") {
      const worksheet = XLSX.utils.json_to_sheet(response);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "BannedUsers");
      XLSX.writeFile(workbook, "BannedUsers.xlsx");
    } else if (format === "pdf") {
      console.log("Exporting as PDF... (Implement PDF generation here)");
    }
  };

  const filteredQuestions = response.filter((response) => {
    const name = response.name?.toLowerCase() || "";

    return name.includes(searchText.toLowerCase());
  });

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const response = await axiosInstance.get("/api/admin/banned-users");
      setUsers(response.data.data);
      setResponse(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Ban a user
  const handleBan = async (id: any) => {
    setActionLoading(id);
    try {
      await axiosInstance.put(`/api/admin/ban/${id}`);

      setUsers((prevUsers: any) =>
        prevUsers.map((user: any) =>
          user.id === id ? { ...user, is_banned: true } : user
        )
      );

      toast.success("User banned Successfully");
      fetchUsers();
    } catch (error) {
      console.error("Error banning user:", error);
    } finally {
      setActionLoading(null);
    }
  };

  // Unban a user
  const handleUnban = async (id: any) => {
    setActionLoading(id); // Set the loading state for the specific user
    try {
      await axiosInstance.patch(`/api/admin/${id}/unban`);
      // Update the user's status locally after a successful unban
      setUsers((prevUsers: any) =>
        prevUsers.map((user: any) =>
          user.id === id ? { ...user, is_banned: false } : user
        )
      );

      fetchUsers();

      toast.success("User unbanned Successfully");
    } catch (error) {
      console.error("Error unbanning user:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const columns = [
    // {
    //   name: "ID",
    //   selector: (row: any) => row.id,
    //   sortable: true,
    // },
    {
      name: "Name",
      selector: (row: any) => `${row?.name}`,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row: any) => row.email,
      sortable: true,
    },
    // {
    //   name: "Country",
    //   selector: (row: any) => row?.profile?.country,
    //   sortable: true,
    // },
    // {
    //   name: "Phone",
    //   selector: (row: any) => row?.profile?.phone,
    //   sortable: true,
    // },
    {
      name: "Role",
      selector: (row: any) => (row.role === 0 ? "User" : "Admin"),
    },
    {
      name: "Banned",
      selector: (row: any) => (row.is_banned ? "Yes" : "No"),
    },
    {
      name: "Created At",
      selector: (row: any) => new Date(row.created_at).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row: any) => (
        <div className="flex items-center gap-2">
          {actionLoading === row.id ? (
            <div className="flex items-center">
              <FaSpinner
                className="animate-spin text-blue-500 mr-2"
                size={16}
              />
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
    <div className="min-h-screen p-4 md:p-6 ">
      <div className="max-w-6xl mx-auto border shadow-lg bg-white rounded-lg p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 mb-6">
          <div className="relative w-full sm:w-auto">
            <FaSearch className="absolute top-2/4 left-3 transform -translate-y-2/4 text-gray-400" />
            <input
              type="text"
              placeholder="Search questions..."
              className="w-full pl-10 pr-4 py-2 border rounded-md text-gray-700"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2">
            <div
              className="relative"
              onMouseEnter={() => setExportDropdownOpen(true)}
              onMouseLeave={() => setExportDropdownOpen(false)}
            >
              <button className="bg-black text-white flex items-center gap-2 py-2 px-4 rounded-md">
                <FaFileExport /> Export <FaChevronDown />
              </button>
              {exportDropdownOpen && (
                <div className="absolute z-50 right-0 bg-white border rounded shadow-md w-32">
                  <button
                    onClick={() => handleExport("pdf")}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    <div className="flex">
                      <FaFilePdf className="mr-2 text-red-500" />{" "}
                      <span className="text-sm"> PDF </span>
                    </div>
                  </button>
                  <button
                    onClick={() => handleExport("xlsx")}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    <div className="flex">
                      <FaFileExcel className="mr-2 text-green-500" />{" "}
                      <span className="text-sm"> XLSX </span>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <DataTable
            columns={columns}
            data={filteredQuestions}
            customStyles={customStyles}
            pagination
            highlightOnHover
            striped
            className="bg-white shadow-md rounded"
            progressPending={loadingUsers}
            progressComponent={
              <div className="flex justify-center items-center py-10">
                <Spinner className="h-12 w-12 text-yellow-800" />
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default BannedUsers;

// import React, { useState, useEffect } from "react";
// import DataTable from "react-data-table-component";
// import axiosInstance from "@/Globals/Interceptor";
// import { Spinner } from "@material-tailwind/react";

// const BannedUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [loadingUsers, setLoadingUsers] = useState<boolean>(true);

//   const customStyles: any = {
//     title: {
//       style: {
//         fontColor: "blue",
//         fontWeight: "bold",
//       },
//     },
//     rows: {
//       style: {
//         minHeight: "50px",
//       },
//     },
//     headCells: {
//       style: {
//         fontSize: "13px",
//         fontWeight: "bold",
//         textTransform: "uppercase",
//         paddingLeft: "10px",
//         backgroundColor: "#F6F9FC",
//       },
//     },
//     cells: {
//       style: {
//         fontSize: "14px",
//         paddingLeft: "10px",
//       },
//     },
//   };

//   // Fetch users from the API
//   useEffect(() => {
//     setLoadingUsers(true);
//     const fetchUsers = async () => {
//       try {
//         const response = await axiosInstance.get("/api/admin/banned-users");
//         setUsers(response.data.data);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       } finally {
//         setLoadingUsers(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   // Define columns for the data table
//   const columns = [
//     {
//       name: "ID",
//       selector: (row: any) => row.id,
//       sortable: true,
//     },
//     {
//       name: "Name",
//       selector: (row: any) => `${row?.profile?.name} `,
//       sortable: true,
//     },
//     // {
//     //   name: "Email",
//     //   selector: (row: any) => row.email,
//     //   sortable: true,
//     // },
//     // {
//     //   name: "Country",
//     //   selector: (row: any) => row?.profile?.country,
//     //   sortable: true,
//     // },
//     // {
//     //   name: "Phone",
//     //   selector: (row: any) => row?.profile?.phone,
//     //   sortable: true,
//     // },
//     {
//       name: "Role",
//       selector: (row: any) => (row.role === 0 ? "User" : "Admin"),
//     },
//     {
//       name: "Banned",
//       selector: (row: any): any => (row.is_banned ? "Yes" : "No"),
//     },
//     {
//       name: "Created At",
//       selector: (row: any) => new Date(row.created_at).toLocaleDateString(),
//       sortable: true,
//     },
//   ];

//   return (
//     <div className="p-5">
//       <DataTable
//         columns={columns}
//         customStyles={customStyles}
//         data={users}
//         pagination
//         highlightOnHover
//         striped
//         className="bg-white shadow-md rounded"
//         progressPending={loadingUsers}
//         progressComponent={
//           <div className="flex justify-center items-center py-10">
//             <Spinner className="h-12 w-12 text-yellow-800" />
//           </div>
//         }
//       />
//     </div>
//   );
// };

// export default BannedUsers;
