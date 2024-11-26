import { useState, useEffect } from "react";
import axiosInstance from "@/Globals/Interceptor";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

interface Category {
  id: number;
  name: string;
  description: string;
}

const categorySchema = yup.object().shape({
  name: yup.string().required("Category name is required"),
  description: yup.string().required("Description is required"),
});

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingg, setLoadingg] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(categorySchema),
  });

  // Fetch categories
  useEffect(() => {
    axiosInstance
      .get("/api/admin/categories")
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleAddCategory = async (data: any): Promise<void> => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/api/admin/categories", data);
      setCategories([...categories, response.data]);
      reset();
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
    } catch (error) {
      console.error("Error updating category:", error);
    } finally {
      setLoadingg(false);
    }
  };

  const handleDelete = async (id: number): Promise<void> => {
    try {
      await axiosInstance.delete(`/api/admin/categories/${id}`);
      setCategories(categories.filter((category) => category.id !== id));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div className="min-h-screen  p-4 sm:p-6">
      <div className="max-w-6xl mx-auto shaddow-xl ">
        {/* <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-6 mt-16">
          Manage Categories
        </h1> */}

        {/* Add New Category Form */}

        <div className="bg-white shadow rounded-lg p-4 sm:p-6 mb-6 border mt-16">
          <h2 className="text-lg sm:text-xl font-semibold text-black mb-4">
            Add New Category
          </h2>
          <form
            onSubmit={handleSubmit(handleAddCategory)}
            className="space-y-4"
          >
            <div>
              <label className="block text-black font-medium mb-1 sm:mb-2">
                Category Name
              </label>
              <input
                type="text"
                {...register("name")}
                className="w-full px-3 py-2 border rounded-md focus:ring-yellow-500 text-black"
                placeholder="Enter category name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label className="block text-black font-medium mb-1 sm:mb-2">
                Description
              </label>
              <textarea
                {...register("description")}
                className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 text-black"
                placeholder="Enter description"
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="bg-yellow-800 text-white py-2 px-4 rounded-md w-full sm:w-auto  flex justify-center items-center"
              disabled={loading}
            >
              {loading ? "Loading..." : "Add Category"}
            </button>
          </form>
        </div>

        {/* Categories List */}
        <div className="bg-white shadow rounded-lg p-4 sm:p-6 border mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-black mb-4">
            Manage Categories
          </h2>
          <div className="overflow-x-auto">
            {categories.length === 0 ? (
              <p className="text-black text-center">No categories available.</p>
            ) : (
              <table className="min-w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-50 text-gray-700">
                    <th className="border border-gray-200 px-4 py-2 text-left">
                      Name
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-left">
                      Description
                    </th>
                    <th className="border border-gray-200 px-4 py-2 text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <tr key={category.id} className="hover:bg-gray-100">
                      <td className="border border-gray-200 px-4 py-2 text-black text-sm">
                        {category.name}
                      </td>
                      <td className="border border-gray-200 px-4 py-2 text-black text-sm">
                        {category.description}
                      </td>
                      <td className="border border-gray-200 px-4 py-2 text-center">
                        <button
                          onClick={() => handleEdit(category)}
                          className="text-yellow-500 hover:text-yellow-600 mr-2"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(category.id)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && editCategory && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">
              Edit Category
            </h3>
            <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4">
              <div>
                <label className="block text-gray-600 font-medium mb-1 sm:mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  {...register("name")}
                  className="w-full px-3 py-2 border rounded-md focus:ring-yellow-800"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-600 font-medium mb-1 sm:mb-2">
                  Description
                </label>
                <textarea
                  {...register("description")}
                  className="w-full px-3 py-2 border rounded-md focus:ring-yellow-800"
                ></textarea>
                {errors.description && (
                  <p className="text-red-500 text-sm">
                    {errors.description.message}
                  </p>
                )}
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-yellow-800 text-white py-2 px-4 rounded-md hover:bg-blue-600 flex justify-center items-center"
                  disabled={loading}
                >
                  {loadingg ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
