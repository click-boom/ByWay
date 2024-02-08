"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogContainer from "./BlogContainer";
import HeaderTab from "@/Components/Header";
import FooterTab from '@/Components/Footer';
import { FaSearch } from 'react-icons/fa';
import LeftPanel from "@/Components/Blogs/LeftPanel";
import TrendingBlogContainer from "@/Components/Blogs/TrendingBlogContainer";
import Link from "next/link";


interface Blog {
  title: string;
  description: string;
  published_date: string;
  image: Buffer;
  category: "Trending" | "Normal";
}

interface BlogContainerProps {
  title: string;
  description: string;
  publishedDate: string;
  imageSrc: string;
}

function Blogs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [blogData, setBlogData] = useState<Array<Blog>>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/blogs/getblogs")
      .then((response) => {
        setBlogData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching blog data:", error);
      });
      
  }, []);

  //Searched box filtered
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredBlogData = blogData.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  //Two category
  const trendingBlogs = filteredBlogData
    .filter((blog) => blog.category === "Trending")
    .slice(0, 10);
  const recentBlogs = filteredBlogData.filter(
    (blog) => blog.category === "Normal"
  );

  return (
    <>
    <HeaderTab />
    <div style={{ height: "30vh", position: "relative" }}>
    
      {/* Search bar */}
      <div
        className="absolute  top-2/4 right-0  transform -translate-x-1/2 -translate-y-1/2 text-center"
        style={{ width: "767px", right:"-23%"}}
      >
        <form className="flex">
          <input
            type="text"
            placeholder="Search Blogs ..."
            className="w-3/5 p-3 mr-2 rounded border-1 focus:outline-none focus:shadow-xl bg-white-200"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button
            type="submit"
            className="p-2 rounded bg-transparent text-white border-0 transition duration-200 hover:bg-green-500"
            onMouseOver={(e) => ((e.target as HTMLButtonElement).style.backgroundColor = "green")}
            onMouseOut={(e) => ((e.target as HTMLButtonElement).style.backgroundColor = "transparent")}
          >
            <FaSearch />
          </button>
        </form>
      </div>
    </div>
    
    

    <div className="max-w-6xl mx-auto p-8 bg-gray-50 text-4xl font-bold my-6  absolute left-0 ml-7 rounded-md text-center">
            Most Visited

            {recentBlogs.map((blog, index) => (
              <Link key={index} href={`/blogs/[id]`} as={`/blogs/${blog.id}`}>
              <LeftPanel
                key={index}
                title={blog.title}
                date={blog.published_date}
                imagePath={
                  blog.image
                    ? `data:image/jpeg;base64,${Buffer.from(blog.image).toString("base64")}`
                    : ""
                }
              />
              </Link>
            ))}
        
    </div>

    
    
    <div className="max-w-6xl mx-auto p-5 bg-white rounded-xl shadow-lg-10 mb-8 height">

    {/* Top Trending Blogs */}
    <div>
      <h1 className="text-4xl font-bold my-6 px-4">
        <b>Top Trending Blogs</b>
      </h1>

      {trendingBlogs.map((blog, index) => (
        <Link key={index} href={`/blogs/[id]`} as={`/blogs/${blog.id}`}>
        <TrendingBlogContainer
          key={index}
          title={blog.title}
          location={blog.location}
          date={blog.published_date}
          description={blog.description}
          imageSrc={
            blog.image
              ? `data:image/jpeg;base64,${Buffer.from(blog.image).toString("base64")}`
              : ""
          }
        /></Link>
      ))}
    </div>


  </div>
  <FooterTab />
</>
);
}

// Function to sanitize HTML by removing unwanted tags
const sanitizeHtml = (html) => {
  const allowedTags = ['p', 'strong', 'em', 'u', 'a', 'br', 'h1', 'h2', 'h3'];
  const doc = new DOMParser().parseFromString(html, 'text/html');
  
  // Remove unwanted tags
  doc.body.querySelectorAll('*').forEach((node) => {
    if (!allowedTags.includes(node.tagName.toLowerCase())) {
      node.parentNode.removeChild(node);
    }
  });

  return doc.body.innerHTML;
};

const RecentBlogContainer: React.FC<BlogContainerProps> = ({
  title,
  description,
  publishedDate,
  imageSrc,
}) => {
  return (
    <div
      style={{
        display: "flex",
        width: "80%",
        margin: "auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      {/* Left side for Image */}
      <div style={{ flex: "0 0 30%", marginRight: "20px" }}>
        <img
          src={imageSrc}
          alt="Blog Cover"
          style={{ width: "100%", height: "auto", borderRadius: "8px" }}
        />
      </div>

      {/* Right side for Content */}
      <div style={{ flex: "1" }}>
        <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>{title}</h2>
        <p style={{ fontSize: "16px", color: "#555" }}>{description}</p>
        <div style={{ marginTop: "auto", textAlign: "right" }}>
          <p style={{ fontSize: "14px", fontWeight: "bold", color: "#888" }}>
            {publishedDate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
