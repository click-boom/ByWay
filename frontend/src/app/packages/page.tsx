"use client";
import React, { useState, useEffect } from "react";
import Card from "@/Components/Packages/Cards";
import Link from "next/link";
import HeaderTab from "@/Components/Header";
import axios from "axios";
import { IoSearch } from "react-icons/io5";
import FooterTab from '@/Components/Footer';

type PackageItemProps = {
  package_title: string;
  discount: string;
  price: string;
  about: string;
  duration: string;
  package_id: string;
  image1: string | null;
  image2: string | null;
  image3: string | null;
  image4: string | null;
  imgSrc?: string | null | undefined; 
};

export const fetchPackagesData = async (): Promise<Array<PackageItemProps>> => {
  try {
    const response = await axios.get(
      "http://localhost:8081/packages/getpackages"
    );

    console.log("Raw data from the server:", response.data);

    // Check if "packages" property exists and is an array
    const packagesArray = response.data.packages;
    if (!Array.isArray(packagesArray)) {
      console.error(
        "Invalid data format: 'packages' property is not an array",
        response.data
      );
      throw new Error("Invalid data format");
    }

    // Convert image data to base64 strings
    const dataWithBase64Images = packagesArray.map((item: PackageItemProps) => {
      try {
        const base64Image1 = item.image1
          ? `data:image/jpeg;base64,${Buffer.from(
              item.image1 as string
            ).toString("base64")}`
          : null;
        const base64Image2 = item.image2
          ? `data:image/jpeg;base64,${Buffer.from(
              item.image2 as string
            ).toString("base64")}`
          : null;
        const base64Image3 = item.image3
          ? `data:image/jpeg;base64,${Buffer.from(
              item.image3 as string
            ).toString("base64")}`
          : null;
        const base64Image4 = item.image4
          ? `data:image/jpeg;base64,${Buffer.from(
              item.image4 as string
            ).toString("base64")}`
          : null;

        return {
          ...item,
          image1: base64Image1,
          image2: base64Image2,
          image3: base64Image3,
          image4: base64Image4,
        };
      } catch (imageError) {
        console.error("Error processing image data for item:", item);
        throw imageError;
      }
    });

    console.log("Data after conversion:", dataWithBase64Images);

    return dataWithBase64Images;
  } catch (error) {
    console.error("Error fetching package data:", error);
    throw error;
  }
};
const PackageItem: React.FC<PackageItemProps> = ({
  package_title,
  price,
  about,
  duration,
  package_id,
  discount,
  image1,
  imgSrc = "frontend/public/images/Mountains 1.jpg",
}) => {
  // Convert Buffer to base64 string
  const base64Image = image1
    ? `data:image/jpeg;base64,${Buffer.from(image1 as string).toString("base64")}`
    : (imgSrc ? `/${imgSrc}` : "/path/to/your/default/image");

  const src = imgSrc || base64Image;

  const numericPrice = parseInt(price);
  const discountPercentage = parseInt(discount);

  if (isNaN(numericPrice) || isNaN(discountPercentage)) {
    console.error("Invalid price or discount:", price, discount);
    return null;
  }

  const discountedPrice = numericPrice - (numericPrice * discountPercentage) / 100;

  return (
    <div className="overflow-hidden border border-slate-200 w-80 h-80 group flex justify-center mx-auto">
      <div className="overflow-hidden relative">
        <Card title={package_title} price={price} imgSrc={imgSrc}>
          <div className="text-bold flex justify-between">
            <strong className="text-xl">{package_title}</strong>
            <div>
              {discountPercentage > 0 ? (
                <>
                  <span className="text-white font-bold ">
                    ${discountedPrice.toFixed(2)}
                  </span>
                  <br />
                  <span className="text-white line-through">
                    ${numericPrice.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="font-bold">${numericPrice.toFixed(2)}</span>
              )}
            </div>
          </div>

          <div className="flex justify-between">
            <div className="mt-1">{duration} days</div>
          </div>
          <hr className="mt-2 mb-2 border-white" />
          <div className="mt-2">{about}</div>
          <hr className="mt-2 mb-2 border-white" />
          <div className="mt-2 flex justify-between items-center">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              <Link
                href="/packages/[package_id]"
                as={`/packages/${package_id}`}
              >
                Details
              </Link>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

const Packages: React.FC = () => {
  const [packageData, setPackageData] = useState<Array<PackageItemProps>>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawData = await fetchPackagesData();
        if (Array.isArray(rawData)) {
          setPackageData(rawData);
        } else {
          console.error("Invalid data format:", rawData);
        }
      } catch (error) {
        console.error("Error fetching package data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  

  const filteredPackages = packageData.filter((packages) =>
    packages.package_title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <HeaderTab />
      <div>
        <div className="mb-0" style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: "70%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "700px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "70%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "80%",
                textAlign: "center",
              }}
            >
              <form className="flex items-center bg-white rounded-md">
                <IoSearch className="text-slate-600 mx-4 mr-2" />
                <input
                  type="text"
                  placeholder="Search..."
                  style={{
                    width: "70%",
                    padding: "10px",
                    borderRadius: "2px",
                    border: "0px solid #fff",
                    outline: "none",
                  }}
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </form>
            </div>
          </div>
          <img
            src="/assets/packagesImg/coverimage.jpg"
            alt="Background"
            className="w-full"
          />
        </div>
        <>
          <h3 className="font-bold text-4xl text-left bg-indigo-950 text-white p-4 pb-4 mb-0">
            Our Packages
          </h3>
          <section className="flex py-16 md:py-20 lg:py-28 justify-center ">
            <div className="container ">
              <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center">
                {filteredPackages.map((card) => (
                  <PackageItem
                    key={card.package_id}
                    package_title={card.package_title}
                    imgSrc={card.image1}
                    price={card.price.toString()}
                    about={card.about}
                    package_id={card.package_id.toString()}
                    duration={card.duration}
                    discount={card.discount.toString()} 
                    image1={null} image2={null} image3={null} image4={null}                  />
                ))}
              </div>
            </div>
          </section>
          <FooterTab />
        </>
      </div>
    </>
  );
};

export default Packages;
