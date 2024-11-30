import { useState, useEffect } from "react";
import axiosInstance from "@/Globals/Interceptor";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  FaEdit,
  FaTrashAlt,
  FaPlus,
  FaSearch,
  FaFileExport,
  FaFilePdf,
  FaFileExcel,
  FaChevronDown,
} from "react-icons/fa";
import DataTable from "react-data-table-component";
import "react-toastify/dist/ReactToastify.css";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Spinner,
} from "@material-tailwind/react";
import * as XLSX from "xlsx";
import { Tooltip } from "@material-tailwind/react";
import { toast, Zoom } from "react-toastify";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";

interface Pricelist {
  id: number;
  name: string;
  description: string;
}

export default function MaterialPriceList() {
  const [priceLists, setPriceLists] = useState<Pricelist[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalOpenn, setIsModalOpenn] = useState<boolean>(false);
  const [editPriceList, setEditPriceList] = useState<Pricelist | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingg, setLoadingg] = useState<boolean>(false);
  const [loadinggg, setLoadinggg] = useState<boolean>(false);
  const [searchText, setSearchText] = useState("");
  const [exportDropdownOpen, setExportDropdownOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Add delete modal state
  const [pricelistToDelete, setPricelistToDelete] = useState<Pricelist | null>(
    null
  ); // Add selected category to delete
  const [loadingCategories, setLoadingCategories] = useState<boolean>(true);
  // const [priceLists, setPriceLists] = useState<any>([]);

  const schemaEdit = yup.object().shape({
    price_group: yup.string().required("Price Group is required"),
    material: yup.string().required("Material is required"),
    specification: yup.string().required("Specification is required"),
    size: yup.string().required("Size is required"),
    low_price_point: yup.number().required("Low price point is required"),
    higher_price_point: yup.number().required("Higher price point is required"),
    average_price_point: yup
      .number()
      .required("Average price point is required"),
  });

  const schemaAdd = yup.object().shape({
    price_group: yup.string().required("Price Group is required"),
    material: yup.string().required("Material is required"),
    specification: yup.string().required("Specification is required"),
    size: yup.string().required("Size is required"),
    low_price_point: yup.number().required("Low price point is required"),
    higher_price_point: yup.number().required("Higher price point is required"),
    average_price_point: yup
      .number()
      .required("Average price point is required"),
  });

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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schemaEdit),
  });

  const {
    register: registerAdd,
    handleSubmit: handleSubmitAdd,
    formState: { errors: errorsAdd },
    reset: resetAdd,
  } = useForm({
    resolver: yupResolver(schemaAdd),
  });

  // useEffect(() => {
  //   setLoadinggg(true);
  //   axiosInstance
  //     .get("/api/admin/categories")
  //     .then((response) => {
  //       setCategories(response.data.categories);
  //     })
  //     .catch((error) => console.error("Error fetching categories:", error));
  //   setLoadinggg(false);
  // }, []);

  // Fetch Price Lists
  useEffect(() => {
    fetchPriceLists();
  }, []);

  const fetchPriceLists = async () => {
    setLoadinggg(true);
    try {
      const response = await axiosInstance.get(
        "/api/admin/material-price-lists"
      );
      const data = Array.isArray(response.data.data) ? response.data.data : []; // Ensure it's an array
      setPriceLists(data);
    } catch (error) {
      toast.error("Failed to fetch price lists");
    } finally {
      setLoadinggg(false);
    }
  };

  const handleExport = (format: "pdf" | "xlsx") => {
    if (format === "xlsx") {
      const worksheet = XLSX.utils.json_to_sheet(priceLists);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Material Price List");
      XLSX.writeFile(workbook, "categories.xlsx");
    } else if (format === "pdf") {
      console.log("Exporting as PDF... (Implement PDF generation here)");
    }
  };

  const handleAddPriceLists = async (data: any): Promise<void> => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        "/api/admin/material-price-lists",
        data
      );
      setPriceLists([...priceLists, response.data]);
      resetAdd();
      setIsModalOpenn(false);
      fetchPriceLists();
      toast.warning("Category added successfully!", {
        transition: Zoom,
        position: "top-right",
        icon: (
          <IoCheckmarkDoneCircleSharp className="text-yellow-700" size={24} />
        ),
      });
    } catch (error) {
      console.error("Error adding category:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category: any): void => {
    setEditPriceList(category);
    setIsModalOpen(true);
    reset(category);
  };

  const handleUpdate = async (data: any): Promise<void> => {
    if (!editPriceList) return;
    setLoadingg(true);
    try {
      await axiosInstance.put(
        `/api/admin/material-price-lists/${editPriceList.id}`,
        data
      );
      setPriceLists((prev) =>
        prev.map((cat) =>
          cat.id === editPriceList.id ? { ...editPriceList, ...data } : cat
        )
      );
      setIsModalOpen(false);
      setEditPriceList(null);
      fetchPriceLists();
      toast.warning("Category updated successfully!", {
        transition: Zoom,
        position: "top-right",
        icon: (
          <IoCheckmarkDoneCircleSharp className="text-yellow-700" size={24} />
        ),
      });
    } catch (error) {
      console.error("Error updating category:", error);
    } finally {
      setLoadingg(false);
    }
  };

  const handleDelete = async (id: number): Promise<void> => {
    if (pricelistToDelete) {
      try {
        await axiosInstance.delete(`/api/admin/material-price-lists/${id}`);
        setPriceLists(priceLists.filter((priceList) => priceList.id !== id));
        setIsDeleteModalOpen(false);
        toast.warning("Category deleted successfully!", {
          transition: Zoom,
          position: "top-right",
          icon: (
            <IoCheckmarkDoneCircleSharp className="text-yellow-700" size={24} />
          ),
        });
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  const filteredPriceLists = priceLists.filter((priceList: any) => {
    //     { name: "Price Group", selector: (row:any) => row?.price_group || "N/A"},
    //     { name: "Material", selector: (row:any) => row?.material || "N/A" },
    //     { name: "Specification", selector: (row:any) => row?.specification || "N/A" },
    //     { name: "Size", selector: (row:any) => row.size || "N/A" },
    //     { name: "Low Price Point", selector: (row:any) => row?.low_price_point || "N/A" },
    //     { name: "Higher Price Point", selector: (row:any) => row?.higher_price_point  || "N/A"},
    //     { name: "Average Price Point", selector: (row:any) => row?.average_price_point|| "N/A" },
    const pricegroup = priceList?.price_group?.toLowerCase() || "";
    const material = priceList?.material?.toLowerCase() || "";
    const specification = priceList?.specification?.toLowerCase() || "";
    // const lowpricepoint:any = priceList?.low_price_point.toLowerCase() || "";
    // const higherpricepoint = priceList?.higher_price_point?.toLowerCase() || "";
    const averagepricepoint = priceList?.averagepricepoint?.toLowerCase() || "";

    return (
      pricegroup.includes(searchText.toLowerCase()) ||
      material.includes(searchText.toLowerCase()) ||
      specification.includes(searchText.toLowerCase()) ||
      // lowpricepoint.includes(searchText.toLowerCase()) ||
      // higherpricepoint.includes(searchText.toLowerCase()) ||
      averagepricepoint.includes(searchText.toLowerCase())
    );
  });

  const columns = [
    { name: "Price Group", selector: (row: any) => row?.price_group || "N/A" },
    { name: "Material", selector: (row: any) => row?.material || "N/A" },
    {
      name: "Specification",
      selector: (row: any) => row?.specification || "N/A",
    },
    { name: "Size", selector: (row: any) => row.size || "N/A" },
    {
      name: "Low Price Point",
      selector: (row: any) => row?.low_price_point || "N/A",
    },
    {
      name: "Higher Price Point",
      selector: (row: any) => row?.higher_price_point || "N/A",
    },
    {
      name: "Average Price Point",
      selector: (row: any) => row?.average_price_point || "N/A",
    },

    {
      name: "Actions",
      cell: (row: any) => (
        <div className="flex space-x-4">
          <Tooltip content="Edit Category">
            <button
              onClick={() => handleEdit(row)}
              className="text-yellow-800 hover:text-yellow-600"
            >
              <FaEdit size={20} />
            </button>
          </Tooltip>
          <Tooltip content="Delete Category">
            <button
              onClick={() => {
                setPricelistToDelete(row);
                setIsDeleteModalOpen(true);
              }}
              className="text-red-500 hover:text-red-600"
            >
              <FaTrashAlt size={20} />
            </button>
          </Tooltip>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="min-h-screen p-4 md:p-6 mt-16">
      <div className="max-w-6xl mx-auto border shadow-lg bg-white rounded-lg p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 mb-6">
          <div className="relative w-full sm:w-auto">
            <FaSearch className="absolute top-2/4 left-3 transform -translate-y-2/4 text-gray-400" />
            <input
              type="text"
              placeholder="Search categories..."
              className="w-full pl-10 pr-4 py-2 border rounded-md text-gray-700"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2">
            <button
              onClick={() => setIsModalOpenn(true)}
              className="bg-yellow-800 text-white flex items-center gap-2 py-2 px-4 rounded-md"
            >
              <FaPlus /> Add Price List
            </button>
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
            data={filteredPriceLists}
            pagination
            className="bg-white"
            highlightOnHover
            pointerOnHover
            customStyles={customStyles}
            progressPending={loadinggg}
            progressComponent={
              <div className="flex justify-center items-center py-10">
                <Spinner className="h-12 w-12 text-yellow-800" />
              </div>
            }
          />
        </div>
      </div>

      {/* Edit Category Modal */}

      <Dialog open={isModalOpen} handler={() => setIsModalOpen(false)}>
        <DialogHeader className="justify-center items-center">Edit Price List</DialogHeader>
        <DialogBody>
          <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-black">Price Group</label>
                <input
                  {...register("price_group")}
                  className="border p-2 w-full"
                />
                {errors.price_group && (
                  <p className="text-red-500 text-sm">
                    {errors.price_group.message}
                  </p>
                )}
              </div>
              <div>
                <label className="text-black">Material</label>
                <input
                  {...register("material")}
                  className="border p-2 w-full"
                />
                {errors.material && (
                  <p className="text-red-500 text-sm">
                    {errors.material.message}
                  </p>
                )}
              </div>
              <div>
                <label className="text-black">Specification</label>
                <input
                  {...register("specification")}
                  className="border p-2 w-full"
                />
                {errors.specification && (
                  <p className="text-red-500 text-sm">
                    {errors.specification.message}
                  </p>
                )}
              </div>
              <div>
                <label className="text-black">Size</label>
                <input {...register("size")} className="border p-2 w-full" />
                {errors.size && (
                  <p className="text-red-500 text-sm">{errors.size.message}</p>
                )}
              </div>
              <div>
                <label className="text-black">Low Price Point</label>
                <input
                  type="number"
                  {...register("low_price_point")}
                  className="border p-2 w-full"
                />
                {errors.low_price_point && (
                  <p className="text-red-500 text-sm">
                    {errors.low_price_point.message}
                  </p>
                )}
              </div>
              <div>
                <label className="text-black">Higher Price Point</label>
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
                <label className="text-black">Average Price Point</label>
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
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="bg-red-800 text-white py-2 px-4 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-yellow-800 text-white py-2 px-4 rounded-md"
              >
                {loading ? "Saving..." : "Update"}
              </button>
            </div>
          </form>
        </DialogBody>
      </Dialog>

      <Dialog open={isModalOpenn} handler={() => setIsModalOpenn(false)}>
        <DialogHeader>Add Price List</DialogHeader>
        <DialogBody>
          <form
            onSubmit={handleSubmitAdd(handleAddPriceLists)}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label>Price Group</label>
                <input
                  {...registerAdd("price_group")}
                  className="border p-2 w-full"
                />
                {errorsAdd.price_group && (
                  <p className="text-red-500 text-sm">
                    {errorsAdd.price_group.message}
                  </p>
                )}
              </div>
              <div>
                <label>Material</label>
                <input
                  {...registerAdd("material")}
                  className="border p-2 w-full"
                />
                {errorsAdd.material && (
                  <p className="text-red-500 text-sm">
                    {errorsAdd.material.message}
                  </p>
                )}
              </div>
              <div>
                <label>Specification</label>
                <input
                  {...registerAdd("specification")}
                  className="border p-2 w-full"
                />
                {errorsAdd.specification && (
                  <p className="text-red-500 text-sm">
                    {errorsAdd.specification.message}
                  </p>
                )}
              </div>
              <div>
                <label>Size</label>
                <input {...registerAdd("size")} className="border p-2 w-full" />
                {errorsAdd.size && (
                  <p className="text-red-500 text-sm">{errorsAdd.size.message}</p>
                )}
              </div>
              <div>
                <label>Low Price Point</label>
                <input
                  type="number"
                  {...registerAdd("low_price_point")}
                  className="border p-2 w-full"
                />
                {errorsAdd.low_price_point && (
                  <p className="text-red-500 text-sm">
                    {errorsAdd.low_price_point.message}
                  </p>
                )}
              </div>
              <div>
                <label>Higher Price Point</label>
                <input
                  type="number"
                  {...registerAdd("higher_price_point")}
                  className="border p-2 w-full"
                />
                {errorsAdd.higher_price_point && (
                  <p className="text-red-500 text-sm">
                    {errorsAdd.higher_price_point.message}
                  </p>
                )}
              </div>
              <div>
                <label>Average Price Point</label>
                <input
                  type="number"
                  {...registerAdd("average_price_point")}
                  className="border p-2 w-full"
                />
                {errorsAdd.average_price_point && (
                  <p className="text-red-500 text-sm">
                    {errorsAdd.average_price_point.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsModalOpenn(false)}
                className="bg-red-800 text-white py-2 px-4 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-yellow-800 text-white py-2 px-4 rounded-md"
              >
                {loading ? "Saving..." : "Add"}
              </button>
            </div>
          </form>
        </DialogBody>
      </Dialog>

      {/* Delete Category Confirmation Modal */}
      <Dialog
        open={isDeleteModalOpen}
        handler={() => setIsDeleteModalOpen(false)}
      >
        <DialogHeader className="text-black">Delete Category</DialogHeader>
        <DialogBody>
          <p className="text-black">
            Are you sure you want to delete "{pricelistToDelete?.name}"?
          </p>
        </DialogBody>
        <DialogFooter>
          <div className="space-x-2">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={() => handleDelete(pricelistToDelete?.id ?? 0)}
              className="bg-red-600 text-white py-2 px-4 rounded-md"
            >
              Delete
            </button>
          </div>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import DataTable from "react-data-table-component";
// import { useForm } from "react-hook-form";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from "@material-tailwind/react";
// import axiosInstance from "@/Globals/Interceptor";

// const MaterialPriceList = () => {
//   const [priceLists, setPriceLists] = useState<any>([]);
//   const [loading, setLoading] = useState(false);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalType, setModalType] = useState("");
//   const [currentData, setCurrentData] = useState<any>(null);

//   // Fetch Price Lists
//   useEffect(() => {
//     fetchPriceLists();
//   }, []);

//   const fetchPriceLists = async () => {
//     setLoading(true);
//     try {
//       const response = await axiosInstance.get("/api/admin/material-price-lists");
//       const data = Array.isArray(response.data.data) ? response.data.data : []; // Ensure it's an array
//       setPriceLists(data);
//     } catch (error) {
//       toast.error("Failed to fetch price lists");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Form Validation Schema
//   const schema = yup.object().shape({
//     price_group: yup.string().required("Price Group is required"),
//     material: yup.string().required("Material is required"),
//     specification: yup.string().required("Specification is required"),
//     size: yup.string().required("Size is required"),
//     low_price_point: yup.number().required("Low price point is required"),
//     higher_price_point: yup.number().required("Higher price point is required"),
//     average_price_point: yup.number().required("Average price point is required"),
//   });

//   const { register, handleSubmit, reset, formState: { errors } } = useForm({
//     resolver: yupResolver(schema),
//   });

//   // Add or Edit Price List
//   const onSubmit = async (data:any) => {
//     setLoading(true);
//     try {
//       if (modalType === "add") {
//         await axiosInstance.post("/api/admin/material-price-lists", data);
//         toast.success("Price list added successfully");
//       } else if (modalType === "edit") {
//         await axiosInstance.put(`/api/admin/material-price-lists/${currentData.id}`, data);
//         toast.success("Price list updated successfully");
//       }
//       fetchPriceLists();
//       closeModal();
//     } catch (error) {
//       toast.error("Failed to save price list");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete Price List
//   const deletePriceList = async (id:any) => {
//     setLoading(true);
//     try {
//       await axiosInstance.delete(`/api/admin/material-price-lists/${id}`);
//       toast.success("Price list deleted successfully");
//       fetchPriceLists();
//     } catch (error) {
//       toast.error("Failed to delete price list");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Modal Handlers
//   const openModal = (type:any, data = null) => {
//     setModalType(type);
//     setCurrentData(data);
//     reset(data || {}); // Reset form with data or empty
//     setModalOpen(true);
//   };

//   const closeModal = () => {
//     setModalOpen(false);
//     setModalType("");
//     setCurrentData(null);
//     reset();
//   };

//   // Table Columns
//   const columns = [
//     { name: "Price Group", selector: (row:any) => row?.price_group || "N/A"},
//     { name: "Material", selector: (row:any) => row?.material || "N/A" },
//     { name: "Specification", selector: (row:any) => row?.specification || "N/A" },
//     { name: "Size", selector: (row:any) => row.size || "N/A" },
//     { name: "Low Price Point", selector: (row:any) => row?.low_price_point || "N/A" },
//     { name: "Higher Price Point", selector: (row:any) => row?.higher_price_point  || "N/A"},
//     { name: "Average Price Point", selector: (row:any) => row?.average_price_point|| "N/A" },
//     {
//       name: "Actions",
//       cell: (row:any) => (
//         <div className="flex space-x-2">
//           <button
//             onClick={() => openModal("edit", row)}
//             className="bg-blue-500 text-white px-2 py-1 rounded"
//           >
//             Edit
//           </button>
//           <button
//             onClick={() =>
//               confirm("Are you sure you want to delete?") &&
//               deletePriceList(row.id)
//             }
//             className="bg-red-500 text-white px-2 py-1 rounded"
//           >
//             Delete
//           </button>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <div className="p-4 mt-16">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Material Price List</h1>
//         <button
//           onClick={() => openModal("add")}
//           className="bg-green-500 text-white px-4 py-2 rounded"
//         >
//           Add Price List
//         </button>
//       </div>
//       <DataTable
//         columns={columns}
//         data={priceLists}
//         progressPending={loading}
//         pagination
//       />

//       {/* Material Tailwind Dialog */}
//       <Dialog open={modalOpen} handler={closeModal}>
//         <DialogHeader>
//           {modalType === "add" ? "Add Price List" : "Edit Price List"}
//         </DialogHeader>
//         <DialogBody divider>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label>Price Group</label>
//                 <input
//                   {...register("price_group")}
//                   className="border p-2 w-full"
//                 />
//                 {errors.price_group && (
//                   <p className="text-red-500 text-sm">{errors.price_group.message}</p>
//                 )}
//               </div>
//               <div>
//                 <label>Material</label>
//                 <input
//                   {...register("material")}
//                   className="border p-2 w-full"
//                 />
//                 {errors.material && (
//                   <p className="text-red-500 text-sm">{errors.material.message}</p>
//                 )}
//               </div>
//               <div>
//                 <label>Specification</label>
//                 <input
//                   {...register("specification")}
//                   className="border p-2 w-full"
//                 />
//                 {errors.specification && (
//                   <p className="text-red-500 text-sm">{errors.specification.message}</p>
//                 )}
//               </div>
//               <div>
//                 <label>Size</label>
//                 <input {...register("size")} className="border p-2 w-full" />
//                 {errors.size && (
//                   <p className="text-red-500 text-sm">{errors.size.message}</p>
//                 )}
//               </div>
//               <div>
//                 <label>Low Price Point</label>
//                 <input
//                   type="number"
//                   {...register("low_price_point")}
//                   className="border p-2 w-full"
//                 />
//                 {errors.low_price_point && (
//                   <p className="text-red-500 text-sm">{errors.low_price_point.message}</p>
//                 )}
//               </div>
//               <div>
//                 <label>Higher Price Point</label>
//                 <input
//                   type="number"
//                   {...register("higher_price_point")}
//                   className="border p-2 w-full"
//                 />
//                 {errors.higher_price_point && (
//                   <p className="text-red-500 text-sm">
//                     {errors.higher_price_point.message}
//                   </p>
//                 )}
//               </div>
//               <div>
//                 <label>Average Price Point</label>
//                 <input
//                   type="number"
//                   {...register("average_price_point")}
//                   className="border p-2 w-full"
//                 />
//                 {errors.average_price_point && (
//                   <p className="text-red-500 text-sm">
//                     {errors.average_price_point.message}
//                   </p>
//                 )}
//               </div>
//             </div>
//           </form>
//         </DialogBody>
//         <DialogFooter>
//           <Button
//             variant="text"
//             color="red"
//             onClick={closeModal}
//             className="mr-2"
//           >
//             Cancel
//           </Button>
//           <Button onClick={handleSubmit(onSubmit)} className="bg-blue-500">
//             Save
//           </Button>
//         </DialogFooter>
//       </Dialog>
//     </div>
//   );
// };

// export default MaterialPriceList;
