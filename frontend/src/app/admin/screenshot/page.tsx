"use client";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaCloudUploadAlt } from "react-icons/fa";

const AdminDashboard: React.FC = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [previews, setPreviews] = useState<string[]>([]);
  const [progress, setProgress] = useState<{ started: boolean; pc: number }>({ started: false, pc: 0 });
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    if (previews.length > 0 && !progress.started && msg === 'Upload successful') {
      // Show previews only after a successful upload
      // You can adjust this condition based on your specific requirements
      console.log('Showing previews');
    }
  }, [previews, progress, msg]);

  function handleUpload() {
    if (!files || files.length === 0) {
      console.log('Files not selected');
      return;
    }
  
    const fd = new FormData();
  
    for (let i = 0; i < files.length; i++) {
      fd.append(`photos`, files[i]);
    }
  
    setMsg('Uploading');
  
    setProgress((prevState) => {
      return { ...prevState, started: true };
    });
  
    axios
      .post('http://localhost:8081/planTrip/uploadphoto', fd, {
        onUploadProgress: (progressEvent) => {
          setProgress((prevState) => {
            return { ...prevState, pc: (progressEvent.loaded / progressEvent.total) * 100 };
          });
        },
        headers: {
          'Custom-Header': 'value',
        },
      })
      .then((res) => {
        setMsg('Upload successful');
        console.log(res.data);

        // Generate previews after successful upload
        let tmp: string[] = [];
        for (let i = 0; i < files.length; i++) {
          tmp.push(URL.createObjectURL(files[i]));
        }
        setPreviews(tmp);
      })
      .catch((err) => {
        setMsg('Upload failed');
        console.error(err);
      });
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  const [id, setId] = useState("");
  const handleBlogDelete = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.delete(
        `http://localhost:8081/planTrip/deletephoto/${id}`
      );
      if (response.data.Status === "Success") {
        alert("Blog deleted successfully");
      } else {
        alert("Deletion error");
      }
    } catch (error) {
      console.error("Deletion error:", error);
    }
  };
  

  return (
    <div className='App min-w-0 max-w-screen-xl flex gap-2 flex-col bg-gray-50   p-32  border border-gray-300 border-solid rounded-md '>
      <h1 className=' font-bold text-3xl'>Upload Files</h1>

      <div className=' flex  flex-col gap-8 p-20 border border-gray-300 mt-4'>
        <div className='flex flex-col gap-0 font-mono'>
          <label htmlFor="fileInput" className='text-7xl mx-auto cursor-pointer'>
            <FaCloudUploadAlt />
          </label>
          <h1 className='font-bold text-center text-lg'>SELECT FILES </h1>
        </div>
        <input
          id="fileInput"
          onChange={handleFileChange}
          type='file'
          name='photo'
          multiple
          className='hidden'
        />
        
        <button className='bg-green-500 py-1 px-2 text-white font-bold text-lg  border-none rounded-md cursor-pointer' onClick={handleUpload}>
          Upload
        </button>
        {progress.started && <progress className='w-full mt-4' max="100" value={progress.pc}></progress>}
        {msg && <span className='text-center font-bold border-b border-gray-400 '>{msg}</span>}
        {previews.length > 0 && 
          previews.map((pic, index) => (
            <img key={index} src={pic} alt={`Preview ${index}`} />
          ))}
      </div>
      <div className="App flex flex-col justify-center">
        <form
          onSubmit={handleBlogDelete}
          className="max-w-[400px] w-full mx-auto bg-black p-8 mt-10 px-8 rounded-lg text-gray-400"
        >
          <h2 style={{fontFamily:"inherit",fontSize:"30px", color:"white",fontWeight:"bold"}}>
            Delete Blog
          </h2>
          <label className='text-white text-1xl font-bold'>
            Blog ID:
            <input
              type="text"
              name="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="rounded-lg bg-gray-700 mt-2 ml-6 p-3 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              required
            />
          </label>
          <button
            type="submit"
            className="w-full my-5 py-2 bg-red-600 text-white font-semibold rounded-lg"
          >
            Delete Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;
