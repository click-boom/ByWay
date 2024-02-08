"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "@/Components/Common/Loader";
import { PopupModal } from "@/Components/Common/ContainerModal";
import { BlogTable } from "@/Components/Blogs/BlogTable";
import BlogForm from "@/Components/Blogs/BlogForm";
import { CiCirclePlus } from "react-icons/ci";
import Popup from "@/Components/Common/Popup";
import { useRouter } from "next/navigation";

const AdminBlogPage = () => {
  const [auth, setAuth] = useState<boolean | undefined>();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .get("http://localhost:8081/admin/dash") // Use the same endpoint for authentication
      .then((res) => {
        if (res.data.Status === "Success") {
          setAuth(true);
        } else {
          setAuth(false);
        }
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {auth ? (
        <>
          <div className="text-4xl text-green-700 text-center font-semibold p-8">
            Blogs Portal
          </div>
          <div className=" mx-16">
            {" "}
            <div className=" flex justify-end ">
              <button
                onClick={handleOpenModal}
                className="bg-green-700 p-3 px-4 rounded"
              >
                <div className="flex items-center">
                  <div className="mr-2">
                    <CiCirclePlus size={32} color="white" />
                  </div>
                  <span className="text-white font-semibold">Add Blogs</span>
                </div>
              </button>
            </div>
            <BlogTable />
          </div>

          <PopupModal isOpen={showModal} onClose={handleCloseModal}>
            <BlogForm />
          </PopupModal>
        </>
      ) : (
        <Popup
          closable={false}
          message="You are not authenticated"
          buttonText="Login now"
          onClick={() => {
            router.push("/auth");
          }}
        />
      )}
    </>
  );
};

export default AdminBlogPage;
