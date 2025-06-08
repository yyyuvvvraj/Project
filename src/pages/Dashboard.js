import React, { useRef, useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [summary, setSummary] = useState({
    fileCount: 0,
    rowCount: 0,
    latestFiles: [],
  });

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const fileInputRef = useRef(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/dashboard/summary")
      .then(res => setSummary(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Yahan aap file upload ka logic likh sakte hain
      alert(`Selected file: ${file.name}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 bg-white shadow">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="h-8" />
          <span className="font-bold text-lg">Excel Analytics</span>
        </div>
        <nav className="flex items-center gap-6">
          <a href="/dashboard" className="text-gray-700 hover:underline font-medium">Dashboard</a>
          <a href="/upload" className="flex items-center gap-1 text-gray-700 hover:underline font-medium">
            <span role="img" aria-label="upload">📤</span> Upload
          </a>
          <div className="flex flex-col items-end">
            <span className="font-medium">{user.name || "User"}</span>
            <span className="text-xs text-gray-500">{user.email || ""}</span>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-4 py-8">
        <h1 className="text-3xl font-bold mb-2 text-center">Welcome back, </h1>
        <p className="text-gray-600 mb-8 text-center">Here's an overview of your Excel analytics</p>

        {/* Cards */}
        <div className="flex flex-col md:flex-row gap-6 mb-10">
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center border-l-4 border-blue-400 min-w-[250px]">
            <span className="text-2xl mb-2" role="img" aria-label="upload">📤</span>
            <span className="font-semibold mb-1">Upload Excel File</span>
            <span className="text-gray-500 text-sm mb-2">Import new data for analysis</span>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded text-sm font-medium mt-2"
              onClick={handleUploadClick}
            >
              Upload
            </button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
              accept=".xlsx,.xls"
            />
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center border-l-4 border-green-400 min-w-[250px]">
            <span className="text-3xl font-bold mb-2">{summary.fileCount}</span>
            <span className="font-semibold">Files uploaded</span>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center border-l-4 border-purple-400 min-w-[250px]">
            <span className="text-3xl font-bold mb-2">{summary.rowCount}</span>
            <span className="font-semibold">Rows analyzed</span>
          </div>
        </div>

        {/* Recent Files Table */}
        <div className="w-full max-w-3xl bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Files</h2>
            <a href="/upload" className="text-blue-600 hover:underline text-sm font-medium">+ Upload New</a>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2">File Name</th>
                <th className="py-2">Date Uploaded</th>
                <th className="py-2">Size</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {summary.latestFiles.map(file => (
                <tr key={file._id} className="border-b hover:bg-gray-50">
                  <td className="py-2">{file.originalName}</td>
                  <td className="py-2">{new Date(file.uploadDate).toLocaleDateString()}</td>
                  <td className="py-2">{(file.size / 1024).toFixed(1)} KB</td>
                  <td className="py-2">
                    <a href="#" className="text-blue-600 hover:underline mr-4">Analyze</a>
                    <a href="#" className="text-red-500 hover:underline">Delete</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-600 text-white text-center py-3 mt-8">
        © 2025 Excel Analytics. All rights reserved.
      </footer>
    </div>
  );
};

export default Dashboard;
