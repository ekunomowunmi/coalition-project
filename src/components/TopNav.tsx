import { logo } from "@/assets/svg";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { IoEllipsisVertical, IoSettings, IoHome } from "react-icons/io5";
import {
  FaUsers,
  FaUserFriends,
  FaCalendar,
  FaComment,
  FaFileInvoiceDollar,
} from "react-icons/fa";
export default function TopNav() {
  return (
    <div className="topnav">
      <div className="logo pt-4">
        <Image src={logo} alt="Healthcare logo" />
      </div>
      <nav>
        <Link href="/" className="nav-item">
          <IoHome /> Overview
        </Link>
        <Link href="/" className="nav-item active">
          <FaUserFriends /> Patients
        </Link>
        <Link href="/" className="nav-item">
          <FaCalendar /> Schedule
        </Link>
        <Link href="/" className="nav-item">
          <FaComment /> Message
        </Link>
        <Link href="/" className="nav-item">
          <FaFileInvoiceDollar /> Transactions
        </Link>
      </nav>
      <div className="user-info">
        <div className="avatar">
          <img src="https://picsum.photos/200/300" alt="Dr. Jose Simmons" />
        </div>
        <div className="user-details">
          <p className="user-name">Dr. Jose Simmons</p>
          <p className="user-role">General Practitioner</p>
        </div>
        <button className="settings-btn">
          <IoSettings />
        </button>
        <button className="more-btn">
          <IoEllipsisVertical />
        </button>
      </div>
    </div>
  );
}
