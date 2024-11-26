import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import axiosInstance from "@/Globals/Interceptor";

const QuestionsManager = () => {
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [formData, setFormData] = useState({
    category_id: "",
    text: "",
    type: "",
    step: "",
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/api/admin/categories");
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axiosInstance.get("/api/admin/questions");
        setQuestions(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  // Handle input changes
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this question?")) {
      try {
        await axiosInstance.delete(`/api/admin/questions/${id}`);
        alert("Question deleted successfully!");
        // Refresh questions list
        const response = await axiosInstance.get("/api/admin/questions");
        setQuestions(response.data);
      } catch (error) {
        console.error("Error deleting question:", error);
        alert("Failed to delete the question.");
      }
    }
  };

  // Submit form (post or update)
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axiosInstance.put(`/api/admin/questions/${editingId}`, formData);
        alert("Question updated successfully!");
      } else {
        await axios.post("/api/admin/questions", formData);
        alert("Question posted successfully!");
      }
      setFormData({ category_id: "", text: "", type: "", step: "" });
      setEditingId(null);
      //   fetchQuestions();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form.");
    }
  };

  // Edit question
  const handleEdit = (question: any) => {
    setFormData({
      category_id: question.category_id,
      text: question.text,
      type: question.type,
      step: question.step,
    });
    setEditingId(question.id);
  };

  // Table columns
  const columns = [
    {
      name: "Question",
      selector: (row: any) => row.text,
    },
    {
      name: "Type",
      selector: (row: any) => row.type,
    },
    {
      name: "Step",
      selector: (row: any) => row.step,
    },
    {
        name: "Actions",
        cell: (row: any) => (
          <div className="flex items-center gap-4">
            {/* Edit Button */}
            <button
              onClick={() => handleEdit(row)}
              className="text-blue-600 hover:underline"
            >
              Edit
            </button>
            {/* Delete Button */}
            <button
              onClick={() => handleDelete(row.id)}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </div>
        ),
      },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Question Management</h1>

      {/* Form for Posting/Updating Questions */}
      <form
        className="p-6 bg-white shadow-md rounded-md mb-6"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Category */}
          <div>
            <label
              htmlFor="category_id"
              className="block text-sm font-medium text-black"
            >
              Category
            </label>
            <select
              name="category_id"
              id="category_id"
              className="w-full mt-1 p-2 border rounded text-black"
              value={formData.category_id}
              onChange={handleInputChange}
            >
              <option value="">Select Category</option>
              {categories.map((category: any) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Question Text */}
          <div>
            <label
              htmlFor="text"
              className="block text-sm font-medium text-black"
            >
              Question Text
            </label>
            <input
              type="text"
              name="text"
              id="text"
              className="w-full mt-1 p-2 border rounded text-black"
              value={formData.text}
              onChange={handleInputChange}
            />
          </div>

          {/* Type */}
          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-black"
            >
              Type
            </label>
            <select
              name="type"
              id="type"
              className="w-full mt-1 p-2 border rounded text-black"
              value={formData.type}
              onChange={handleInputChange}
            >
              <option value="">Select Type</option>
              <option value="dropdown">Dropdown</option>
              <option value="normal">Normal</option>
            </select>
          </div>

          {/* Step */}
          <div>
            <label
              htmlFor="step"
              className="block text-sm font-medium text-black"
            >
              Step
            </label>
            <select
              name="step"
              id="step"
              className="w-full mt-1 p-2 border rounded text-black"
              value={formData.step}
              onChange={handleInputChange}
            >
              <option value="">Select Step</option>
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 bg-yellow-800 text-white py-2 px-4 rounded"
        >
          {editingId ? "Update Question" : "Post Question"}
        </button>
      </form>

      {/* Questions Table */}
      <DataTable
        title="Manage Questions"
        columns={columns}
        data={questions}
        pagination
        highlightOnHover
        className="p-6 bg-white shadow-md rounded-md"
      />
    </div>
  );
};

export default QuestionsManager;
