"use client";
import React, { useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import {Toaster} from 'sonner';

interface StyledTableProps {
  data: Array<Record<string, any>>;
  headers: Array<string>;
  tdClass: string;
  onDeleteClick?: (rowData: Record<string, any>) => void;
  itemsPerPage?: number;
}

const StyledTable: React.FC<StyledTableProps> = ({
  data,
  headers,
  tdClass,
  onDeleteClick,
  itemsPerPage = 10,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleDeleteClick = (row: Record<string, any>) => {
    if (onDeleteClick) {
      onDeleteClick(row);
    }
  };
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <table className="table-auto border-collapse w-full">
        <thead>
          <tr className="bg-green-700 text-white font-bold">
            {headers.map((header, index) => (
              <th key={index} className="px-4 py-2 text-center">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>

        {currentData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`${
                rowIndex % 2 === 0 ? 'bg-gray-200' : 'bg-slate-300'
              } ${
                row.isActive ? 'active-row font-bold text-green-700' : ''
              }`}
            >
              
              {headers.map((header, colIndex) => (
                <td key={colIndex} className={`px-4 py-2 ${tdClass} text-center`}>
                  {colIndex === headers.length - 1 ? (
                    
                    <>

                      <td className="px-4 py-2 text-center">
                        <button className="bg-green-700 text-white px-4 py-2 rounded" onClick={() => handleDeleteClick(row)}>
                          <MdOutlineDelete /> 
                          <Toaster className="absolute right-0 transform translate-x-16transition-transform duration-300 ease-in-out" richColors />
                        </button>
                      </td>
                    </>
                  ) : (
                    // Otherwise, display the data
                    row[header.toLowerCase()]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

      </table>
      
      <div className="flex justify-center mt-5 mb-5">
        <button
          className="bg-green-700 text-white rounded-md px-4 py-2 transition duration-300 ease-in-out hover:bg-green-800"
          onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="mx-10">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="bg-green-700 text-white rounded-md px-4 py-2 transition duration-300 ease-in-out hover:bg-green-800"
          onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StyledTable;