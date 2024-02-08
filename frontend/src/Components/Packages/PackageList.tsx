"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import ReferencePackageItem from "@/Components/Packages/ReferencePackageItem";
import Link from "next/link";

interface PackageItem {
  package_id: number;
  package_title: string;
  image1: string | null;
  price: number;
  about: string;
  duration: number;
  discount: number;
}
const PackageList: React.FC = () => {
  const [packageData, setPackageData] = useState<PackageItem[]>([]);

  useEffect(() => {
    const fetchPackagesData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/packages/getPackages"
        );
        const packagesArray: PackageItem[] = response.data.packages;

        if (Array.isArray(packagesArray)) {
          setPackageData(packagesArray);
        } else {
          console.error(
            "Invalid data format: 'packages' property is not an array",
            response.data
          );
        }
      } catch (error) {
        console.error("Error fetching package data:", error);
      }
    };

    fetchPackagesData();
  }, []);

  return (
    <div>
      <section className="flex py-16 md:py-20 lg:py-28 justify-center">
        <div className="container">
          <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center">
            {packageData.map((packageItem) => (
                            <Link
                            href="/packages/[package_id]"
                            as={`/packages/${packageItem.package_id}`}
                          >
                            
                          
              <ReferencePackageItem
                key={packageItem.package_id}
                package_title={packageItem.package_title}
                imgSrc={
                  packageItem.image1
                    ? `data:image/jpeg;base64,${Buffer.from(
                        packageItem.image1
                      ).toString("base64")}`
                    : null
                }
                price={packageItem.price.toString()}
                about={packageItem.about}
                duration={packageItem.duration.toString()}
                discount={packageItem.discount.toString()}
              />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PackageList;