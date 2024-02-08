"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import StyledTable from "../Common/StyledTable";
import { PopupModal } from "../Common/ContainerModal";
import{toast} from "sonner";

import BlogForm from "./BlogForm";
export const BlogTable = () => {
  const [tableData, setTableData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [blogIdToUpdate, setblogIdToUpdate] = useState<string | null>(null);
  const [blogImage, setBlogImage] = useState<string | File | null>(null);

  const [selectedBlog, setSelectedBlog] = useState<BlogItems>({
    id: "",
    title: "",
    description: "",
    category: "",
    date: 0,
    image: null,
  });

  interface BlogItems {
    id: string;
    title: string;
    description: string;
    category: string;
    date: number;
    image: File | null;
  }

  useEffect(() => {
    axios
      .get("http://localhost:8081/blogs/getBlogs")
      .then((response) => {
        const blogsArray = response.data || [];
        const modifiedData = blogsArray.map((item: BlogItems) => ({
          blogid: item.id,
          title: item.title,
          content: item.description,
          category: item.category,
        }));
        setTableData(modifiedData);

        // Set selected category if a blog is selected
        if (selectedBlog) {
          setSelectedCategory(selectedBlog.category);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [selectedBlog]);

  const [formState, setFormState] = useState({
    blogid: "",
    title: "",
    content: "",
    category: "",
    image: null as File | null,
  });
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    // Check if a new file is selected
    if (file) {
      setImageFile(file);
    }
  };

  // Add a new useEffect to update the image in formState when imageFile changes
  useEffect(() => {
    setFormState({
      ...formState,
      image: imageFile,
    });
  }, [imageFile]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
      image: formState.image,
    });
  };

   const [showModal, setShowModal] = useState(false);

   const handleOpenModal = (blogId: string) => {
    setblogIdToUpdate(blogId); 
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };


  const tableHeaders = ["Blogid", "Title", "Content", "Category", "Actions"];

  //table button event handlers------------------------------------------
  const handleEditClick = (rowData: Record<string, any>) => {
    axios
      .get(`http://localhost:8081/blogs/getselectedblog/${rowData.blogid}`)
      .then((res) => {
        const completeData = res.data.blog;

        const bufferData = completeData.image?.data || [];
        const dataUrl = `data:image/png;base64,${Buffer.from(
          bufferData
        ).toString("base64")}`;

        setSelectedBlog((prevSelectedBlog) => ({
          ...prevSelectedBlog,
          blogid: completeData.id || 0,
          title: completeData.title || "",
          content: completeData.description || "",
          category: completeData.category || "",
          image: completeData.image || null,
        }));
        handleOpenModal(rowData.blogid);

        setBlogImage(dataUrl || null);
      })
      
      .catch((err) => console.log(err));
  };
  

  const handleDeleteClick = async (rowData: Record<string, any>) => {
    if (
      window.confirm(`Are you sure you want to delete blog ${rowData.blogid}?`)
    ) {
      try {
        const deleteResponse = await axios.delete(
          `http://localhost:8081/blogs/deleteBlog/${rowData.blogid}`
        );

        console.log("Delete Response:", deleteResponse);

        if (deleteResponse.status === 200) {
          console.log("Delete successful. Fetching updated data...");

          const blogResponse = await axios.get(
            "http://localhost:8081/blogs/getblogs"
          );
          console.log("Blog Response:", blogResponse);

          const blogsArray = blogResponse.data.blogs || [];
          const modifiedData = blogsArray.map((item: BlogItems) => ({
            blogid: item.id,
            title: item.title,
            content: item.description,
            category: item.category,
          }));

          setTableData(modifiedData);

          // Display alert after updating state
          toast.success(`Package ${rowData.blogid} deleted successfully`, {
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
        } else {
          console.error("Delete request failed:", deleteResponse);
          toast.error("Failed to delete", {
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
         
        }
      } catch (error) {
        console.error("Error deleting or fetching data:", error);
        toast.error(
          "Error deleting or fetching data. Please check the console for more details.",
          {
            position: "top-right",
            duration: 3000,

            style: {
              minWidth: "300px",
              maxWidth: "400px",
              minHeight: "80px",
              fontSize: "18px",
              transform: "translateX(0%)",
            },
          }
        );
      }
    }
  };
  return (
    <>
      <div className="mt-8">
        <StyledTable
          data={tableData}
          headers={tableHeaders}
          tdClass="text-blue-500 font-semibold"
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
        />
      </div>
      <div>
        <PopupModal isOpen={showModal} onClose={handleCloseModal}>
        <BlogForm id={blogIdToUpdate}/>
        </PopupModal>
      </div>
    </>
  );
};
``