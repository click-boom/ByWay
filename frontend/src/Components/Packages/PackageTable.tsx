"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import {toast} from "sonner";

import StyledTable from "../Common/StyledTable";
import { PackageForm } from "./PackageForm";
import { PopupModal } from "../Common/ContainerModal";


export const PackageTable = () => {
  interface PackageItem {
    package_id: string;
    package_title: string;
    location_id: string;
    price: number;
    discount: number;
  }


interface PackageData {
  title: string;
  location_id: string;
  about: string;
  guidance_language: string;
  whats_included: string;
  what_to_expect: string;
  departure_and_return: string;
  accessibility: string;
  additional_info: string;
  price: number;
  discount: number;
}


  const [tableData, setTableData] = useState([]);
  const [packageIdToUpdate, setPackageIdToUpdate] = useState<string | null>(null);
  const [packageData, setPackageData] = useState<PackageData>({
    title: "",
    location_id: "",
    about: "",
    guidance_language: "",
    whats_included: "",
    what_to_expect: "",
    departure_and_return: "",
    accessibility: "",
    additional_info: "",
    price: 0,
    discount: 0,
  });

  useEffect(() => {
    // Fetching packages data
    axios
      .get("http://localhost:8081/packages/getPackages")
      .then((response) => {
        const packagesArray = response.data.packages || [];
        const modifiedData = packagesArray.map((item: PackageItem) => ({
          packageid: item.package_id,
          name: item.package_title,
          locationsid: item.location_id,
          price: item.price,
          discount: item.discount,
        }));
        setTableData(modifiedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const tableHeaders = [
    "PackageId",
    "Name",
    "LocationsId",
    "Price",
    "Discount",
    "Actions",
  ];
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = (packageId: string) => {
    setPackageIdToUpdate(packageId); 
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  //table button event handlers------------------------------------------
  const handleEditClick = (rowData: Record<string, any>) => {
    // Fetch the complete data for the selected package from the database
    axios
      .get(
        `http://localhost:8081/packages/getSelectedPackage/${rowData.packageid}`
      )
      .then((res) => {
        const completeData = res.data.package;
        setPackageData({
          title: completeData.title || "",
          location_id: completeData.location_id || 0,
          about: completeData.about || "",
          guidance_language: completeData.guidance_language || "",
          whats_included: completeData.whats_included || "",
          what_to_expect: completeData.what_to_expect || "",
          departure_and_return: completeData.departure_and_return || "",
          accessibility: completeData.accessibility || "",
          additional_info: completeData.additional_info || "",
          price: completeData.price || "",
          discount: completeData.discount || "",
        });
        handleOpenModal(rowData.packageid);
      })
      .catch((err) => console.log(err));
  };
  const handleDeleteClick = async (rowData: Record<string, any>) => {
    if (
      window.confirm(
        `Are you sure you want to delete package ${rowData.packageid}?`
      )
    ) {
      try {
        const deleteResponse = await axios.delete(
          `http://localhost:8081/packages/deletePackages/${rowData.packageid}`
        );
        console.log("Delete Response:", deleteResponse);

        if (deleteResponse.status === 200) {
          console.log("Delete successful. Fetching updated data...");

          const packagesResponse = await axios.get(
            "http://localhost:8081/packages/getPackages"
          );
          console.log("Packages Response:", packagesResponse);

          const packagesArray = packagesResponse.data.packages || [];
          const modifiedData = packagesArray.map((item: PackageItem) => ({
            packageid: item.package_id,
            name: item.package_title,
            locationsid: item.location_id,
            price: item.price,
            discount: item.discount,
          }));

          setTableData(modifiedData);

          // Display alert after updating state
          
          toast.success(`Package ${rowData.packageid} deleted successfully`, {
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
          // alert(deleteResponse.data.message || "Delete request failed");
          toast.error(deleteResponse.data.message || "Delete request failed", {
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

        toast.error("Error deleting or fetching data. Please check the console for more details.", {
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
        <PackageForm id={packageIdToUpdate}/>
        </PopupModal>
      </div>
    </>
  );
};
