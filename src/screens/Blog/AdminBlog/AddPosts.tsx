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
      <div className="bg-white shadow-lg rounded-lg w-full max-w-3xl p-8 mt-10">
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








// import axios from "axios";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import {
//   Box,
//   Button,
//   Container,
//   TextField,
//   Typography,
//   Input,
//   Paper,
//   IconButton,
//   CircularProgress,
// } from "@mui/material";
// import { CloudUpload as CloudUploadIcon } from "@mui/icons-material";

// const PostBlog = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     content: "",
//     image_url: "",
//   });
//   const [imageSource, setImageSource] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const url = URL.createObjectURL(file);
//       setImageSource(url);
//       setFormData({ ...formData, image_url: url });
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const { title, content, image_url } = formData;

//     if (!title || !content || !image_url) {
//       toast.error("Please fill in all fields", { position: "top-center" });
//       return;
//     }

//     setLoading(true);

//     try {
//       await axios.post("http://13.60.208.160/api/admin/blog", {
//         title,
//         content,
//         image_url,
//       });
//       toast.success("Blog post added successfully!", {
//         position: "top-center",
//       });
//       setFormData({ title: "", content: "", image_url: "" });
//       setImageSource("");
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to add blog post. Please try again.", {
//         position: "top-center",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         p: 10,
//         backgroundColor: "#f5f5f5",
//       }}
//     >
//       <Paper
//         elevation={12}
//         sx={{
//           p: 20,
//           borderRadius: 4,
//           backgroundColor: "#f4f7fc",
//           boxShadow: "0px 20px 50px rgba(0, 0, 0, 0.1)",
//           margin: "0 auto",
//           // width: "170%",
//           // maxWidth: 1200,
//         }}
//       >
//         <Typography
//           variant="h3"
//           component="h1"
//           align="center"
//           gutterBottom
//           sx={{
//             fontWeight: "bold",
//             color: "#2e3a59",
//             textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
//           }}
//         >
//           Add Blog Post
//         </Typography>

//         <form onSubmit={handleSubmit}>
//           {/* Blog Image */}
//           <Box sx={{ mb: 4, textAlign: "center" }}>
//             <Typography variant="h6" sx={{ color: "#333", mb: 2 }}>
//               Upload or Paste Blog Image URL
//             </Typography>
//             <Box sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
//               <Input
//                 type="file"
//                 inputProps={{ accept: "image/*" }}
//                 onChange={handleImageChange}
//                 sx={{
//                   display: "none",
//                 }}
//                 id="upload-button"
//               />
//               <label htmlFor="upload-button">
//                 <IconButton
//                   component="span"
//                   sx={{
//                     backgroundColor: "#ffd54f",
//                     "&:hover": { backgroundColor: "#ffcc00" },
//                     padding: 2,
//                     borderRadius: 3,
//                     boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
//                   }}
//                 >
//                   <CloudUploadIcon sx={{ color: "#fff", fontSize: 32 }} />
//                 </IconButton>
//               </label>

//               <TextField
//                 fullWidth
//                 label="Or paste image URL"
//                 name="image_url"
//                 value={formData.image_url}
//                 onChange={handleInputChange}
//                 sx={{
//                   "& .MuiInputBase-root": {
//                     borderRadius: 2,
//                     backgroundColor: "#fff",
//                     boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
//                     "&:hover": {
//                       boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
//                     },
//                   },
//                 }}
//               />
//             </Box>
//             {imageSource && (
//               <Box
//                 component="img"
//                 src={imageSource}
//                 alt="Blog Preview"
//                 sx={{
//                   mt: 3,
//                   width: "100%",
//                   maxWidth: 600, // Increased width for image preview
//                   height: 350, // Adjusted height for better aspect ratio
//                   objectFit: "cover",
//                   borderRadius: 2,
//                   boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
//                 }}
//               />
//             )}
//           </Box>

//           {/* Blog Title */}
//           <Box sx={{ mb: 4 }}>
//             <TextField
//               fullWidth
//               label="Blog Title"
//               name="title"
//               value={formData.title}
//               onChange={handleInputChange}
//               variant="outlined"
//               sx={{
//                 "& .MuiInputBase-root": {
//                   borderRadius: 2,
//                   backgroundColor: "#fff",
//                   boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
//                   "&:hover": {
//                     boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
//                   },
//                 },
//               }}
//             />
//           </Box>

//           {/* Blog Description */}
//           <Box sx={{ mb: 4 }}>
//             <TextField
//               fullWidth
//               multiline
//               rows={5}
//               label="Blog Description"
//               name="content"
//               value={formData.content}
//               onChange={handleInputChange}
//               variant="outlined"
//               sx={{
//                 "& .MuiInputBase-root": {
//                   borderRadius: 2,
//                   backgroundColor: "#fff",
//                   boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
//                   "&:hover": {
//                     boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
//                   },
//                 },
//               }}
//             />
//           </Box>

//           {/* Submit Button */}
//           <Box sx={{ textAlign: "center" }}>
//             <Button
//               variant="contained"
//               color="primary"
//               type="submit"
//               sx={{
//                 py: 2,
//                 px: 6,
//                 borderRadius: 3,
//                 fontWeight: "bold",
//                 fontSize: "1.1rem",
//                 backgroundColor: "#ffcc00",
//                 "&:hover": {
//                   backgroundColor: "#ffd54f",
//                 },
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               {loading ? (
//                 <CircularProgress size={24} sx={{ color: "#fff" }} />
//               ) : (
//                 "Add Blog"
//               )}
//             </Button>
//           </Box>
//         </form>
//       </Paper>
//     </Box>
//   );
// };

// export default PostBlog;
