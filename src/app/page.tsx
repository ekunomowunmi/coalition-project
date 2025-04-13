"use client";
import PatientsList from "@/components/PatientsList";
import TopNav from "@/components/TopNav";
import { useEffect, useState } from "react";
import { Patient } from "./types";
import DiagnosisData from "@/components/DiagnosisData";
import ProfileLabData from "@/components/ProfileLabData";
import Loader from "@/components/Loaders";

export default function Home() {
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [selectedProfile, setSelectedProfile] = useState<Patient | undefined>(
    undefined
  );

  const [data, setData] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "https://fedskillstest.coalitiontechnologies.workers.dev",
        {
          method: "GET",
          headers: {
            Authorization: `Basic ${Buffer.from(
              `${process.env.NEXT_PUBLIC_API_USERNAME}:${process.env.NEXT_PUBLIC_API_PASSWORD}`
            ).toString("base64")}`,
          },
        }
      );
      const result = await res.json();
      console.log("result", result);
      setData(result);
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const jessica = data.find((patient) => patient.name === "Jessica Taylor");
      if (jessica) {
        setSelectedPatientId(jessica.phone_number);
        setSelectedProfile(jessica);
      }
    }
  }, [data]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
        <Loader
          size="large"
          color={"primary"}
          text={"Loading Data,Please wait..."}
        />
      </div>
    );
  }

  return (
    <>
      <TopNav />
      <div className="main-content">
        <div className="patients-container">
          <PatientsList
            patients={data}
            activePatientNumber={selectedPatientId}
            onSelectPatient={setSelectedPatientId}
          />
          <div className="patient-detail">
            {/* <PatientHistory patient={selectedProfile} /> */}
            <DiagnosisData patient={selectedProfile} />
            <ProfileLabData patient={selectedProfile} />
          </div>
        </div>
      </div>
    </>
  );
}
