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
  category_id: yup.string().required("Category is required"),
  text: yup.string().required("Text is required"),
  type: yup.string().oneOf(["form", "dropdown"]).required("Type is required"),
  step: yup.string().required("Step is required"),
});

const addQuestionSchema = yup.object().shape({
  category_id: yup.string().required("Category is required"),
  text: yup.string().required("Text is required"),
  type: yup.string().oneOf(["form", "dropdown"]).required("Type is required"),
  step: yup.string().required("Step is required"),
});

export default function Categories() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalOpenn, setIsModalOpenn] = useState<boolean>(false);
  const [editQuestion, setEditQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState("");
  const [exportDropdownOpen, setExportDropdownOpen] = useState<boolean>(false);
  const [loadingQuestions, setLoadingQuestions] = useState<boolean>(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<any>(false);
  const [questionToDelete, setQuestionToDelete] = useState<Question | null>(
    null
  );

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
    register: rigisterAdd,
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

  const fetchQuestions = async () => {
    setLoadingQuestions(true);
    try {
      const response = await axiosInstance.get("/api/admin/questions");
      setQuestions(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoadingQuestions(false);
    }
  };
  // Fetch questions
  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/api/admin/categories");
        console.log("Categories API response:", response.data.categories);
        const data = Array.isArray(response.data.categories)
          ? response.data.categories
          : [];
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);
  const handleExport = (format: "pdf" | "xlsx") => {
    if (format === "xlsx") {
      const worksheet = XLSX.utils.json_to_sheet(questions);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Questions");
      XLSX.writeFile(workbook, "questions.xlsx");
    } else if (format === "pdf") {
      console.log("Exporting as PDF... (Implement PDF generation here)");
    }
  };

  const handleAddQuestion = async (data: any): Promise<void> => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/api/admin/questions", data);
      setQuestions([...questions, response.data]);
      resetAdd();
      setIsModalOpenn(false);
      fetchQuestions();
      toast.warning("Question added successfully!", {
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
    setEditQuestion(question);
    setIsModalOpen(true);
    reset(question);
  };

  const handleUpdate = async (data: any): Promise<void> => {
    if (!editQuestion) return;
    setLoading(true);
    try {
      await axiosInstance.put(`/api/admin/questions/${editQuestion.id}`, data);
      setQuestions((prev) =>
        prev.map((question) =>
          question.id === editQuestion.id
            ? { ...editQuestion, ...data }
            : question
        )
      );
      setIsModalOpen(false);
      setEditQuestion(null);
      fetchQuestions();
      toast.warning("Category updated successfully!", {
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

  const filteredQuestions = questions.filter((question) => {
    const text = question.text?.toLowerCase() || "";
    const type = question.type?.toLowerCase() || "";
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
    if (!questionToDelete) return;
    try {
      await axiosInstance.delete(`/api/admin/questions/${questionToDelete.id}`);

      setQuestions((prev) =>
        prev.filter((question) => question.id !== questionToDelete.id)
      );
      setIsDeleteModalOpen(false);
      setQuestionToDelete(null);
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
                setQuestionToDelete(row);
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
            progressPending={loadingQuestions}
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
                Category
              </label>
              <select
                {...register("category_id")}
                className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white text-black"
              >
                <option value="">Select Category</option>

                {categories.map((category: any) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <p className="text-red-500 text-xs">
                {errors.category_id?.message}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-black">
                Text
              </label>
              <input
                type="text"
                {...register("text")}
                placeholder="Enter question text"
                className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
              />
              <p className="text-red-500 text-xs">{errors.text?.message}</p>
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
                Step
              </label>
              <input
                type="text"
                {...register("step")}
                placeholder="Enter step"
                className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
              />
              <p className="text-red-500 text-xs">{errors.step?.message}</p>
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
            onSubmit={handleSubmitAdd(handleAddQuestion)}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-black">
                Category
              </label>
              <select
                {...rigisterAdd("category_id")}
                className="mt-2 block w-full border bg-white  border-gray-300 rounded-md shadow-sm p-2 text-black"
              >
                <option value="">Select Category</option>

                {categories.map((category: any) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <p className="text-red-500 text-xs">
                {errorsAdd.category_id?.message}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-black">
                Text
              </label>
              <input
                type="text"
                {...rigisterAdd("text")}
                placeholder="Enter question text"
                className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
              <p className="text-red-500 text-xs">{errorsAdd.text?.message}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-black">
                Type
              </label>
              <select
                {...rigisterAdd("type")}
                className="mt-2 block w-full border bg-white border-gray-300 rounded-md shadow-sm p-2 text-black"
              >
                <option value="">Select Type</option>
                <option value="form">Form</option>
                <option value="dropdown">Dropdown</option>
              </select>
              <p className="text-red-500 text-xs">{errorsAdd.type?.message}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-black">
                Step
              </label>
              <input
                type="text"
                {...rigisterAdd("step")}
                placeholder="Enter step"
                className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
              <p className="text-red-500 text-xs">{errorsAdd.step?.message}</p>
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
            {questionToDelete?.text || "this question"}
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
