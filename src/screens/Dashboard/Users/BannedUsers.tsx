import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axiosInstance from "@/Globals/Interceptor";

const BannedUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/api/admin/banned-users");
        setUsers(response.data.data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchUsers();
  }, []);

  // Define columns for the data table
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
      selector: (row:any):any => (row.is_banned ? "Yes" : "No"),
    },
    {
      name: "Created At",
      selector: (row:any) => new Date(row.created_at).toLocaleDateString(),
      sortable: true,
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

export default  BannedUsers;
