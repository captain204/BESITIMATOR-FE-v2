import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from "@material-tailwind/react";
import axiosInstance from "@/Globals/Interceptor";



const MaterialPriceList = () => {
  const [priceLists, setPriceLists] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // 'add' or 'edit'
  const [currentData, setCurrentData] = useState<any>(null);

  // Fetch Price Lists
  useEffect(() => {
    fetchPriceLists();
  }, []);


  const fetchPriceLists = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/api/admin/material-price-lists");
      const data = Array.isArray(response.data.data) ? response.data.data : []; // Ensure it's an array
      setPriceLists(data);
    } catch (error) {
      toast.error("Failed to fetch price lists");
    } finally {
      setLoading(false);
    }
  };
  

//   const fetchPriceLists = async () => {
//     setLoading(true);
//     try {
//       const response = await axiosInstance.get("/api/admin/material-price-lists");
//       setPriceLists(response.data);
//     } catch (error) {
//       toast.error("Failed to fetch price lists");
//     } finally {
//       setLoading(false);
//     }
//   };

  // Form Validation Schema
  const schema = yup.object().shape({
    price_group: yup.string().required("Price Group is required"),
    material: yup.string().required("Material is required"),
    specification: yup.string().required("Specification is required"),
    size: yup.string().required("Size is required"),
    low_price_point: yup.number().required("Low price point is required"),
    higher_price_point: yup.number().required("Higher price point is required"),
    average_price_point: yup.number().required("Average price point is required"),
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  // Add or Edit Price List
  const onSubmit = async (data:any) => {
    setLoading(true);
    try {
      if (modalType === "add") {
        await axiosInstance.post("/api/admin/material-price-lists", data);
        toast.success("Price list added successfully");
      } else if (modalType === "edit") {
        await axiosInstance.put(`/api/admin/material-price-lists/${currentData.id}`, data);
        toast.success("Price list updated successfully");
      }
      fetchPriceLists();
      closeModal();
    } catch (error) {
      toast.error("Failed to save price list");
    } finally {
      setLoading(false);
    }
  };

  // Delete Price List
  const deletePriceList = async (id:any) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/api/admin/material-price-lists/${id}`);
      toast.success("Price list deleted successfully");
      fetchPriceLists();
    } catch (error) {
      toast.error("Failed to delete price list");
    } finally {
      setLoading(false);
    }
  };

  // Modal Handlers
  const openModal = (type:any, data = null) => {
    setModalType(type);
    setCurrentData(data);
    reset(data || {}); // Reset form with data or empty
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalType("");
    setCurrentData(null);
    reset();
  };

  // Table Columns
  const columns = [
    { name: "Price Group", selector: (row:any) => row?.price_group || "N/A"},
    { name: "Material", selector: (row:any) => row?.material || "N/A" },
    { name: "Specification", selector: (row:any) => row?.specification || "N/A" },
    { name: "Size", selector: (row:any) => row.size || "N/A" },
    { name: "Low Price Point", selector: (row:any) => row?.low_price_point || "N/A" },
    { name: "Higher Price Point", selector: (row:any) => row?.higher_price_point  || "N/A"},
    { name: "Average Price Point", selector: (row:any) => row?.average_price_point|| "N/A" },
    {
      name: "Actions",
      cell: (row:any) => (
        <div className="flex space-x-2">
          <button
            onClick={() => openModal("edit", row)}
            className="bg-blue-500 text-white px-2 py-1 rounded"
          >
            Edit
          </button>
          <button
            onClick={() =>
              confirm("Are you sure you want to delete?") &&
              deletePriceList(row.id)
            }
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 mt-16">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Material Price List</h1>
        <button
          onClick={() => openModal("add")}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Price List
        </button>
      </div>
      <DataTable
        columns={columns}
        data={priceLists}
        progressPending={loading}
        pagination
      />

      {/* Material Tailwind Dialog */}
      <Dialog open={modalOpen} handler={closeModal}>
        <DialogHeader>
          {modalType === "add" ? "Add Price List" : "Edit Price List"}
        </DialogHeader>
        <DialogBody divider>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label>Price Group</label>
                <input
                  {...register("price_group")}
                  className="border p-2 w-full"
                />
                {errors.price_group && (
                  <p className="text-red-500 text-sm">{errors.price_group.message}</p>
                )}
              </div>
              <div>
                <label>Material</label>
                <input
                  {...register("material")}
                  className="border p-2 w-full"
                />
                {errors.material && (
                  <p className="text-red-500 text-sm">{errors.material.message}</p>
                )}
              </div>
              <div>
                <label>Specification</label>
                <input
                  {...register("specification")}
                  className="border p-2 w-full"
                />
                {errors.specification && (
                  <p className="text-red-500 text-sm">{errors.specification.message}</p>
                )}
              </div>
              <div>
                <label>Size</label>
                <input {...register("size")} className="border p-2 w-full" />
                {errors.size && (
                  <p className="text-red-500 text-sm">{errors.size.message}</p>
                )}
              </div>
              <div>
                <label>Low Price Point</label>
                <input
                  type="number"
                  {...register("low_price_point")}
                  className="border p-2 w-full"
                />
                {errors.low_price_point && (
                  <p className="text-red-500 text-sm">{errors.low_price_point.message}</p>
                )}
              </div>
              <div>
                <label>Higher Price Point</label>
                <input
                  type="number"
                  {...register("higher_price_point")}
                  className="border p-2 w-full"
                />
                {errors.higher_price_point && (
                  <p className="text-red-500 text-sm">
                    {errors.higher_price_point.message}
                  </p>
                )}
              </div>
              <div>
                <label>Average Price Point</label>
                <input
                  type="number"
                  {...register("average_price_point")}
                  className="border p-2 w-full"
                />
                {errors.average_price_point && (
                  <p className="text-red-500 text-sm">
                    {errors.average_price_point.message}
                  </p>
                )}
              </div>
            </div>
          </form>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={closeModal}
            className="mr-2"
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit(onSubmit)} className="bg-blue-500">
            Save
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default MaterialPriceList;
