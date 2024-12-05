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

interface Category {
  id: number;
  name: string;
  description: string;
}

const categorySchema = yup.object().shape({
  name: yup.string().required("Category name is required"),
  description: yup.string().required("Description is required"),
});

const categorySchemaAdd = yup.object().shape({
  name: yup.string().required("Category name is required"),
  description: yup.string().required("Description is required"),
});

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalOpenn, setIsModalOpenn] = useState<boolean>(false);
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingg, setLoadingg] = useState<boolean>(false);
  const [loadinggg, setLoadinggg] = useState<boolean>(false);
  const [searchText, setSearchText] = useState("");
  const [exportDropdownOpen, setExportDropdownOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Add delete modal state
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null
  ); // Add selected category to delete
  // const [loadingCategories, setLoadingCategories] = useState<boolean>(true);

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
    resolver: yupResolver(categorySchema),
  });

  const {
    register: registerAdd,
    handleSubmit: handleSubmitAdd,
    formState: { errors: errorsAdd },
    reset: resetAdd,
  } = useForm({
    resolver: yupResolver(categorySchemaAdd),
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

  const fetchCategories = async () => {
    setLoadinggg(true);
    try {
      const response = await axiosInstance.get("/api/admin/categories");
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Error fetching Category:", error);
    } finally {
      setLoadinggg(false);
    }
  };
  // Fetch questions
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleExport = (format: "pdf" | "xlsx") => {
    if (format === "xlsx") {
      const worksheet = XLSX.utils.json_to_sheet(categories);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Categories");
      XLSX.writeFile(workbook, "categories.xlsx");
    } else if (format === "pdf") {
      console.log("Exporting as PDF... (Implement PDF generation here)");
    }
  };

  const handleAddCategory = async (data: any): Promise<void> => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/api/admin/categories", data);
      setCategories([...categories, response.data]);
      resetAdd();
      setIsModalOpenn(false);
      fetchCategories();
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

  const handleEdit = (category: Category): void => {
    setEditCategory(category);
    setIsModalOpen(true);
    reset(category);
  };

  const handleUpdate = async (data: any): Promise<void> => {
    if (!editCategory) return;
    setLoadingg(true);
    try {
      await axiosInstance.put(`/api/admin/categories/${editCategory.id}`, data);
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === editCategory.id ? { ...editCategory, ...data } : cat
        )
      );
      setIsModalOpen(false);
      setEditCategory(null);
      fetchCategories();
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
    if (categoryToDelete) {
      try {
        await axiosInstance.delete(`/api/admin/categories/${id}`);
        setCategories(categories.filter((category) => category.id !== id));
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

  const filteredCategories = categories.filter((category) => {
    const name = category.name?.toLowerCase() || "";
    const description = category.description?.toLowerCase() || "";
    return (
      name.includes(searchText.toLowerCase()) ||
      description.includes(searchText.toLowerCase())
    );
  });

  const columns = [
    {
      name: "Name",
      selector: (row: Category) => row.name,
      sortable: true,
      className: "font-bold",
    }, // Add font-bold class
    {
      name: "Description",
      selector: (row: Category) => row.description,
      sortable: true,
      width: "200px"
    },
    {
      name: "Actions",
      cell: (row: Category) => (
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
                setCategoryToDelete(row);
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
              <FaPlus /> Add Category
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
            data={filteredCategories}
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
        <DialogHeader className="justify-center items-center">Edit Category</DialogHeader>
        <DialogBody>
          <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black ">
                Category Name
              </label>
              <input
                type="text"
                {...register("name")}
                placeholder="Enter category name"
                className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
              />
              <p className="text-red-500 text-xs">{errors.name?.message}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-black">
                Description
              </label>
              <input
                type="text"
                {...register("description")}
                placeholder="Enter category description"
                className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
              />
              <p className="text-red-500 text-xs">
                {errors.description?.message}
              </p>
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
        <DialogHeader>Add Category</DialogHeader>
        <DialogBody>
          <form
            onSubmit={handleSubmitAdd(handleAddCategory)}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-black">
                Category Name
              </label>
              <input
                type="text"
                {...registerAdd("name")}
                placeholder="Enter category name"
                className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
              />
              <p className="text-red-500 text-xs">{errorsAdd.name?.message}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-black">
                Description
              </label>
              <input
                type="text"
                {...registerAdd("description")}
                placeholder="Enter category description"
                className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
              />
              <p className="text-red-500 text-xs">
                {errorsAdd.description?.message}
              </p>
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
            Are you sure you want to delete "{categoryToDelete?.name}"?
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
              onClick={() => handleDelete(categoryToDelete?.id ?? 0)}
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
