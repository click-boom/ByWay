"use client";
import React, { useState, useEffect } from "react";
import StyledTable2 from "@/Components/Common/StyledTable2";
import axios from "axios";
import { toast } from "sonner";
import SectionTitle from "@/Components/Common/SectionTitle";
import Loader from "@/Components/Common/Loader";
import Popup from "@/Components/Common/Popup";
import { useRouter } from "next/navigation";

interface TableData {
  contact_id: string;
  email: string;
  phone: string;
  subject: string;
  address: string;
  message: string;
}

const Table: React.FC = () => {
  const [auth, setAuth] = useState<boolean | undefined>();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<TableData[]>([]);
  const router = useRouter();

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .get("http://localhost:8081/admin/dash")
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
  }, [router]);

  useEffect(() => {
    axios.defaults.withCredentials = true;

    axios
      .get("http://localhost:8081/contactus/getcontacts")
      .then((response) => {
        const contactArray = response.data || [];
        const modifiedData = contactArray.map((item: TableData) => ({
          id: item.contact_id,
          email: item.email,
          contact: item.phone,
          subject: item.subject,
          address: item.address,
          message: item.message,
        }));
        setData(modifiedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const handleDeleteClick = async (rowData: Record<string, any>) => {
    if (window.confirm(`Are you sure you want to delete blog ${rowData.id}?`)) {
      try {
        const deleteResponse = await axios.delete(
          `http://localhost:8081/contactus/deletecontact/${rowData.id}`
        );

        if (deleteResponse.status === 200) {
          console.log("Delete successful. Fetching updated data...", {
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

          // Fetch the updated data and set it in the state
          fetchUpdatedData();

          // Display alert after updating state
          toast.success(`${rowData.email}'s enquiry deleted successfully`, {
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
        toast.error(
          "Error deleting or fetching data. Please check the console for more details."
        );
      }
    }
  };

  const fetchUpdatedData = () => {
    axios
      .get("http://localhost:8081/contactus/getcontacts")
      .then((response) => {
        const contactArray = response.data || [];
        const modifiedData = contactArray.map((item: TableData) => ({
          id: item.contact_id,
          email: item.email,
          contact: item.phone,
          subject: item.subject,
          address: item.address,
          message: item.message,
        }));
        setData(modifiedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const tableHeaders = [
    "Id",
    "Email",
    "Contact",
    "Subject",
    "Address",
    "Message",
    "Actions",
  ];
    if (loading) {
      return <Loader />;
    }
  return (
    <>
      {auth ? (
        <div className="overflow-x-auto">
          <SectionTitle title="Contact Us Portal" paragraph="" center mb="10" />
          <div className="p-5 mt-5">
            <StyledTable2
              data={data}
              headers={tableHeaders}
              tdClass="text-blue-500 font-semibold"
              onDeleteClick={handleDeleteClick}
            />
          </div>
        </div>
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

export default Table;
