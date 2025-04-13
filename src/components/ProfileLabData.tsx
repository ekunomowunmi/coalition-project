import { Patient } from "@/app/types";
import PatientProfile from "./PatientProfile";
import LabResults from "./LabResults";

export default function ProfileLabData({ patient }: { patient?: Patient }) {
  return (
    <div style={{ gap: "16px", display: "flex", flexDirection: "column" }}>
      <PatientProfile patient={patient} />
      <LabResults labResultsList={patient?.lab_results ?? []} />
    </div>
  );
}
