"use client"
import React, { useEffect, useState } from 'react';
import {toast, Toaster} from 'sonner';
import { MdOutlineDelete } from "react-icons/md";
import axios from 'axios';
import { useRouter } from "next/navigation";
import Popup from "@/Components/Common/Popup";
import Loader from "@/Components/Common/Loader";

const AdminDashboard: React.FC = () => {
  const [auth, setAuth] = useState<boolean | undefined>();
  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions] = useState<any[]>([]);
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
    getSubmissions();
  }, []);

  function getSubmissions() {
    console.log('Fetching submissions...');
    fetch('http://localhost:8081/planTrip/gettrip')
      .then(response => response.json())
      .then(submissions => {
        console.log('Submissions received:', submissions);
        setSubmissions(submissions); 
      })
      .catch(error => {
        console.error('Error fetching submissions:', error);
      });
  }

  function handleDelete(submissionId: string) {
    fetch(`http://localhost:8081/planTrip/api/delete/${submissionId}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(result => {
        console.log('Submission deleted successfully:', result);
        getSubmissions(); // Refresh submissions after deletion
        toast.success('Submission deleted successfully', {
          position: "top-right",
          duration: 3000,
          duration: 3000,
          style: {
            minWidth: "300px",
            maxWidth: "400px",
            minHeight: "80px",
            fontSize: "18px",
            transform: "translateX(0%)", 
          },
        });
      })
      .catch(error => {
        console.error('Error deleting submission:', error);
        toast.error('Error deleting submission', {
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
      });
  }
    if (loading) {
      return <Loader />;
    }

  return (
    <>
      {auth ? (
       <div className='font-san'>
      
  <table className="w-full border-collapse  text-white  ">
      <thead >
            <tr >
            <th className=' bg-green-700 border-gray-500 border '>S.N</th>
            
                <th className='bg-green-700 border border-gray-500 p-4'>Name</th>
          
                <th className='bg-green-700 border border-gray-500 p-4'>Phone Number</th>
                <th className='bg-green-700 border border-gray-500 p-4'>Email</th>
                <th className='bg-green-700 border border-gray-500 p-4'>Select Trip</th>
                <th className='bg-green-700 border border-gray-500 p-4'>Approx Date</th>
                <th className='bg-green-700 border border-gray-500 p-4'>Trip Length</th>
            
                <th className='bg-green-700 border border-gray-500 p-4'>Adults</th>
                <th className='bg-green-700 border border-gray-500 p-4'>Children</th>
                <th className='bg-green-700 border border-gray-500 p-4 '>Tour Type</th>
                <th className='bg-green-700 border border-gray-500 p-4'>Hotel Type</th>
            
                <th className='bg-green-700 border border-gray-500 p-4 '>Estimated Budget</th>
                <th className='bg-green-700 border border-gray-500 p-4 '>Guide Language</th>
                <th className='bg-green-700 border border-gray-500 p-4 '>More Info</th>
              
                <th className='bg-green-700 border border-gray-500 p-4 '>Where Did You Find Us</th>
                <th className='bg-green-700 border border-gray-500 p-4 '>Action</th>
            </tr>
        </thead>
        <tbody >
          {submissions.map(submission => (
         <tr className='group hover:bg-gray-500 ' key={submission.id}>
         {/* Map each property from your submission object */}
         {Object.values(submission).map((value, index) => (
           <td
             key={index}
             className='bg-white text-black border border-gray-500 p-4 font-semibold font-mono group-hover:bg-gray-200'
           >
             {String(value)}
           </td>
         ))}
              <td className='bg-white border border-gray-500 p-4 font-semibold font-mono'>
                <button
                  className="button-delete bg-green-500 text-white px-4 py-2 rounded hover:bg-red-500"
                  onClick={() => handleDelete(submission.id)}
                >
                  <MdOutlineDelete/>
                  <Toaster className="absolute right-0 transform translate-x-16transition-transform duration-300 ease-in-out" richColors />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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

export default AdminDashboard;