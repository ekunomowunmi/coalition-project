"use client";

import { useEffect, useState } from "react";
import React from "react";
import Link from "next/link";
import { Patient } from "@/app/types";
import { IoEllipsisHorizontal } from "react-icons/io5";
import useScreenWidth from "@/app/hooks/useWidth.hook";
import { FaSearch } from "react-icons/fa";

type PatientList = {
  patients: Patient[];
  activePatientNumber: string;
  onSelectPatient: (phoneNumber: string) => void;
};

export default function PatientsList({
  activePatientNumber,
  onSelectPatient,
  patients,
}: PatientList) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPatients, setFilteredPatients] = useState(patients || []);
  const [showSearch, setShowSearch] = useState(false);
  const profileWidth = (useScreenWidth() || 1600) * 0.229375;

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  useEffect(() => {
    const filtered = patients.filter((patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPatients(filtered);
  }, [searchTerm, patients]);
  console.log("filteredPatients", filteredPatients);
  return (
    <div
      className="patients-list-container"
      style={{ width: `${profileWidth}px` }}
    >
      <div className="patients-header">
        <div className="patients-search">
          <p>Patients</p>
          <div className="search-box">
            <FaSearch onClick={toggleSearch} />
          </div>
        </div>
        {showSearch && (
          <input
            type="text"
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        )}
      </div>

      <div className="patients-list">
        {filteredPatients.map((patient) => (
          <div
            key={patient.phone_number}
            className={`patient-card ${
              patient.phone_number === activePatientNumber ? "active" : ""
            }`}
            onClick={() =>
              onSelectPatient && onSelectPatient(patient.phone_number)
            }
          >
            <div className="patient-avatar">
              <img src={patient.profile_picture} alt={patient.name} />
            </div>
            <div className="patient-info">
              <h3>{patient.name}</h3>
              <p>
                {patient.gender}, {patient.age}
              </p>
            </div>
            <button className="options-btn">
              <IoEllipsisHorizontal />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
