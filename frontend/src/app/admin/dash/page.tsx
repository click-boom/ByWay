"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Popup from "@/Components/Common/Popup";
import { AdminMap } from "@/Components/Maps/AdminMap";
import Loader from "@/Components/Common/Loader";

export default function Dash() {
  const [auth, setAuth] = useState<boolean | undefined>();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true); // Add this line

  axios.defaults.withCredentials = true;
  const router = useRouter();

  useEffect(() => {
    axios
      .get("http://localhost:8081/admin/dash")
      .then((res) => {
        if (res.data.Status === "Success") {
          setAuth(true);
          setName(res.data.UserData.username);
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

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {auth ? (
        <>
            <AdminMap id="adminMap" />
        </>
      ) : (
        <div>
          <Popup
            closable={false}
            message="You are not authenticated"
            buttonText="Login now"
            onClick={() => {
              router.push("/auth");
            }}
          />
        </div>
      )}
    </>
  );
}
