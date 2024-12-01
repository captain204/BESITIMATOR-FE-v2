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

// interface Question {
//   id: number;
//   category: string;
//   text: string;
//   type: string;
//   step: string;
// }

const SuboptionSchema = yup.object().shape({
  option_id: yup.string().required("Option is required"),
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  type: yup.string().oneOf(["form", "dropdown"]).required("Type is required"),
  question: yup.string().required("Question is required"),
  is_required: yup.boolean().required("Is required required is required"),
});

const addSubOptionSchema = yup.object().shape({
  option_id: yup.string().required("Option is required"),
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  type: yup.string().oneOf(["form", "dropdown"]).required("Type is required"),
  question: yup.string().required("Question is required"),
  is_required: yup.boolean().required("Is required is required"),
});

export default function SubOptionAdmin() {
  const [options, setOptions] = useState<any[]>([]);
  const [suboptions, setSubOptions] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalOpenn, setIsModalOpenn] = useState<boolean>(false);
  const [editSubOption, setEditSubOption] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState("");
  const [exportDropdownOpen, setExportDropdownOpen] = useState<boolean>(false);
  const [loadingSubOptions, setLoadingSubOptions] = useState<boolean>(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<any>(false);
  const [suboptionToDelete, setSubOptionToDelete] = useState<any | null>(null);

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
    register: registerAdd,
    handleSubmit: handleSubmitAdd,
    formState: { errors: errorsAdd },
    reset: resetAdd,
  } = useForm({
    resolver: yupResolver(addSubOptionSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(SuboptionSchema),
  });

  const fetchSubOptions = async () => {
    setLoadingSubOptions(true);
    try {
      const response = await axiosInstance.get("/api/admin/suboptions");
      setSubOptions(response.data);
    } catch (error) {
      console.error("Error fetching options:", error);
    } finally {
      setLoadingSubOptions(false);
    }
  };
  // Fetch questions
  useEffect(() => {
    fetchSubOptions();
  }, []);

  const fetchOptions = async () => {
    setLoadingSubOptions(true);
    try {
      const response = await axiosInstance.get("/api/admin/options");
      setOptions(response.data);
    } catch (error) {
      console.error("Error fetching options:", error);
    } finally {
      setLoadingSubOptions(false);
    }
  };
  // Fetch questions
  useEffect(() => {
    fetchOptions();
  }, []);

  const handleExport = (format: "pdf" | "xlsx") => {
    if (format === "xlsx") {
      const worksheet = XLSX.utils.json_to_sheet(suboptions);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "SubOptions");
      XLSX.writeFile(workbook, "suboptions.xlsx");
    } else if (format === "pdf") {
      console.log("Exporting as PDF... (Implement PDF generation here)");
    }
  };

  const handleAddSubOption = async (data: any): Promise<void> => {
    setLoading(true);
    try {
      // const response = await axiosInstance.post("/api/admin/suboptions", data);
      // setSubOptions([...suboptions, response.data]);

      const formattedData = {
        ...data,
        is_required: data.is_required === "true",
      };
      const response = await axiosInstance.post(
        "/api/admin/suboptions",
        formattedData
      );
      setSubOptions([...suboptions, response.data]);

      resetAdd();
      setIsModalOpenn(false);
      fetchSubOptions();
      toast.warning("Option added successfully!", {
        transition: Zoom,
        position: "top-right",
        icon: (
          <IoCheckmarkDoneCircleSharp className="text-yellow-700" size={24} />
        ),
      });
    } catch (error) {
      console.error("Error adding Question:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (question: any): void => {
    setEditSubOption(question);
    setIsModalOpen(true);
    reset(question);
  };

  const handleUpdate = async (data: any): Promise<void> => {
    if (!editSubOption) return;
    setLoading(true);
    try {
      await axiosInstance.put(
        `/api/admin/suboptions/${editSubOption.id}`,
        data
      );
      setSubOptions((prev) =>
        prev.map((subOption) =>
          subOption.id === editSubOption.id
            ? { ...editSubOption, ...data }
            : subOption
        )
      );
      setIsModalOpen(false);
      setEditSubOption(null);
      fetchSubOptions();
      toast.warning("Option updated successfully!", {
        transition: Zoom,
        position: "top-right",
        icon: (
          <IoCheckmarkDoneCircleSharp className="text-yellow-700" size={24} />
        ),
      });
    } catch (error) {
      console.error("Error updating question:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredOptions = suboptions.filter((suboption) => {
    const type = suboption.text?.toLowerCase() || "";
    const name = suboption.name?.toLowerCase() || "";
    const description = suboption.description?.toLowerCase() || "";
    const question = suboption.question?.toLowerCase() || "";
    return (
      type.includes(searchText.toLowerCase()) ||
      name.includes(searchText.toLowerCase()) ||
      description.includes(searchText.toLowerCase()) ||
      question.includes(searchText.toLowerCase())
    );
  });

  // const handleDelete = async (id:any) => {
  //    if (confirm("Are you sure you want to delete this question?")) {
  //     try {
  //      await axiosInstance.delete(`/api/admin/questions/${id}`);
  //      toast.success("Question deleted successfully!");
  //      const response = await axiosInstance.get("/api/admin/questions");
  //       setQuestions(response.data);
  //     } catch (error) {
  //       console.error("Error deleting question:", error);
  //     }
  //   }
  // };

  const handleDelete = async (): Promise<void> => {
    if (!suboptionToDelete) return;
    try {
      await axiosInstance.delete(
        `/api/admin/suboptions/${suboptionToDelete.id}`
      );

      setSubOptions((prev) =>
        prev.filter((subOption) => subOption.id !== suboptionToDelete.id)
      );
      setIsDeleteModalOpen(false);
      setSubOptionToDelete(null);
      toast.warning(" Deleted successfully!", {
        transition: Zoom,
        position: "top-right",
        icon: (
          <IoCheckmarkDoneCircleSharp className="text-yellow-700" size={24} />
        ),
      });

      fetchSubOptions();
    } catch (error) {
      console.error("Error deleting question:", error);
      toast.error("Failed to delete the question.");
    }
  };

  const columns = [
    {
      name: "Name",
      selector: (row: any) => row.name,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row: any) => row.type,
      sortable: true,
    },
    // {
    //   name: "Step",
    //   selector: (row: any) => row.step,
    //   sortable: true,
    // },
    // {
    //     name: "Mechanical",
    //     selector: (row: any) => row.Mechanical,
    //     sortable: true,
    //   },

    {
      name: "Description",
      selector: (row: any) => row.description,
      sortable: true,
    },

    {
      name: "Question",
      selector: (row: any) => row.question,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row: any) => (
        <div className="flex space-x-4">
          <Tooltip content="Edit">
            <button
              onClick={() => handleEdit(row)}
              className="text-yellow-800 hover:text-yellow-600"
            >
              <FaEdit size={20} />
            </button>
          </Tooltip>
          <Tooltip content="Delete">
            <button
              onClick={() => {
                setIsDeleteModalOpen(true);
                setSubOptionToDelete(row);
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
              placeholder="Search questions..."
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
              <FaPlus /> Add SubOption
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
            data={filteredOptions}
            pagination
            className="bg-white"
            highlightOnHover
            pointerOnHover
            customStyles={customStyles}
            progressPending={loadingSubOptions}
            progressComponent={
              <div className="flex justify-center items-center py-10">
                <Spinner className="h-12 w-12 text-yellow-800" />
              </div>
            }
          />
        </div>
      </div>

      {/* Add/Edit Question Modal */}
      <Dialog open={isModalOpen} handler={() => setIsModalOpen(false)}>
        <DialogHeader className="flex justify-center items-center">
          Edit SubOption
        </DialogHeader>
        <DialogBody>
          <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black">
                Option
              </label>
              <select
                {...register("option_id")}
                className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white text-black"
              >
                <option value="">Select Option</option>

                {options.map((option: any) => (
                  <option key={option.id} value={option.id}>
                    {option?.name}
                  </option>
                ))}
              </select>
              <p className="text-red-500 text-xs">
                {errors.option_id?.message}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-black">
                Name
              </label>
              <input
                type="text"
                {...register("name")}
                placeholder="Enter question text"
                className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
              />
              <p className="text-red-500 text-xs">{errors.name?.message}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-black">
                Type
              </label>
              <select
                {...register("type")}
                className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white text-black"
              >
                <option value="">Select Type</option>
                <option value="form">Form</option>
                <option value="dropdown">Dropdown</option>
              </select>
              <p className="text-red-500 text-xs">{errors.type?.message}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-black">
                Is required?
              </label>
              <select
                {...register("is_required")}
                className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white text-black"
              >
                <option value="">Select Type</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
              <p className="text-red-500 text-xs">
                {errors.is_required?.message}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-black">
                Qustion
              </label>
              <input
                type="text"
                {...register("question")}
                placeholder="Enter step"
                className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
              />
              <p className="text-red-500 text-xs">{errors.question?.message}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-black">
                Description
              </label>
              <input
                type="text"
                {...register("description")}
                placeholder="Enter description"
                className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
              />
              <p className="text-red-500 text-xs">
                {errors.description?.message}
              </p>
            </div>

            <DialogFooter>
              <div className="space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-red-800 text-white py-2 px-4 rounded-md nr-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-yellow-800 text-white rounded-md py-2 px-4"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Update"}
                </button>
              </div>
            </DialogFooter>
          </form>
        </DialogBody>
      </Dialog>

      <Dialog open={isModalOpenn} handler={() => setIsModalOpenn(false)}>
        <DialogHeader className="flex justify-center items-center">
          Add Sub Option
        </DialogHeader>
        <DialogBody>
          <form
            onSubmit={handleSubmitAdd(handleAddSubOption)}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-black">
                Option
              </label>
              <select
                {...registerAdd("option_id")}
                className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white text-black"
              >
                <option value="">Select Option</option>

                {options.map((option: any) => (
                  <option key={option.id} value={option.id}>
                    {option?.name}
                  </option>
                ))}
              </select>
              <p className="text-red-500 text-xs">
                {errorsAdd.option_id?.message}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-black">
                Name
              </label>
              <input
                type="text"
                {...registerAdd("name")}
                placeholder="Enter question text"
                className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
              />
              <p className="text-red-500 text-xs">{errorsAdd.name?.message}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-black">
                Type
              </label>
              <select
                {...registerAdd("type")}
                className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white text-black"
              >
                <option value="">Select Type</option>
                <option value="form">Form</option>
                <option value="dropdown">Dropdown</option>
              </select>
              <p className="text-red-500 text-xs">{errorsAdd.type?.message}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-black">
                Is required?
              </label>
              <select
                {...registerAdd("is_required")}
                className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white text-black"
              >
                <option value="">Select Type</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
              <p className="text-red-500 text-xs">
                {errorsAdd.is_required?.message}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-black">
                Qustion
              </label>
              <input
                type="text"
                {...registerAdd("question")}
                placeholder="Enter step"
                className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
              />
              <p className="text-red-500 text-xs">
                {errorsAdd.question?.message}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-black">
                Description
              </label>
              <input
                type="text"
                {...registerAdd("description")}
                placeholder="Enter description"
                className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
              />
              <p className="text-red-500 text-xs">
                {errorsAdd.description?.message}
              </p>
            </div>

            <DialogFooter>
              <div className="space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpenn(false)}
                  className="bg-red-800 text-white py-2 px-4 rounded-md nr-4"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-yellow-800 text-white rounded-md py-2 px-4"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Add Question"}
                </button>
              </div>
            </DialogFooter>
          </form>
        </DialogBody>
      </Dialog>

      <Dialog
        open={isDeleteModalOpen}
        handler={() => setIsDeleteModalOpen(false)}
      >
        <DialogHeader>Confirm Delete</DialogHeader>
        <DialogBody>
          Are you sure you want to delete the Option:{" "}
          <span className="font-semibold">
            {suboptionToDelete?.name || "this suboption"}
          </span>
          ?
        </DialogBody>
        <DialogFooter>
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded-md"
            onClick={() => setIsDeleteModalOpen(false)}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-md ml-2"
            onClick={handleDelete}
          >
            Delete
          </button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
