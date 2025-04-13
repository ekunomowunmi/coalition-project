import { download } from "@/assets/svg";
import { FaDownload } from "react-icons/fa";
import Image from "next/image";
import React from "react";

export default function LabResults({
  labResultsList = [],
}: {
  labResultsList: string[];
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 w-full max-w-md">
      <div className=" pb-2 mb-3 flex items-center justify-between">
        <p className="diagnosis-header">Lab Results</p>
      </div>

      <div className="max-h-48 overflow-y-auto pr-2">
        <div className="space-y-4">
          {labResultsList.map((result, index) => (
            <div key={index} className="flex items-center justify-between py-1">
              <p className="text-gray-600">{result}</p>
              <Image src={download} alt="Fusion logo" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end mt-2">
        <div className="w-1 h-16 bg-gray-200 rounded-full relative">
          <div className="absolute top-1/4 w-1 h-1/4 bg-gray-800 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
