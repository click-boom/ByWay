import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import {toast, Toaster} from "sonner";

interface Location {
  location_id: number;
  location_name: string;
}

interface BlogData {
  title: string;
  location_id:string;
  image: File | null;
  category: string;
  description: string;
}

interface BlogFormProps {
  id?: string | number;
}

const BlogForm: React.FC<BlogFormProps> = ({ id }) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [blogData, setBlogData] = useState<BlogData>({
    title: "",
    image: null,
    location_id:"",
    category: "",
    description: "",
  });
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8081/maps/fetchAvailableLocations")
      .then((response) => {
        setLocations(response.data);
      })
      .catch((error) => {
        console.error("Error fetching locations:", error);
      });
  }, []);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8081/blogs/getselectedblog/${id}`)
        .then((response) => {
          const fetchedBlogData = response.data.blog;
          setBlogData(fetchedBlogData);
          setImagePreviews([]); // Clear existing previews
          const imagePreviews = [];
          const imageData = fetchedBlogData.image;
          if (
            imageData &&
            imageData.type === "Buffer" &&
            Array.isArray(imageData.data)
          ) {
            const blob = new Blob([Buffer.from(imageData.data)], {
              type: "image/jpeg",
            }); // Assuming JPEG format
            const imageUrl = URL.createObjectURL(blob);
            imagePreviews.push(imageUrl);
          }

          setImagePreviews(imagePreviews);
          setSelectedCategory(fetchedBlogData.category); // Update selected category
          setIsUpdateMode(true);
        })
        .catch((error) => {
          console.error("Error fetching blog data:", error);
        });
    }
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setBlogData({
      ...blogData,
      [name]: value,
    });
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const previewUrl = reader.result as string;
        setImagePreviews([previewUrl]);
      };

      setBlogData({
        ...blogData,
        image: file,
      });
    }
  };

  const handleBlogContentChange = (description: string) => {
    setBlogData({
      ...blogData,
      description: description,
    });
  };

  const handleBlogSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    if (blogData.image) {
      formData.append(`image`, blogData.image);
    } else if (isUpdateMode && blogData.image) {
      formData.append(`image`, blogData.image);
    }

    // Append other fields
    formData.append("title", blogData.title);
    formData.append("location", blogData.location_id);
    formData.append("description", blogData.description);

    if (selectedCategory !== null && selectedCategory !== undefined) {
      formData.append("category", selectedCategory);
    }

    try {
      let response;

      if (isUpdateMode) {
        response = await axios.put(
          `http://localhost:8081/blogs/updateBlog/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        response = await axios.post(
          "http://localhost:8081/blogs/postBlog",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }
      if (response.data.Status === "Success") {
        toast.success(
          isUpdateMode ? "Blog updated successfully" : "Blog added successfully"
        , {
              position: "top-right",
          duration: 3000,
              
              style: {
                minWidth: "300px",
                maxWidth: "400px",
                minHeight: "80px",
                fontSize: "18px",
                transform: "translateX(0%)", 
              },
            });

        setBlogData({
          title: "",
          location_id:"",
          image: null,
          category: "",
          description: "",
        });
        setImagePreviews([]);
        setIsUpdateMode(false);
        
      } else {
        toast.error(
          isUpdateMode ? "Failed to update blog" : "Error adding blog"
          , {
            position: "top-right",
            
            style: {
              minWidth: "300px",
              maxWidth: "400px",
              minHeight: "80px",
              fontSize: "18px",
              transform: "translateX(0%)", 
            },
          });
        setBlogData({
          title: "",
          image: null,
          category: "",
          description: "",
          location_id:"",
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleBlogSubmit}
        className="flex flex-col max-h-[74vh] overflow-y-auto"
      >
        <div className="w-auto pb-8 ml-3 text-4xl text-center text-green-700 ">
          <strong>Create new Blog</strong>{" "}
        </div>

        <div className="divcontainer">
          <div className=" name flex m-2 ml-44 mb-5 items-center ">
            <label className="mr-14 text-xl text-slate-700 ">
              Blog Title :
            </label>
            <input
              type="text"
              className="p-1 text-xl rounded-sm w-[60%] border-2 border-slate-300"
              name="title"
              value={blogData.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="location flex m-2 ml-44 mb-5 items-center">
            <label className="mr-2 text-xl text-slate-700">
              Blog Location :
            </label>
            <select
              name="location"
              value={blogData.location_id}
              onChange={(e) =>
                setBlogData({ ...blogData, location_id: e.target.value })
              }
              className="rounded-lg bg-slate-100 border p-2 focus:outline-none"
            >
              <option value="">Select a Location</option>
              {locations.map((location) => (
                <option key={location.location_id} value={location.location_id}>
                  {location.location_name}
                </option>
              ))}
            </select>
          </div>

          {/* Blog Category */}
          <div className="location flex m-2 ml-44 mb-5 items-center">
            <label className="mr-2 text-xl text-slate-700">
              Blog Category :
            </label>
            <select
              name="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-lg bg-slate-100 border p-2 focus:outline-none"
            >
              <option value="">Select a Category</option>
              <option value="Normal">Normal</option>
              <option value="Trending">Trending</option>
            </select>
          </div>

          {/* Image Files with Preview */}
          <div className="image-files flex ml-44 mb-5 items-start">
            <label className="mr-10 text-xl text-slate-700">Images:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
            />
            <div className="flex mt-2">
              {imagePreviews.map((preview, index) => (
                <img
                  key={index}
                  src={preview}
                  alt={`Preview-${index}`}
                  className="mr-2 border border-gray-300 rounded-sm"
                  style={{ width: "100px", height: "100px" }}
                />
              ))}
            </div>
          </div>

          <div className="blog-content flex flex-col m-2 ml-44 mb-5 items-start">
            <label className="mr-10 text-xl text-slate-700">
              Blog Content:
            </label>
            <ReactQuill
              value={blogData.description}
              onChange={handleBlogContentChange}
              className="w-[80%] h-36 "
            />
          </div>
        </div>
        <div className="self-center w-48 mt-14 mx-auto">
          <button
            type="submit"
            className="w-full mb-5 p-3 bg-green-600 text-white text-xl rounded hover:bg-green-700 focus:outline-none focus:ring focus:border-green-700 transition"
          >
            {isUpdateMode ? "Update Blog" : "Add Blog"}
            <Toaster className="absolute right-0 transform translate-x-16transition-transform duration-300 ease-in-out" richColors />
          </button>
        </div>
      </form>
    </>
  );
};

export default BlogForm;
