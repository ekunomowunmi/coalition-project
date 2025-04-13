"use client";

import { useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { BloodStolic, Patient } from "@/app/types";
import {
  FaArrowDown,
  FaArrowUp,
  FaCaretDown,
  FaCaretUp,
  FaChevronDown,
  FaLungs,
} from "react-icons/fa6";
import useScreenWidth from "@/app/hooks/useWidth.hook";
import { FaHeartbeat, FaThermometerHalf } from "react-icons/fa";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function PatientHistory({ patient }: { patient?: Patient }) {
  const [systolicData, setSystolicData] = useState<number[]>([]);
  const [diastolicData, setDiastolicData] = useState<number[]>([]);
  const [monthCount, setMounthCount] = useState(6);
  const [historyMonthData, setHistoryMonthData] = useState<string[]>([]);
  const [showMonthOptions, setShowMonthOptions] = useState(false);
  const dianosticHistoryWidth = (useScreenWidth() || 1600) * 0.45375;
  const chartRef = useRef<any>(null);

  const monthList = [6, 9, 12, 24, 36];

  const toggleShowMonthOptions = () => {
    setShowMonthOptions(!showMonthOptions);
  };
  useEffect(() => {
    if (patient === undefined) return;
    const systolic = patient.diagnosis_history
      .slice(0, monthCount)
      .map((item) => item.blood_pressure.systolic.value);
    setSystolicData(systolic);
    const diastolic = patient.diagnosis_history
      .slice(0, monthCount)
      .map((item) => item.blood_pressure.diastolic.value);
    setDiastolicData(diastolic);
    const labels = patient.diagnosis_history
      .slice(0, monthCount)
      .map((item) => `${item.month}, ${item.year}`);
    setHistoryMonthData(labels);
  }, [patient, monthCount]);

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        min: 60,
        max: 180,
        ticks: {
          stepSize: 20,
          color: "#666",
          callback: function (value: any) {
            return `${value}`;
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      point: {
        radius: 5,
      },
      line: {
        tension: 0.4,
      },
    },
  };

  const chartData = {
    labels: historyMonthData,
    datasets: [
      {
        label: "Systolic",
        data: systolicData,
        borderColor: "#FF77E5",
        backgroundColor: "#FF77E5",
      },
      {
        label: "Diastolic",
        data: diastolicData,
        borderColor: "#7B61FF",
        backgroundColor: "#7B61FF",
      },
    ],
  };

  if (patient === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="health-data bg-white rounded-xl p-8 shadow-sm"
      style={{ width: `${dianosticHistoryWidth}px` }}
    >
      <p className="diagnosis-header">Diagnosis History</p>

      <div className="blood-pressure-chart">
        <div className="chart-container-row">
          <div>
            <div className="chart-header">
              <h3>Blood Pressure</h3>
              <div
                className="timeframe-selector"
                style={{ gap: "5px" }}
                onClick={toggleShowMonthOptions}
              >
                <span>Last {monthCount} months</span>
                <FaChevronDown />
              </div>
              {showMonthOptions && (
                <div className="timeFrame-div">
                  {monthList.map((month) => (
                    <div
                      key={month}
                      className={`timeframe-option ${
                        monthCount === month ? "active" : ""
                      }`}
                      onClick={() => {
                        setMounthCount(month);
                        toggleShowMonthOptions();
                      }}
                    >
                      {month} months
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="chart-container">
              <Line
                height={225}
                width={400}
                ref={chartRef}
                options={chartOptions}
                data={chartData}
              />
            </div>
          </div>

          <div>
            <div className="reading">
              <div className="indicator-container">
                <div className="indicator systolic"></div>
                <div className="bp-label">Systolic</div>
              </div>

              <div className="bp-value">
                {patient.diagnosis_history[0].blood_pressure.systolic.value}
              </div>
              <div className="status higher">
                <FaCaretUp />
                {patient.diagnosis_history[0].blood_pressure.systolic.levels}
              </div>
            </div>
            <div className="divider"></div>
            <div className="reading">
              <div className="indicator-container">
                <div className="indicator diastolic"></div>
                <div className="bp-label">Diastolic</div>
              </div>
              <div className="bp-value">
                {patient.diagnosis_history[0].blood_pressure.diastolic.value}
              </div>
              <div className="status lower">
                <FaCaretDown />
                {patient.diagnosis_history[0].blood_pressure.systolic.levels}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="vitals-grid">
        <div className="vital-card respiratory">
          <div className="vital-icon">
            <i className="fas fa-lungs"></i>
            <FaLungs />
          </div>
          <h3>Respiratory Rate</h3>
          <div className="vital-value">
            {patient.diagnosis_history[0].respiratory_rate.value} bpm
          </div>
          <div className="vital-status normal">
            {patient.diagnosis_history[0].respiratory_rate.levels}
          </div>
        </div>

        <div className="vital-card temperature">
          <div className="vital-icon">
            <FaThermometerHalf />
          </div>
          <h3>Temperature</h3>
          <div className="vital-value">
            {patient.diagnosis_history[0].temperature.value}°F
          </div>
          <div className="vital-status normal">
            {patient.diagnosis_history[0].temperature.levels}
          </div>
        </div>

        <div className="vital-card heart-rate">
          <div className="vital-icon">
            <FaHeartbeat />
          </div>
          <h3>Heart Rate</h3>
          <div className="vital-value">
            {patient.diagnosis_history[0].heart_rate.value} bpm
          </div>
          <div className="vital-status lower">
            {patient.diagnosis_history[0].heart_rate.levels}
          </div>
        </div>
      </div>
    </div>
  );
}
