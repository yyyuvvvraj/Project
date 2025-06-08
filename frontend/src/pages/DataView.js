import React, { useEffect, useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";

const DataView = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/data")
      .then((res) => setRows(res.data))
      .catch((err) => console.error(err));
  }, []);

  const exportToExcel = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/upload/export", {
        responseType: "blob",
      });
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "ExportedData.xlsx");
    } catch (error) {
      console.error("Export failed", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Uploaded Data</h2>

      <button
        onClick={exportToExcel}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        Export to Excel
      </button>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            {rows[0] && Object.keys(rows[0]).map((key) => (
              <th key={key} className="py-2 px-4 border-b text-left">{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="border-b">
              {Object.values(row).map((value, idx) => (
                <td key={idx} className="py-2 px-4">{String(value)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataView;
