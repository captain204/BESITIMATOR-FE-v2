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

interface Question {
  id: number;
  category: string;
  text: string;
  type: string;
  step: string;
}

const questionSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  details: yup.string().required("Details is required"),
  quantity: yup.string().required("Quantity is required"),
  price: yup.string().required("Price is required"),
});

const addQuestionSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    details: yup.string().required("Details is required"),
    quantity: yup.string().required("Quantity is required"),
    price: yup.string().required("Price is required"),
});

export default function Plans() {
  const [plans, setPlans] = useState<Question[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalOpenn, setIsModalOpenn] = useState<boolean>(false);
  const [editPlan, setEditPlan] = useState<Question | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState("");
  const [exportDropdownOpen, setExportDropdownOpen] = useState<boolean>(false);
  const [loadingPlans, setLoadingPlans] = useState<boolean>(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<any>(false);
  const [planToDelete, setPlanToDelete] = useState<Question | null>(null);

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
    resolver: yupResolver(addQuestionSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(questionSchema),
  });

  const fetchPlans = async () => {
    setLoadingPlans(true);
    try {
      const response = await axiosInstance.get("/api/admin/cost-trackers");
      setPlans(response.data.data);
    } catch (error) {
      console.error("Error fetching plans:", error);
    } finally {
      setLoadingPlans(false);
    }
  };
  // Fetch questions
  useEffect(() => {
    fetchPlans();
  }, []);

  const handleExport = (format: "pdf" | "xlsx") => {
    if (format === "xlsx") {
      const worksheet = XLSX.utils.json_to_sheet(plans);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Plans");
      XLSX.writeFile(workbook, "plans.xlsx");
    } else if (format === "pdf") {
      console.log("Exporting as PDF... (Implement PDF generation here)");
    }
  };

  const handleAddPlan = async (data: any): Promise<void> => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(
        "/api/admin/cost-trackers",
        data
      );
      setPlans([...plans, response.data]);
      resetAdd();
      setIsModalOpenn(false);
      fetchPlans();
      toast.warning("Plan added successfully!", {
        transition: Zoom,
        position: "top-right",
        icon: (
          <IoCheckmarkDoneCircleSharp className="text-yellow-700" size={24} />
        ),
      });
    } catch (error) {
      console.error("Error adding Plan:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (plan: any): void => {
    setEditPlan(plan);
    setIsModalOpen(true);
    reset(plan);
  };

  const handleUpdate = async (data: any): Promise<void> => {
    if (!editPlan) return;
    setLoading(true);
    try {
      await axiosInstance.put(`/api/admin/cost-tracker/${editPlan.id}`, data);
      setPlans((prev) =>
        prev.map((plan) =>
          plan.id === editPlan.id ? { ...editPlan, ...data } : plan
        )
      );
      setIsModalOpen(false);
      setEditPlan(null);
      fetchPlans();
      toast.warning("Plan updated successfully!", {
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

  const filteredQuestions = plans.filter((plan) => {
    const text = plan.text?.toLowerCase() || "";
    const type = plan.type?.toLowerCase() || "";
    return (
      text.includes(searchText.toLowerCase()) ||
      type.includes(searchText.toLowerCase())
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
    if (!planToDelete) return;
    try {
      await axiosInstance.delete(`/api/admin/cost-trackers/${planToDelete.id}`);

      setPlans((prev) => prev.filter((plan) => plan.id !== planToDelete.id));
      setIsDeleteModalOpen(false);
      setPlanToDelete(null);
      toast.warning("Question deleted successfully!", {
        transition: Zoom,
        position: "top-right",
        icon: (
          <IoCheckmarkDoneCircleSharp className="text-yellow-700" size={24} />
        ),
      });
    } catch (error) {
      console.error("Error deleting question:", error);
      toast.error("Failed to delete the question.");
    }
  };

  const columns = [
    {
      name: "Text",
      selector: (row: Question) => row.text,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row: Question) => row.type,
      sortable: true,
    },
    {
      name: "Step",
      selector: (row: Question) => row.step,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row: Question) => (
        <div className="flex space-x-4">
          <Tooltip content="Edit Question">
            <button
              onClick={() => handleEdit(row)}
              className="text-yellow-800 hover:text-yellow-600"
            >
              <FaEdit size={20} />
            </button>
          </Tooltip>
          <Tooltip content="Delete Question">
            <button
              onClick={() => {
                setIsDeleteModalOpen(true);
                setPlanToDelete(row);
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
              <FaPlus /> Add Question
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
            data={filteredQuestions}
            pagination
            className="bg-white"
            highlightOnHover
            pointerOnHover
            customStyles={customStyles}
            progressPending={loadingPlans}
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
          Edit Question
        </DialogHeader>
        <DialogBody>
          <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black">
                Text
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
             Quantity
              </label>
              <input
                type="text"
                {...register("quantity")}
                placeholder="Enter step"
                className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
              />
              <p className="text-red-500 text-xs">{errors.quantity?.message}</p>
            </div>


            <div>
              <label className="block text-sm font-medium text-black">
              Details
              </label>
              <textarea
                {...register("details")}
                placeholder="Enter step"
                className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
              />
              <p className="text-red-500 text-xs">{errors.details?.message}</p>
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
          Add Question
        </DialogHeader>
        <DialogBody>
          <form
            onSubmit={handleSubmitAdd(handleAddPlan)}
            className="space-y-4"
          >
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
              <p className="text-red-500 text-xs">{errors.name?.message}</p>
            </div>





          
            <div>
              <label className="block text-sm font-medium text-black">
             Quantity
              </label>
              <input
                type="text"
                {...registerAdd("quantity")}
                placeholder="Enter step"
                className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
              />
              <p className="text-red-500 text-xs">{errorsAdd.quantity?.message}</p>
            </div>


            <div>
              <label className="block text-sm font-medium text-black">
              Details
              </label>
              <textarea
                {...registerAdd("details")}
                placeholder="Enter step"
                className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
              />
              <p className="text-red-500 text-xs">{errorsAdd.details?.message}</p>
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
          Are you sure you want to delete the question:{" "}
          <span className="font-semibold">
            {planToDelete?.text || "this question"}
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
