import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaCalendarAlt, FaLongArrowAltRight, FaUsers } from "react-icons/fa";
import { TiPlus, TiMinus } from "react-icons/ti";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import { ArrowRight, Search } from "lucide-react";
import { useRouter } from "next/router";
import Link from "next/link";
import { toast } from "sonner";
import { Api } from "../../services/service";
import { motion } from "framer-motion";

function FindRooms() {
  const [checkindate, setCheckInDate] = useState("");
  const [checkoutdate, setCheckOutDate] = useState("");
  const [maxGuest, setMaxGuest] = useState(1);
  const [rooms, setRooms] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchrooms();
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  const fetchrooms = async () => {
    try {
      const res = await Api("get", `rooms/getAll`, "", router);
      if (res?.status) {
        const data = res?.data;
        setRooms(data?.data || []);
      } else {
        toast.error(res?.message || "");
      }
    } catch (err) {
      toast.error(err?.data?.message || err?.message || "An error occurred");
    }
  };

  return (
    <div className="md:max-w-7xl w-full mx-auto px-4 py-16 min-h-screen">
      <div className="border-[2px] border-orange-500 mt-8 rounded-3xl px-4 py-4 bg-white shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 w-full md:w-[200px]">
            <CiSearch className="text-black text-lg" />
            <input
              type="text"
              placeholder="Search Indore PG, Hostel..."
              className="w-full outline-none text-black text-sm"
            />
          </div>

          <div className="hidden md:block border-l-2 h-8 border-gray-300" />

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

          <button className="bg-orange-500 text-white py-2 px-6 rounded-full shadow-md active:scale-95">
            Search
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {rooms.map((room, i) => (
          <motion.div
            key={room._id}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-orange-500/20 hover:-translate-y-1 transition-all duration-300"
          >
            {/* Image */}
            <div className="relative">
              <Image
                src={room.images?.[0] || "/pg-placeholder.jpg"}
                alt={room.propertyName}
                width={800}
                height={400}
                className="w-full h-56 object-cover"
              />

              {/* Room Type */}
              <span className="absolute top-4 left-4 bg-orange-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                {room.roomType}
              </span>

              {/* Gender */}
              <span className="absolute top-4 right-4 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
                {room.genderAllowed}
              </span>
            </div>

            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-700 mb-1 line-clamp-1">
                {room.propertyName}
              </h3>

              <p className="text-gray-400 text-sm mb-3">
                {room.address}, {room.city}, {room.state}
              </p>

              <div className="flex justify-between text-sm text-gray-300 mb-3">
                <span>
                  Beds:{" "}
                  <span className="text-white font-medium">
                    {room.availableBeds}/{room.totalBeds}
                  </span>
                </span>
                <span
                  className={`font-medium ${
                    room.availableBeds > 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {room.availableBeds > 0 ? "Available" : "Full"}
                </span>
              </div>

              {room.description && (
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {room.description}
                </p>
              )}

              <div className="flex justify-between items-center">
                <div>
                  <span className="text-2xl font-bold text-orange-400">
                    ₹{room.pricePerMonth}
                  </span>
                  <span className="text-gray-400 text-sm"> / month</span>
                </div>

                <Link href={`/rooms-details/${room._id}`}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-orange-600 cursor-pointer hover:bg-orange-700 text-white px-5 py-2 rounded-lg text-sm flex items-center gap-2"
                  >
                    View Details
                    <ArrowRight size={14} />
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {rooms.length === 0 && (
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
