import React, { useState } from "react";
import axios from "axios";

const Upload = () => {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert(res.data.message);
    } catch (err) {
      alert("Upload failed: " + err.response?.data?.error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 border rounded w-96">
        <h2 className="text-xl font-bold">Upload Excel</h2>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit" className="bg-purple-500 text-white p-2 rounded">
          Upload
        </button>
      </form>
    </div>
  );
};

export default Upload;
