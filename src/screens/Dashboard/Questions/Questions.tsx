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
} from "@material-tailwind/react";
import * as XLSX from "xlsx";
import { Tooltip } from "@material-tailwind/react";

interface Question {
  id: number;
  category: string;
  text: string;
  type: string;
  step: string;
}

const questionSchema = yup.object().shape({
  category: yup.string().required("Category is required"),
  text: yup.string().required("Text is required"),
  type: yup.string().oneOf(["form", "dropdown"]).required("Type is required"),
  step: yup.string().required("Step is required"),
});

export default function Categories() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editQuestion, setEditQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(questionSchema),
  });

  // Fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axiosInstance.get("/api/admin/questions");
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, []);

 
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/api/admin/categories");
        console.log("Categories API response:", response.data);
        const data = Array.isArray(response.data.categories)
          ? response.data
          : response.data.categories; 
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
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
      reset(); 
      setIsModalOpen(false);
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
    } catch (error) {
      console.error("Error updating question:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredQuestions = questions.filter((question) => {
    const text = question.text?.toLowerCase() || "";
    return text.includes(searchText.toLowerCase());
  });

  const columns = [
    {
      name: "Category",
      selector: (row: Question) => row.category,
      sortable: true,
    },
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
              onClick={() => {}}
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
            onClick={() => setIsModalOpen(true)}
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
            progressPending={loading}
            highlightOnHover
            pointerOnHover
            customStyles={customStyles}
          />
        </div>
      </div>

      {/* Add/Edit Question Modal */}
      <Dialog open={isModalOpen} handler={() => setIsModalOpen(false)}>
        <DialogHeader>
          {editQuestion ? "Edit Question" : "Add Question"}
        </DialogHeader>
        <DialogBody>
          <form
            onSubmit={handleSubmit(
              editQuestion ? handleUpdate : handleAddQuestion
            )}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                {...register("category")}
                className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              >
                <option value="">Select Category</option>
                {/* {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))} */}

                {categories.map((category: any) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <p className="text-red-500 text-xs">{errors.category?.message}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Text
              </label>
              <input
                type="text"
                {...register("text")}
                placeholder="Enter question text"
                className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
              <p className="text-red-500 text-xs">{errors.text?.message}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Type
              </label>
              <select
                {...register("type")}
                className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              >
                <option value="">Select Type</option>
                <option value="form">Form</option>
                <option value="dropdown">Dropdown</option>
              </select>
              <p className="text-red-500 text-xs">{errors.type?.message}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Step
              </label>
              <input
                type="text"
                {...register("step")}
                placeholder="Enter step"
                className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
              <p className="text-red-500 text-xs">{errors.step?.message}</p>
            </div>

            <DialogFooter>
              <button
                type="submit"
                className="bg-blue-600 text-white rounded-md py-2 px-4"
                disabled={loading}
              >
                {loading ? "Saving..." : editQuestion ? "Update" : "Add"}
              </button>
            </DialogFooter>
          </form>
        </DialogBody>
      </Dialog>
    </div>
  );
}

// import React, { useState, useEffect } from "react";
// import DataTable from "react-data-table-component";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import axiosInstance from "@/Globals/Interceptor";
// import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from "@material-tailwind/react";
// import { toast } from "react-toastify";

// // Validation schema
// const questionSchema = yup.object().shape({
//   category_id: yup.string().required("Category is required"),
//   text: yup.string().required("Question text is required"),
//   type: yup.string().required("Type is required"),
//   step: yup.string().required("Step is required"),
// });

// const QuestionsManager = () => {
//   const [categories, setCategories] = useState([]);
//   const [questions, setQuestions] = useState([]);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [editingQuestion, setEditingQuestion] = useState<any>(null);

//   // Form setup for adding a question
//   const {
//     register: registerAdd,
//     handleSubmit: handleAddSubmit,
//     reset: resetAddForm,
//     formState: { errors: addErrors },
//   } = useForm({
//     resolver: yupResolver(questionSchema),
//   });

//   // Form setup for editing a question
//   const {
//     register: registerEdit,
//     handleSubmit: handleEditSubmit,
//     reset: resetEditForm,
//     formState: { errors: editErrors },
//   } = useForm({
//     resolver: yupResolver(questionSchema),
//   });

//   // Fetch categories
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axiosInstance.get("/api/admin/categories");
//         setCategories(response.data.categories);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };
//     fetchCategories();
//   }, []);

//   // Fetch questions
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const response = await axiosInstance.get("/api/admin/questions");
//         setQuestions(response.data);
//       } catch (error) {
//         console.error("Error fetching questions:", error);
//       }
//     };
//     fetchQuestions();
//   }, []);

//   // Add question
//   const onAddQuestion = async (data:any) => {
//     try {
//       await axiosInstance.post("/api/admin/questions", data);
//       alert("Question added successfully!");
//       resetAddForm();
//       const response = await axiosInstance.get("/api/admin/questions");
//       setQuestions(response.data);
//     } catch (error) {
//       console.error("Error adding question:", error);
//     }
//   };

//   // Edit question
//   const onEditQuestion = async (data:any) => {
//     try {
//       await axiosInstance.put(`/api/admin/questions/${editingQuestion.id}`, data);
//       alert("Question updated successfully!");
//       resetEditForm();
//       setIsEditModalOpen(false);
//       const response = await axiosInstance.get("/api/admin/questions");
//       setQuestions(response.data);
//     } catch (error) {
//       console.error("Error updating question:", error);
//     }
//   };

//   // Open edit modal with question data
//   const handleEditClick = (question:any) => {
//     setEditingQuestion(question);
//     resetEditForm({
//       category_id: question.category_id,
//       text: question.text,
//       type: question.type,
//       step: question.step,
//     });
//     setIsEditModalOpen(true);
//   };

//   // Delete question
//   const handleDelete = async (id:any) => {
//     if (confirm("Are you sure you want to delete this question?")) {
//       try {
//         await axiosInstance.delete(`/api/admin/questions/${id}`);
//         toast.success("Question deleted successfully!");
//         const response = await axiosInstance.get("/api/admin/questions");
//         setQuestions(response.data);
//       } catch (error) {
//         console.error("Error deleting question:", error);
//       }
//     }
//   };

//   // Table columns
//   const columns = [
//     {
//       name: "Question",
//       selector: (row:any) => row.text,
//     },
//     {
//       name: "Type",
//       selector: (row:any) => row.type,
//     },
//     {
//       name: "Step",
//       selector: (row:any) => row.step,
//     },
//     {
//       name: "Actions",
//       cell: (row:any) => (
//         <div className="flex items-center gap-4">
//           <button
//             onClick={() => handleEditClick(row)}
//             className="text-blue-600 hover:underline"
//           >
//             Edit
//           </button>
//           <button
//             onClick={() => handleDelete(row.id)}
//             className="text-red-600 hover:underline"
//           >
//             Delete
//           </button>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-2xl font-bold mb-6">Question Management</h1>

//       {/* Add Question Form */}
//       <form
//         onSubmit={handleAddSubmit(onAddQuestion)}
//         className="p-6 bg-white shadow-md rounded-md mb-6"
//       >
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-black">Category</label>
//             <select
//               {...registerAdd("category_id")}
//               className="w-full mt-1 p-2 border rounded"
//             >
//               <option value="">Select Category</option>
//               {categories.map((category:any) => (
//                 <option key={category.id} value={category.id}>
//                   {category.name}
//                 </option>
//               ))}
//             </select>
//             <p className="text-red-600 text-sm">{addErrors.category_id?.message}</p>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-black">Question Text</label>
//             <input
//               {...registerAdd("text")}
//               type="text"
//               className="w-full mt-1 p-2 border rounded"
//             />
//             <p className="text-red-600 text-sm">{addErrors.text?.message}</p>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-black">Type</label>
//             <select
//               {...registerAdd("type")}
//               className="w-full mt-1 p-2 border rounded"
//             >
//               <option value="">Select Type</option>
//               <option value="dropdown">Dropdown</option>
//               <option value="normal">Normal</option>
//             </select>
//             <p className="text-red-600 text-sm">{addErrors.type?.message}</p>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-black">Step</label>
//             <select
//               {...registerAdd("step")}
//               className="w-full mt-1 p-2 border rounded"
//             >
//               <option value="">Select Step</option>
//               {Array.from({ length: 10 }, (_, i) => (
//                 <option key={i + 1} value={i + 1}>
//                   {i + 1}
//                 </option>
//               ))}
//             </select>
//             <p className="text-red-600 text-sm">{addErrors.step?.message}</p>
//           </div>
//         </div>
//         <button
//           type="submit"
//           className="mt-4 bg-yellow-800 text-white py-2 px-4 rounded"
//         >
//           Add Question
//         </button>
//       </form>

//       {/* Questions Table */}
//       <DataTable
//         title="Manage Questions"
//         columns={columns}
//         data={questions}
//         pagination
//         highlightOnHover
//         className="p-6 bg-white shadow-md rounded-md"
//       />

//       {/* Edit Modal */}
//       <Dialog open={isEditModalOpen} handler={() => setIsEditModalOpen(false)}>
//         <DialogHeader>Edit Question</DialogHeader>
//         <DialogBody>
//           <form onSubmit={handleEditSubmit(onEditQuestion)}>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-black">Category</label>
//                 <select
//                   {...registerEdit("category_id")}
//                   className="w-full mt-1 p-2 border rounded"
//                 >
//                   <option value="">Select Category</option>
//                   {categories.map((category:any) => (
//                     <option key={category.id} value={category.id}>
//                       {category.name}
//                     </option>
//                   ))}
//                 </select>
//                 <p className="text-red-600 text-sm">{editErrors.category_id?.message}</p>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-black">Question Text</label>
//                 <input
//                   {...registerEdit("text")}
//                   type="text"
//                   className="w-full mt-1 p-2 border rounded"
//                 />
//                 <p className="text-red-600 text-sm">{editErrors.text?.message}</p>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-black">Type</label>
//                 <select
//                   {...registerEdit("type")}
//                   className="w-full mt-1 p-2 border rounded"
//                 >
//                   <option value="">Select Type</option>
//                   <option value="dropdown">Dropdown</option>
//                   <option value="normal">Normal</option>
//                 </select>
//                 <p className="text-red-600 text-sm">{editErrors.type?.message}</p>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-black">Step</label>
//                 <select
//                   {...registerEdit("step")}
//                   className="w-full mt-1 p-2 border rounded"
//                 >
//                   <option value="">Select Step</option>
//                   {Array.from({ length: 10 }, (_, i) => (
//                     <option key={i + 1} value={i + 1}>
//                       {i + 1}
//                     </option>
//                   ))}
//                 </select>
//                 <p className="text-red-600 text-sm">{editErrors.step?.message}</p>
//               </div>
//             </div>
//             <DialogFooter>
//               <Button
//                 variant="text"
//                 color="red"
//                 onClick={() => setIsEditModalOpen(false)}
//                 className="mr-2"
//               >
//                 Cancel
//               </Button>
//               <Button type="submit" variant="gradient" color="yellow">
//                 Save Changes
//               </Button>
//             </DialogFooter>
//           </form>
//         </DialogBody>
//       </Dialog>
//     </div>
//   );
// };

// export default QuestionsManager;
