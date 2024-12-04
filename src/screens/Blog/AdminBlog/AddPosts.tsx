// import { useState } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// toast.configure();

const PostBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image_url: "",
  });
  const [imageSource, setImageSource] = useState("");

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageSource(url);
      setFormData({ ...formData, image_url: url });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { title, content, image_url } = formData;

    if (!title || !content || !image_url) {
      toast.error("Please fill in all fields", { position: "top-center" });
      return;
    }

    try {
      const response = await axios.post("http://13.60.208.160/api/admin/blog", {
        title,
        content,
        image_url,
      });
      toast.success("Blog post added successfully!", {
        position: "top-center",
      });
      // Reset form
      setFormData({ title: "", content: "", image_url: "" });
      setImageSource("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add blog post. Please try again.", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-3xl p-8 mt-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add Blog
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Blog Image */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Blog Image
            </label>
            <div className="flex gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-yellow-700   file:text-white  w-full"
              />
              <input
                type="text"
                name="image_url"
                placeholder="Or paste image URL"
                value={formData.image_url}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-700 outline-none"
              />
            </div>
            {imageSource && (
              <img
                src={imageSource}
                alt="Blog Preview"
                className="mt-4 w-full h-40 object-cover rounded-lg shadow"
              />
            )}
          </div>

          {/* Blog Title */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Blog Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter blog title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-700 outline-none"
            />
          </div>

          {/* Blog Description */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Blog Description
            </label>
            <textarea
              rows={5}
              name="content"
              placeholder="Enter blog description"
              value={formData.content}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-yellow-700 outline-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-yellow-700 text-white py-3 px-6 rounded-lg transition"
            >
              Add Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostBlog;









