import { Patient } from "@/app/types";
import PatientHistory from "./PatientHistory";
import DiagnosticList from "./DiagnosticList";

export default function DiagnosisData({ patient }: { patient?: Patient }) {
  return (
    <div
      style={{ gap: "16px", display: "flex", flexDirection: "column" }}
      className="pr-8"
    >
      <PatientHistory patient={patient} />
      <DiagnosticList diagnosticList={patient?.diagnostic_list ?? []} />
    </div>
  );
}
