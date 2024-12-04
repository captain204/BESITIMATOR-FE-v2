import { useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";

type Post = {
  id: number;
  image: string;
  title: string;
  description: string;
};

export default function BlogPosts() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      image: "https://via.placeholder.com/300",
      title: "Amazing Sunset",
      description: "Experience the beauty of a breathtaking sunset.",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/300",
      title: "Nature's Bliss",
      description: "Feel the tranquility of untouched nature.",
    },
    {
      id: 3,
      image: "https://via.placeholder.com/300",
      title: "Nature's Bliss",
      description: "Feel the tranquility of untouched nature.",
    },

    {
      id: 4,
      image: "https://via.placeholder.com/300",
      title: "Nature's Bliss",
      description: "Feel the tranquility of untouched nature.",
    },
    {
      id: 5,
      image: "https://via.placeholder.com/300",
      title: "Nature's Bliss",
      description: "Feel the tranquility of untouched nature.",
    },

    {
      id: 6,
      image: "https://via.placeholder.com/300",
      title: "Nature's Bliss",
      description: "Feel the tranquility of untouched nature.",
    },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const [form, setForm] = useState({
    image: "",
    title: "",
    description: "",
  });

  const handleEdit = (post: Post) => {
    setCurrentPost(post);
    setForm({
      image: post.image,
      title: post.title,
      description: post.description,
    });
    setIsEditing(true);
  };

  const handleDelete = (id: number) => {
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setForm((prev) => ({ ...prev, image: imageUrl }));
    }
  };

  const handleSave = () => {
    if (!currentPost) return;

    setPosts((prev) =>
      prev.map((post) =>
        post.id === currentPost.id ? { ...post, ...form } : post
      )
    );
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen  text-gray-900 p-8">
      <h1 className="text-4xl font-bold text-center mb-10 dark:text-white mt-4">Blog Posts</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div
            key={post.id}
            className="max-w-sm bg-black text-white shadow-xl rounded-lg overflow-hidden transform transition duration-500 hover:scale-105"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold text-yellow-50 mb-2">{post.title}</h2>
              <p className="text-yellow-200 text-sm">{post.description}</p>
            </div>
            <div className="flex justify-between px-6 pb-4">
              <button
                className="flex items-center text-sm text-yellow-200 hover:text-yellow-300 transition"
                onClick={() => handleEdit(post)}
              >
                <FiEdit className="mr-2" />
                Edit
              </button>
              <button
                className="flex items-center text-sm text-red-400 hover:text-red-500 transition"
                onClick={() => handleDelete(post.id)}
              >
                <FiTrash className="mr-2" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-yellow-100 rounded-lg shadow-2xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-yellow-600 mb-4">Edit Post</h2>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border border-yellow-300 rounded p-2"
              />
              {form.image && (
                <img
                  src={form.image}
                  alt="Preview"
                  className="mt-4 w-full h-32 object-cover rounded-lg"
                />
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full border text-black border-yellow-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Title"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full border text-black border-yellow-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="Description"
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
