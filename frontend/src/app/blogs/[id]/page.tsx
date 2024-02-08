"use client";
import SectionTitle from "@/Components/Common/SectionTitle";
import HeaderTab from "@/Components/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import FooterTab from "@/Components/Footer";

export default function Page({ params }: { params: { id: string } }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPackageData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/blogs/getblogs/${params.id}`
        );
        console.log("Retrieved data:", response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching package data:", error);
        setError("Error fetching data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPackageData();
  }, [params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const sanitizeHtml = (html: string) => {
    const allowedTags = ['p', 'strong', 'em', 'u', 'a', 'br', 'h1', 'h2', 'h3'];
    const doc = new DOMParser().parseFromString(html, 'text/html');

    doc.body.querySelectorAll('*').forEach((node) => {
      if (!allowedTags.includes(node.tagName.toLowerCase())) {
        node.parentNode.removeChild(node);
      }
    });

    return doc.body.innerHTML;
  };

  const sanitizedDescription = sanitizeHtml(data.description);

  return (
    <>
    <div>
      <HeaderTab />

      <div className="w-screen h-full flex flex-col gap-10 items-center justify-center ">
      
      <div className="flex justify-center w-[65%] mt-36">
        <h1 className="text-green-600 p-4 text-4xl font-semibold font-mono  h-full flex flex-col items-center justify-center">
          {data.title}
        </h1>

</div>
        {data.image && (
          <img
            style={{
              width: "100%",
              height: "auto",
              maxWidth: "1550px", // Set the maximum width as needed
            }}
            src={`data:image/jpeg;base64,${Buffer.from(data.image).toString(
              "base64"
            )}`}
            alt={data.title}
          />
        )}
        {/* <div className="py-5"></div> */}

        <p className="flex text-2xl font-mono justify-center items-center pt-6 p-11" dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
      </div>
    </div>
    <FooterTab/>
    </>
  );
}
