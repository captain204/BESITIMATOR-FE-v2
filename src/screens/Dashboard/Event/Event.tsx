import { useState, useEffect } from "react";
import axiosInstance from "@/Globals/Interceptor";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { jsPDF } from "jspdf";

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

const eventSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  event_date: yup.date().required("Event date is required"),
  location: yup.string().required("Location is required"),
  image: yup
    .mixed()
    .test("fileType", "Only images are allowed", (value: any) =>
      value && value[0]
        ? ["image/jpeg", "image/png", "image/jpg"].includes(value[0].type)
        : false
    )
    .required("Image is required"),
});

const addEventSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  event_date: yup.date().required("Event date is required"),
  location: yup.string().required("Location is required"),
  image: yup
    .mixed()
    .test("fileType", "Only images are allowed", (value: any) =>
      value && value[0]
        ? ["image/jpeg", "image/png", "image/jpg"].includes(value[0].type)
        : false
    )
    .required("Image is required"),
});

export default function Events() {
  const [events, setEvents] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalOpenn, setIsModalOpenn] = useState<boolean>(false);
  const [editEvent, setEditEvent] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState("");
  const [exportDropdownOpen, setExportDropdownOpen] = useState<boolean>(false);
  const [loadingEvents, setLoadingEvents] = useState<boolean>(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<any>(false);
  const [eventToDelete, setEventToDelete] = useState<any | null>(null);
  const [imageName, setImageName] = useState<string>("");

  const {
    register: registerAdd,
    setValue: setvalueAdd,
    handleSubmit: handleSubmitAdd,
    formState: { errors: errorsAdd },
    reset: resetAdd,
  } = useForm({
    resolver: yupResolver(addEventSchema),
  });

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(eventSchema),
  });

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  // const onDrop = (event: React.DragEvent) => {
  //   event.preventDefault();
  //   const file = event.dataTransfer.files?.[0];
  //   if (file) {
  //     setValue("image", [file], { shouldValidate: true }); // Wrap theg bdcbgdgtekl gives me that  file in an array for yup validation
  //     setImageName(file.name); // Update the file name
  //   }
  // };

  const onDropEdit = (event: React.DragEvent) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files && files[0]) {
      setValue("image", files, { shouldValidate: true });
    }
  };

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

  const fetchEvents = async () => {
    setLoadingEvents(true);
    try {
      const response = await axiosInstance.get("/api/events");
      setEvents(response.data.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoadingEvents(false);
    }
  };
  // Fetch questions
  useEffect(() => {
    fetchEvents();
  }, []);

  const handleExport = (format: "pdf" | "xlsx") => {
    if (format === "xlsx") {
      const worksheet = XLSX.utils.json_to_sheet(events);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Events");
      XLSX.writeFile(workbook, "Events.xlsx");
    } else if (format === "pdf") {
      console.log("Exporting as PDF... (Implement PDF generation here)");
    }
  };

  //   const handleAddQuestion = async (data: any): Promise<void> => {
  //     setLoading(true);
  //     try {
  //       const response = await axiosInstance.post("/api/admin/questions", data);
  //       setQuestions([...questions, response.data]);
  //       resetAdd();
  //       setIsModalOpenn(false);
  //       fetchQuestions();
  //       toast.warning("Question added successfully!", {
  //         transition: Zoom,
  //         position: "top-right",
  //         icon: (
  //           <IoCheckmarkDoneCircleSharp className="text-yellow-700" size={24} />
  //         ),
  //       });
  //     } catch (error) {
  //       console.error("Error adding Question:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  const handleEdit = (event: any): void => {
    setEditEvent(event);
    setIsModalOpen(true);
    reset(event);
  };

  const handleAddQuestion = async (data: any): Promise<void> => {
    setLoading(true);

    try {
      // Create a FormData object to send form data
      const formData = new FormData();

      // Append fields to FormData
      formData.append("title", data.title);
      formData.append("description", data.description);
      // formData.append("event_date", data.event_date);
      formData.append(
        "event_date",
        new Date(data.event_date).toISOString().split("T")[0]
      );
      formData.append("location", data.location);

      // Handle image file (assuming it's in `data.image`)
      if (data.image instanceof File) {
        formData.append("image", data.image);
      }

      // Make an API call to add the new question
      const response = await axiosInstance.post(`/api/admin/events`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Update the state with the newly added question
      setEvents((prev) => [...prev, response.data]);

      // Close the modal and reset state
      setIsModalOpen(false);
      toast.success("Event added successfully!", {
        transition: Zoom,
        position: "top-right",
        icon: (
          <IoCheckmarkDoneCircleSharp className="text-green-700" size={24} />
        ),
      });
    } catch (error) {
      console.error("Error adding Event:", error);
      toast.error("Failed to add the question.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (data: any): Promise<void> => {
    if (!editEvent) return;
    setLoading(true);

    try {
      // Create a FormData object to send form data
      const formData = new FormData();

      // Append fields to FormData
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append(
        "event_date",
        new Date(data.event_date).toISOString().split("T")[0]
      );
      formData.append("location", data.location);

      // Handle image file (assuming it's in `data.image`)
      if (data.image instanceof File) {
        formData.append("image", data.image);
      }

      // Make an API call to update the question
      await axiosInstance.put(`/api/admin/events/${editEvent.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Update the state
      setEvents((prev) =>
        prev.map((event) =>
          event.id === editEvent.id ? { ...editEvent, ...data } : event
        )
      );

      // Close the modal and reset state
      setIsModalOpen(false);
      setEditEvent(null);
      fetchEvents();

      // Show success toast
      toast.success("Event updated successfully!", {
        transition: Zoom,
        position: "top-right",
        icon: (
          <IoCheckmarkDoneCircleSharp className="text-green-700" size={24} />
        ),
      });
    } catch (error) {
      console.error("Error updating question:", error);
      toast.error("Failed to update the question.");
    } finally {
      setLoading(false);
    }
  };

  const filteredQuestions = events.filter((event) => {
    const title = event.title?.toLowerCase() || "";
    const description = event.title?.toLowerCase() || "";
    const event_date = event.title?.toLowerCase() || "";
    const location = event.title?.toLowerCase() || "";
    return (
      title.includes(searchText.toLowerCase()) ||
      description.includes(searchText.toLowerCase()) ||
      event_date.includes(searchText.toLowerCase()) ||
      event_date.includes(searchText.toLowerCase()) ||
      location.includes(searchText.toLowerCase())
    );
  });

  const handleDelete = async (): Promise<void> => {
    if (!eventToDelete) return;
    try {
      await axiosInstance.delete(`/api/admin/events/${eventToDelete.id}`);

      setEvents((prev) =>
        prev.filter((question) => question.id !== eventToDelete.id)
      );
      setIsDeleteModalOpen(false);
      setEventToDelete(null);
      toast.warning("Category deleted successfully!", {
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
      name: "Title",
      selector: (row: any) => row?.title,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row: any) => row?.description,
      sortable: true,
    },
    {
      name: "Location",
      selector: (row: any) => row?.location,
      sortable: true,
    },
    {
      name: "Event Date",
      selector: (row: any) => row?.event_date,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row: any) => (
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
                setEventToDelete(row);
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
              <FaPlus /> Add Event
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
            progressPending={loadingEvents}
            progressComponent={
              <div className="flex justify-center items-center py-10">
                <Spinner className="h-12 w-12 text-yellow-800" />
              </div>
            }
          />
        </div>
      </div>

      <Dialog open={isModalOpen} handler={() => setIsModalOpen(false)}>
        <DialogHeader className="flex justify-center items-center">
          Edit Event
        </DialogHeader>
        <DialogBody className="h-[70vh] overflow-y-auto">
          <form
            onSubmit={handleSubmit(handleUpdate)}
            className="space-y-4 overflow-y-scroll"
          >
            {/* <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4"> */}
            <div>
              <label className="block font-medium text-sm">Title</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                {...register("title")}
              />
              {errors.title && (
                <span className="text-red-600">{errors.title.message}</span>
              )}
            </div>

            <div>
              <label className="block font-medium text-sm">Description</label>
              <textarea
                className="w-full p-2 border rounded"
                {...register("description")}
              />
              {errors.description && (
                <span className="text-red-600">
                  {errors.description.message}
                </span>
              )}
            </div>

            <div>
              <label className="block font-medium text-sm">Event Date</label>
              <input
                type="date"
                className="w-full p-2 border rounded"
                {...register("event_date")}
              />
              {errors.event_date && (
                <span className="text-red-600">
                  {errors.event_date.message}
                </span>
              )}
            </div>

            <div>
              <label className="block font-medium text-sm">Location</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                {...register("location")}
              />
              {errors.location && (
                <span className="text-red-600">{errors.location.message}</span>
              )}
            </div>

            <div
              onDragOver={onDragOver}
              onDrop={onDropEdit}
              className="w-full p-4 border-2 border-dashed rounded-lg flex justify-center items-center"
            >
              <input
                type="file"
                className="hidden"
                id="imageInput"
                {...register("image")}
              />
              <label
                htmlFor="imageInput"
                className="cursor-pointer text-gray-600"
              >
                Drag & Drop or Click to Upload Image
              </label>
            </div>
            {errors.image && (
              <span className="text-red-600">{errors.image.message}</span>
            )}
            {/* </form> */}

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
          Add Event
        </DialogHeader>
        <DialogBody className="h-[70vh] overflow-y-auto">
          <form
            onSubmit={handleSubmitAdd(handleAddQuestion)}
            className="space-y-4 l"
          >
            <div>
              <label className="block font-medium text-sm">Title</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                {...registerAdd("title")}
              />
              {errorsAdd.title && (
                <span className="text-red-600">{errorsAdd.title.message}</span>
              )}
            </div>

            <div>
              <label className="block font-medium text-sm">Description</label>
              <textarea
                className="w-full p-2 border rounded"
                {...registerAdd("description")}
              />
              {errorsAdd.description && (
                <span className="text-red-600">
                  {errorsAdd.description.message}
                </span>
              )}
            </div>

            <div>
              <label className="block font-medium text-sm">Event Date</label>
              <input
                type="date"
                className="w-full p-2 border rounded"
                {...registerAdd("event_date")}
              />
              {errorsAdd.event_date && (
                <span className="text-red-600">
                  {errorsAdd.event_date.message}
                </span>
              )}
            </div>

            <div>
              <label className="block font-medium text-sm">Location</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                {...registerAdd("location")}
              />
              {errorsAdd.location && (
                <span className="text-red-600">
                  {errorsAdd.location.message}
                </span>
              )}
            </div>

            <div
              onDragOver={onDragOver}
              onDrop={onDropEdit}
              className="w-full p-4 border-2 border-dashed rounded-lg flex justify-center items-center"
            >
              <input
                type="file"
                className="hidden"
                id="imageInput"
                {...registerAdd("image")}
              />
              <label
                htmlFor="imageInput"
                className="cursor-pointer text-gray-600"
              >
                Drag & Drop or Click to Upload Image
              </label>
            </div>
            {errorsAdd.image && (
              <span className="text-red-600">{errorsAdd.image.message}</span>
            )}

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
                  {loading ? "Saving..." : "Add"}
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
            {eventToDelete?.text || "this question"}
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
