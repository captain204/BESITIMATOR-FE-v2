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
import { AnyCnameRecord } from "dns";

// interface Pricelist {
//   id: number;
//   name: string;
//   description: string;
// }

export default function LabourPriceList() {
  const [priceLists, setPriceLists] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalOpenn, setIsModalOpenn] = useState<boolean>(false);
  const [editPriceList, setEditPriceList] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingg, setLoadingg] = useState<boolean>(false);
  const [loadinggg, setLoadinggg] = useState<boolean>(false);
  const [searchText, setSearchText] = useState("");
  const [exportDropdownOpen, setExportDropdownOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Add delete modal state
  const [pricelistToDelete, setPricelistToDelete] = useState<any | null>(
    null
  );

  const schemaEdit = yup.object().shape({
    area_of_work: yup.string().required("Area of work is required"),
    unit_of_costing: yup.string().required("Unit of costing is required"),
    lower_point_daily_rate_per_day: yup
      .string()
      .required("Lower point daily rate per day is required"),
    higher_point_daily_rate_per_day: yup
      .string()
      .required("Higher point daily rate per day is required"),
    average_point_daily_rate_per_day: yup
      .string()
      .required("Average point daily rate per day is required"),
    lower_point_daily_rate_per_unit: yup
      .string()
      .required("Lower point daily rate per unit is required"),
    higher_point_daily_rate_per_unit: yup
      .string()
      .required("Lower point daily rate per unit is required"),
    average_point_daily_rate_per_unit: yup
      .string()
      .required("average point daily rate per unit is required"),
  });

  const schemaAdd = yup.object().shape({
    area_of_work: yup.string().required("Area of work is required"),
    unit_of_costing: yup.string().required("Unit of costing is required"),
    lower_point_daily_rate_per_day: yup
      .string()
      .required("Lower point daily rate per day is required"),
    higher_point_daily_rate_per_day: yup
      .string()
      .required("Higher point daily rate per day is required"),
    average_point_daily_rate_per_day: yup
      .string()
      .required("Average point daily rate per day is required"),
    lower_point_daily_rate_per_unit: yup
      .string()
      .required("Lower point daily rate per unit is required"),
    higher_point_daily_rate_per_unit: yup
      .string()
      .required("Lower point daily rate per unit is required"),
    average_point_daily_rate_per_unit: yup
      .string()
      .required("average point daily rate per unit is required"),
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
        fontSize: "14px",
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

  useEffect(() => {
    fetchPriceLists();
  }, []);

  const fetchPriceLists = async () => {
    setLoadinggg(true);
    try {
      const response = await axiosInstance.get("/api/admin/labor-price-lists");
      const data = Array.isArray(response.data.data) ? response.data.data : [];
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
      XLSX.utils.book_append_sheet(workbook, worksheet, "Labour Price List");
      XLSX.writeFile(workbook, "labourPriceList.xlsx");
    } else if (format === "pdf") {
      console.log("Exporting as PDF... (Implement PDF generation here)");
    }
  };

  const handleAddPriceLists = async (data: any): Promise<void> => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        "/api/admin/labor-price-lists",
        data
      );
      setPriceLists([...priceLists, response.data]);
      resetAdd();
      setIsModalOpenn(false);
      fetchPriceLists();
      toast.warning("Material price List  added successfully!", {
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
        `/api/admin/labor-price-lists/${editPriceList.id}`,
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
        await axiosInstance.delete(`/api/admin/labor-price-lists/${id}`);
        setPriceLists(priceLists.filter((priceList) => priceList.id !== id));
        setIsDeleteModalOpen(false);
        toast.warning("Deleted successfully!", {
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
    const area_of_work = priceList?.area_of_work?.toLowerCase() || "";
    const unit_of_costing = priceList?.unit_of_costing?.toLowerCase() || "";
    const lower_point_daily_rate_per_day =
      priceList?.lower_point_daily_rate_per_day?.toLowerCase() || "";
    const higher_point_daily_rate_per_day =
      priceList?.higher_point_daily_rate_per_day?.toLowerCase() || "";
    const average_point_daily_rate_per_day =
      priceList?.average_point_daily_rate_per_day?.toLowerCase() || "";
    const lower_point_daily_rate_per_unit =
      priceList?.average_point_daily_rate_per_day?.toLowerCase() || "";
    const higher_point_daily_rate_per_unit =
      priceList?.higher_point_daily_rate_per_unit?.toLowerCase() || "";
    const average_point_daily_rate_per_unit =
      priceList?.higher_point_daily_rate_per_unit?.toLowerCase() || "";
    return (
      area_of_work.includes(searchText.toLowerCase()) ||
      unit_of_costing.includes(searchText.toLowerCase()) ||
      lower_point_daily_rate_per_day.includes(searchText.toLowerCase()) ||
      higher_point_daily_rate_per_day.includes(searchText.toLowerCase()) ||
      average_point_daily_rate_per_day.includes(searchText.toLowerCase()) ||
      lower_point_daily_rate_per_unit.includes(searchText.toLowerCase()) ||
      higher_point_daily_rate_per_unit.includes(searchText.toLowerCase()) ||
      average_point_daily_rate_per_unit.includes(searchText.toLowerCase())
    );
  });

  const columns = [
    {
      name: " Area of work",
      selector: (row: any) => row?.area_of_work || "N/A",
    },
    {
      name: " Unit of costing",
      selector: (row: any) => row?.unit_of_costing || "N/A",
    },
    {
      name: " Lower point daily rate  per day",
      selector: (row: any) => row?.lower_point_daily_rate_per_day || "N/A",
    },
    {
      name: "Higher point daily rate per day",
      selector: (row: any) => row.higher_point_daily_rate_per_day || "N/A",
    },
    {
      name: "Average point daily rate per day",
      selector: (row: any) => row?.average_point_daily_rate_per_day || "N/A",
    },
    {
      name: "Lower point daily rate per unit",
      selector: (row: any) => row?.lower_point_daily_rate_per_unit || "N/A",
    },
    {
      name: "Higher point daily rate per unit",
      selector: (row: any) => row?.higher_point_daily_rate_per_unit || "N/A",
    },

    {
      name: "Average point daily rate per unit",
      selector: (row: any) => row?.average_point_daily_rate_per_unit || "N/A",
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
      allowoverflow: true,
      button: true,
    },
  ];

  return (
    <div className="min-h-screen p-4 md:p-6">
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
        <DialogHeader className="justify-center items-center">
          Edit Price List
        </DialogHeader>
        <DialogBody>
          <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-black">Area of work</label>
                <input
                  {...register("area_of_work")}
                  className="border p-2 w-full"
                />
                {errors.area_of_work && (
                  <p className="text-red-500 text-sm">
                    {errors.area_of_work.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-black">Unit of costing</label>
                <input
                  {...register("unit_of_costing")}
                  className="border p-2 w-full"
                />
                {errors.unit_of_costing && (
                  <p className="text-red-500 text-sm">
                    {errors.unit_of_costing.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-black">
                  Lower point daily rate per day
                </label>
                <input
                  {...register("lower_point_daily_rate_per_day")}
                  className="border p-2 w-full"
                  
                />
                {errors.lower_point_daily_rate_per_day && (
                  <p className="text-red-500 text-sm">
                    {errors.lower_point_daily_rate_per_day.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-black">
                  Higher point daily rate per day
                </label>
                <input
                  {...register("higher_point_daily_rate_per_day")}
                  className="border p-2 w-full"
                  
                />
                {errors.higher_point_daily_rate_per_day && (
                  <p className="text-red-500 text-sm">
                    {errors.higher_point_daily_rate_per_day.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-black">
                  Average point daily rate per day
                </label>
                <input
                  
                  {...register("average_point_daily_rate_per_day")}
                  className="border p-2 w-full"
                />
                {errors.average_point_daily_rate_per_day && (
                  <p className="text-red-500 text-sm">
                    {errors.average_point_daily_rate_per_day.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-black">
                  Lower point daily rate per unit
                </label>
                <input
                  
                  {...register("lower_point_daily_rate_per_unit")}
                  className="border p-2 w-full"
                />
                {errors.lower_point_daily_rate_per_unit && (
                  <p className="text-red-500 text-sm">
                    {errors.lower_point_daily_rate_per_unit.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-black">
                  Higher point daily rate per unit
                </label>
                <input
                  
                  {...register("higher_point_daily_rate_per_unit")}
                  className="border p-2 w-full"
                />
                {errors.higher_point_daily_rate_per_unit && (
                  <p className="text-red-500 text-sm">
                    {errors.higher_point_daily_rate_per_unit.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-black">
                  Average point daily rate per unit
                </label>
                <input
                  
                  {...register("average_point_daily_rate_per_unit")}
                  className="border p-2 w-full"
                />
                {errors.average_point_daily_rate_per_unit && (
                  <p className="text-red-500 text-sm">
                    {errors.average_point_daily_rate_per_unit.message}
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
                <label className="text-black">Area of work</label>
                <input
                  {...registerAdd("area_of_work")}
                  className="border p-2 w-full"
                />
                {errorsAdd.area_of_work && (
                  <p className="text-red-500 text-sm">
                    {errorsAdd.area_of_work.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-black">Unit of costing</label>
                <input
                  {...registerAdd("unit_of_costing")}
                  className="border p-2 w-full"
                />
                {errorsAdd.unit_of_costing && (
                  <p className="text-red-500 text-sm">
                    {errorsAdd.unit_of_costing.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-black">
                  Lower point daily rate per day
                </label>
                <input
                  {...registerAdd("lower_point_daily_rate_per_day")}
                  className="border p-2 w-full"
                  
                />
                {errorsAdd.lower_point_daily_rate_per_day && (
                  <p className="text-red-500 text-sm">
                    {errorsAdd.lower_point_daily_rate_per_day.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-black">
                  Higher point daily rate per day
                </label>
                <input
                  {...registerAdd("higher_point_daily_rate_per_day")}
                  className="border p-2 w-full"
                  
                />
                {errorsAdd.higher_point_daily_rate_per_day && (
                  <p className="text-red-500 text-sm">
                    {errorsAdd.higher_point_daily_rate_per_day.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-black">
                  Average point daily rate per day
                </label>
                <input
                  
                  {...registerAdd("average_point_daily_rate_per_day")}
                  className="border p-2 w-full"
                />
                {errorsAdd.average_point_daily_rate_per_day && (
                  <p className="text-red-500 text-sm">
                    {errorsAdd.average_point_daily_rate_per_day.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-black">
                  Lower point daily rate per unit
                </label>
                <input
                  
                  {...registerAdd("lower_point_daily_rate_per_unit")}
                  className="border p-2 w-full"
                />
                {errorsAdd.lower_point_daily_rate_per_unit && (
                  <p className="text-red-500 text-sm">
                    {errorsAdd.lower_point_daily_rate_per_unit.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-black">
                  Higher point daily rate per unit
                </label>
                <input
                  
                  {...registerAdd("higher_point_daily_rate_per_unit")}
                  className="border p-2 w-full"
                />
                {errorsAdd.higher_point_daily_rate_per_unit && (
                  <p className="text-red-500 text-sm">
                    {errorsAdd.higher_point_daily_rate_per_unit.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-black">
                  Average point daily rate per unit
                </label>
                <input
                  
                  {...registerAdd("average_point_daily_rate_per_unit")}
                  className="border p-2 w-full"
                />
                {errorsAdd.average_point_daily_rate_per_unit && (
                  <p className="text-red-500 text-sm">
                    {errorsAdd.average_point_daily_rate_per_unit.message}
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
            Are you sure you want to delete "{pricelistToDelete?.area_of_work }"?
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
