import { ChangeEvent, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditBlog = () => {
   const location = useLocation();
   const navigate = useNavigate();
   const { id } = useParams();
   const blogFromLocation = location.state?.blog; // Safely access the passed blog

   const [blogInputs, setBlogInputs] = useState(() => {
      if (blogFromLocation) {
         return {
            title: blogFromLocation.title || "",
            content: blogFromLocation.content || ""
         }
      }
      return { title: "", content: "" }
   });
   const [error, setError] = useState({ bool: false, msg: "" });

   const handleChange = (field: keyof typeof blogInputs) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setBlogInputs({ ...blogInputs, [field]: e.currentTarget.value });
   };

   const updateBlog = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError({ bool: false, msg: "" });
      try {
         const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/blog/${id}`,
            blogInputs, // Send blogInputs as the data
            { // Headers should be in a separate object
               headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
               },
            });
         console.log(response);
         navigate(`/blog/${id}`);
      } catch (err: any) {
         setError({ bool: true, msg: "Failed to update the blog. Please try again later." });
      }
   };

   return (
      <div className="h-screen flex flex-col justify-center items-center">
         <div className="max-w-lg md:w-[60%] border rounded-md p-4">
            <div className="text-3xl text-center font-bold">Edit Your Blog</div>
            <form onSubmit={updateBlog}>
               <LabelledInput
                  label="Title"
                  placeholder="Enter your blog title"
                  value={blogInputs.title}
                  onChange={handleChange("title")}
               />
               <LabelledTextarea
                  label="Content"
                  placeholder="Enter your blog content"
                  value={blogInputs.content}
                  onChange={handleChange("content")}
               />
               <button
                  className="w-full bg-black py-3 rounded-lg text-white mt-5 font-semibold text-lg"
                  type="submit"
               >
                  Update Blog
               </button>
            </form>
            {error.bool && (
               <div className="text-red-500 text-center font-semibold border border-red-500 mt-4 py-2 rounded-md">
                  {error.msg}
               </div>
            )}
         </div>
      </div>
   );
};

interface LabelledInputType {
   label: string;
   placeholder: string;
   onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
   value: string;
}

const LabelledInput = ({ label, placeholder, onChange, value }: LabelledInputType) => (
   <div>
      <label htmlFor={label} className="block mb-1 mt-4 text-sm font-medium">
         {label}
      </label>
      <input
         className="bg-slate-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
         type="text"
         id={label}
         placeholder={placeholder}
         value={value}
         onChange={onChange}
         required
      />
   </div>
);

const LabelledTextarea = ({ label, placeholder, onChange, value }: LabelledInputType) => (
   <div>
      <label htmlFor={label} className="block mb-1 mt-4 text-sm font-medium">
         {label}
      </label>
      <textarea
         className="bg-slate-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
         id={label}
         placeholder={placeholder}
         value={value}
         onChange={onChange}
         required
         rows={5}
      />
   </div>
);

export default EditBlog;
