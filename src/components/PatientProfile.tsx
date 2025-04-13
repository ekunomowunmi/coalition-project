import useScreenWidth from "@/app/hooks/useWidth.hook";
import { Patient } from "@/app/types";
import { FaPhoneAlt } from "react-icons/fa";
import {
  FaPhone,
  FaCalendar,
  FaVenus,
  FaShield,
  FaFileShield,
} from "react-icons/fa6";

type PatientP = {
  patient?: Patient;
};

export default function PatientProfile({ patient }: PatientP) {
  if (!patient) {
    return <div className="patient-profile">No patient selected</div>;
  }
  const profileWidth = (useScreenWidth() || 1600) * 0.229375;
  return (
    <div className="patient-profile" style={{ width: `${profileWidth}px` }}>
      <div className="profile-image">
        <img src={patient.profile_picture} alt={patient.name} />
      </div>
      <p className="name">{patient.name} </p>

      <div className="profile-cards">
        <div className="profile-card">
          <div className="profile-card-row ">
            <span className="card-label-icon">
              <FaCalendar />
            </span>
            <div>
              <span className="card-label">Date Of Birth</span>
              <div className="card-value">{patient.date_of_birth}</div>
            </div>
          </div>
        </div>

        <div className="profile-card">
          <div className="profile-card-row">
            <span className="card-label-icon">
              <FaVenus />
            </span>
            <div>
              <span className="card-label">Gender</span>
              <div className="card-value">{patient.gender}</div>
            </div>
          </div>
        </div>

        <div className="profile-card">
          <div className="profile-card-row ">
            <span className="card-label-icon">
              <FaPhone />
            </span>
            <div>
              <span className="card-label">Contact Info</span>
              <div className="card-value">{patient.phone_number}</div>
            </div>
          </div>
        </div>

        <div className="profile-card">
          <div className="profile-card-row ">
            <span className="card-label-icon">
              <FaPhoneAlt />
            </span>
            <div>
              <span className="card-label">Emergency Contacts</span>
              <div className="card-value">{patient.emergency_contact}</div>
            </div>
          </div>
        </div>

        <div className="profile-card">
          <div className="profile-card-row">
            <span className="card-label-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="42"
                height="42"
                viewBox="0 0 42 42"
              >
                <g id="InsuranceIcon" transform="translate(-1235 -471)">
                  <circle
                    id="Ellipse_9"
                    data-name="Ellipse 9"
                    cx="21"
                    cy="21"
                    r="21"
                    transform="translate(1235 471)"
                    fill="#f6f7f8"
                  />
                  <path
                    id="verified_user_FILL0_wght300_GRAD0_opsz24"
                    d="M186.9-842.111l-1.7-1.7a.784.784,0,0,0-.558-.244.764.764,0,0,0-.569.244.786.786,0,0,0-.249.572.786.786,0,0,0,.249.572l2.153,2.17a.927.927,0,0,0,.677.29.927.927,0,0,0,.677-.29l4.432-4.432a.793.793,0,0,0,.244-.567.774.774,0,0,0-.244-.577.786.786,0,0,0-.572-.249.786.786,0,0,0-.572.249Zm1.123,8.882a1.986,1.986,0,0,1-.327-.027,1.811,1.811,0,0,1-.311-.08A10.471,10.471,0,0,1,182-837.6a11.865,11.865,0,0,1-2-6.611v-4.816a1.829,1.829,0,0,1,.352-1.1,2.01,2.01,0,0,1,.9-.708l6.087-2.273a1.993,1.993,0,0,1,.677-.123,1.993,1.993,0,0,1,.677.123l6.087,2.273a2.01,2.01,0,0,1,.9.708,1.829,1.829,0,0,1,.352,1.1v4.816a11.865,11.865,0,0,1-2,6.611,10.471,10.471,0,0,1-5.383,4.266,1.811,1.811,0,0,1-.311.08A1.986,1.986,0,0,1,188.022-833.229Zm0-1.573a8.7,8.7,0,0,0,4.6-3.529,10.157,10.157,0,0,0,1.818-5.882v-4.827a.319.319,0,0,0-.057-.185.341.341,0,0,0-.159-.123l-6.087-2.273a.3.3,0,0,0-.113-.021.3.3,0,0,0-.113.021l-6.087,2.273a.341.341,0,0,0-.159.123.319.319,0,0,0-.057.185v4.827a10.157,10.157,0,0,0,1.818,5.882A8.7,8.7,0,0,0,188.022-834.8ZM188.022-843.23Z"
                    transform="translate(1067.999 1335.229)"
                    fill="#072635"
                  />
                </g>
              </svg>
            </span>
            <div>
              <span className="card-label">Insurance Provider</span>
              <div className="card-value">{patient.insurance_type}</div>
            </div>
          </div>
        </div>
      </div>

      <button className="show-all-btn">Show All Information</button>
    </div>
  );
}
