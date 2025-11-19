import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaCalendarAlt, FaLongArrowAltRight, FaUsers } from "react-icons/fa";
import { TiPlus, TiMinus } from "react-icons/ti";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import { AlertTriangle, Search } from "lucide-react";

function FindRooms() {
  const [propertyData, setPropertyData] = useState([]);
  const [checkindate, setCheckInDate] = useState("");
  const [checkoutdate, setCheckOutDate] = useState("");
  const [maxGuest, setMaxGuest] = useState(1);

  const handleMove = (id) => {
    router.push(`/tanant_booking/${id}`);
  };

  return (
    <div className="md:max-w-7xl w-full mx-auto px-4 py-16 min-h-screen">

      {/* 🔍 Search Box */}
      <div className="border-[2px] border-orange-500 mt-8 rounded-3xl px-4 py-4 bg-white shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">

          {/* Location */}
          <div className="flex items-center gap-2 w-full md:w-[200px]">
            <CiSearch className="text-black text-lg" />
            <input
              type="text"
              placeholder="Search Indore PG, Hostel..."
              className="w-full outline-none text-black text-sm"
            />
          </div>

          <div className="hidden md:block border-l-2 h-8 border-gray-300" />

          {/* Dates */}
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-black" />

            <DatePicker
              selected={checkindate}
              onChange={(date) => setCheckInDate(date)}
              minDate={new Date()}
              placeholderText="Move In"
              className="w-24 h-10 border rounded-lg text-black text-center"
            />

            <FaLongArrowAltRight className="text-black hidden md:block" />

            <DatePicker
              selected={checkoutdate}
              onChange={(date) => setCheckOutDate(date)}
              minDate={new Date()}
              placeholderText="Move Out"
              className="w-28 h-10 border rounded-lg text-black text-center"
            />
          </div>

          <div className="hidden md:block border-l-2 h-8 border-gray-300" />

          {/* Guests */}
          <div className="flex items-center gap-3">
            <FaUsers className="text-black" />
            <p className="text-black font-medium">Guests</p>

            <div className="flex items-center gap-2">
              <TiMinus
                onClick={() => setMaxGuest((p) => (p > 1 ? p - 1 : 1))}
                className="cursor-pointer border text-lg text-white rounded-full bg-orange-500"
              />
              <p className="font-semibold text-black">{maxGuest}</p>
              <TiPlus
                onClick={() => setMaxGuest((p) => p + 1)}
                className="cursor-pointer border text-lg text-white rounded-full bg-orange-500"
              />
            </div>
          </div>

          {/* Search Button */}
          <button className="bg-orange-500 text-white py-2 px-6 rounded-full shadow-md active:scale-95">
            Search
          </button>
        </div>
      </div>

      {/* 📌 Property Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {propertyData.map((item) => (
          <div
            key={item._id}
            className="bg-gray-100 rounded-3xl shadow-md overflow-hidden cursor-pointer"
            onClick={() => handleMove(item.slug)}
          >
            <div className="relative h-48">
              <Image
                src={item.image[0]}
                width={500}
                height={500}
                className="w-full h-full object-cover"
                alt="PG Rooms"
              />
            </div>

            <div className="bg-orange-500 text-white px-4 py-2 text-center">
              <span className="text-sm font-medium">{item.ownername}</span>
            </div>

            <div className="px-4 py-3 text-black text-sm">
              <p className="font-semibold">{item.title}</p>
              <p className="text-gray-600 mt-1">{item.location}</p>
              <p className="text-orange-500 font-bold mt-2">
                ₹ {item.price} / month
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Empty States */}
      {propertyData.length === 0 && (
        <EmptyState
          icon={<Search className="w-10 h-10" />}
          title="Search PG Rooms in Indore"
          desc="Enter details to find rooms"
          color="orange"
        />
      )}
    </div>
  );
}

export default FindRooms;

const EmptyState = ({ icon, title, desc, color }) => (
  <div className="flex flex-col justify-center items-center text-center h-[500px] mb-20">
    <div className={`p-6 rounded-full mb-3 bg-${color}-100 text-${color}-600`}>
      {icon}
    </div>
    <p className="text-2xl font-semibold text-gray-800">{title}</p>
    <p className="text-gray-500 text-sm mt-2">{desc}</p>
  </div>
);
