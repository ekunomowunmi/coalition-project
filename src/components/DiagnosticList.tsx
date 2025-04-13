import useScreenWidth from "@/app/hooks/useWidth.hook";
import { DiagnosticItem } from "@/app/types";

import React from "react";

export default function DiagnosticList({
  diagnosticList = [],
}: {
  diagnosticList: DiagnosticItem[];
}) {
  const dianosticHistoryWidth = (useScreenWidth() || 1600) * 0.45375;

  return (
    <div
      className="bg-white rounded-xl p-8 shadow-sm"
      style={{ width: `${dianosticHistoryWidth}px` }}
    >
      <p className="diagnosis-header">Diagnostic List</p>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th
                className="text-left p-4 font-medium text-gray-700"
                style={{ paddingRight: "8px" }}
              >
                Problem/Diagnosis
              </th>
              <th className="text-left p-4 font-medium text-gray-700">
                Description
              </th>
              <th className="text-left p-4 font-medium text-gray-700">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {diagnosticList && diagnosticList.length > 0 ? (
              diagnosticList.map((item, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="p-4 text-gray-700">{item.name}</td>
                  <td className="p-4 text-gray-600">{item.description}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full ${getStatusStyle(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="p-4 text-center text-gray-500">
                  No diagnostic data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const getStatusStyle = (status: string) => {
  switch (status) {
    case "Under Observation":
      return "bg-blue-100 text-blue-800";
    case "Cured":
      return "bg-green-100 text-green-800";
    case "Inactive":
      return "bg-gray-100 text-gray-800";
    case "Untreated":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
