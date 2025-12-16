import React, { useState, useEffect } from "react";
import { IoIosArrowDown, IoIosArrowUp, IoIosClose } from "react-icons/io";
import {
  MdAssignment,
  MdDateRange,
  MdHome,
  MdPerson,
  MdAttachMoney,
  MdEventAvailable,
  MdHotel,
} from "react-icons/md";
import { FaBed, FaMapMarkerAlt } from "react-icons/fa";
import { Api } from "../../services/service";



function Mybooking() {
  const [bookingsData, setBookingsData] = useState([]);
  const [expandedBookingId, setExpandedBookingId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBookingsByUser();
  }, []);

  const getBookingsByUser = async () => {
    setLoading(true);
    try {
      const res = await Api("get", "booking/getCustomerbooking", "", null);
      setBookingsData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleBooking = (id) => {
    setExpandedBookingId(expandedBookingId === id ? null : id);
  };

  const formatDate = (date) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const statusBadge = (status) => {
    const map = {
      requested: "bg-blue-100 text-blue-700",
      approved: "bg-green-100 text-green-700",
      visited: "bg-purple-100 text-purple-700",
      pending_payment: "bg-orange-100 text-orange-600",
      paid: "bg-emerald-100 text-emerald-700",
      cancelled: "bg-red-100 text-red-700",
    };
    return map[status] || "bg-gray-100 text-gray-600";
  };

  const statusText = (status) => {
    const map = {
      requested: "Visit Requested",
      approved: "Visit Approved",
      visited: "Visited",
      pending_payment: "Payment Pending",
      paid: "Paid",
      cancelled: "Cancelled",
    };
    return map[status] || status;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Loading your bookings...</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl md:py-5 py-12 min-h-screen md:mt-14 mt-10">
      {/* Page Heading */}
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-center text-4xl font-bold text-gray-900">
          My PG <span className="text-orange-500">Bookings</span>
        </h1>
        <p className="text-gray-600 text-center mt-2 text-base">
          Track your room visit requests and bookings in Indore
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8 mx-4 md:mx-0">
        {bookingsData.length > 0 ? (
          bookingsData.map((booking, i) => (
            <div
              key={booking._id}
              className="bg-white shadow-md rounded-xl border border-gray-200 hover:shadow-xl transition-all duration-300"
            >
              {/* Header Section */}
              <div className="p-5 bg-gradient-to-r from-orange-50 to-orange-100 rounded-t-xl border-b flex justify-between items-start">
                <div className="flex gap-4 items-start flex-1">
                  <div className="h-12 w-12 flex items-center justify-center rounded-full bg-orange-500 text-white font-bold shadow-md text-lg">
                    {i + 1}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                      <MdHome className="text-orange-500 text-xl" />
                      {booking.roomId?.name || "Room Booking"}
                    </h3>

                    <p className="flex items-center gap-2 text-gray-700 text-sm mt-2">
                      <FaMapMarkerAlt className="text-orange-500" />
                      {booking.roomId?.address || "Indore"}
                    </p>

                    <p className="flex items-center gap-2 text-gray-700 text-sm mt-1">
                      <MdDateRange className="text-orange-500" />
                      Booked: {formatDate(booking.createdAt)}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => toggleBooking(booking._id)}
                  className="p-2 hover:bg-orange-200 rounded-full transition-colors"
                  aria-label="Toggle details"
                >
                  {expandedBookingId === booking._id ? (
                    <IoIosArrowUp className="text-2xl text-gray-700" />
                  ) : (
                    <IoIosArrowDown className="text-2xl text-gray-700" />
                  )}
                </button>
              </div>

              {/* Status Badge */}
              <div className="px-5 py-3 bg-gray-50">
                <span
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold ${statusBadge(
                    booking.status
                  )}`}
                >
                  {statusText(booking.status)}
                </span>
              </div>

              {/* Room Image and Basic Info */}
              <div className="p-5">
                <div className="flex gap-4 items-start">
                  {booking.roomId?.image && (
                    <img
                      src={booking.roomId.image}
                      className="rounded-lg border-2 border-gray-200 object-cover h-24 w-24 shadow-sm"
                      alt={booking.roomId.name}
                    />
                  )}

                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 text-gray-700">
                      <MdEventAvailable className="text-orange-500 text-lg" />
                      <span className="text-sm font-medium">Visit Date:</span>
                      <span className="font-bold text-gray-900">
                        {formatDate(booking.visitDate)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-700">
                      <FaBed className="text-orange-500 text-lg" />
                      <span className="text-sm font-medium">Beds:</span>
                      <span className="font-semibold text-gray-900">
                        {booking.bedCountBooked}
                      </span>
                    </div>

                    {booking.paymentMethod && (
                      <div className="flex items-center gap-2 text-gray-700">
                        <MdAttachMoney className="text-orange-500 text-lg" />
                        <span className="text-sm font-medium">Payment:</span>
                        <span className="font-semibold text-gray-900 uppercase">
                          {booking.paymentMethod}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedBookingId === booking._id && (
                  <div className="mt-5 pt-5 border-t border-gray-200 space-y-3 animate-fadeIn">
                    <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">
                            Room Price at Booking
                          </p>
                          <p className="text-xl font-bold text-gray-900">
                            ₹ {booking.roomPriceAtBooking?.toLocaleString()}
                          </p>
                        </div>
                        <MdHotel className="text-4xl text-orange-500 opacity-50" />
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">
                            Total Amount
                          </p>
                          <p className="text-2xl font-bold text-orange-600">
                            ₹ {booking.totalAmount?.toLocaleString()}
                          </p>
                        </div>
                        <MdAssignment className="text-4xl text-orange-500 opacity-50" />
                      </div>
                    </div>

                    {booking.status === "requested" && (
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <p className="text-sm text-blue-800">
                          <strong>Note:</strong> Your visit request is pending
                          approval. You'll be notified once the owner responds.
                        </p>
                      </div>
                    )}

                    {booking.status === "approved" && (
                      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                        <p className="text-sm text-green-800">
                          <strong>Great!</strong> Your visit has been approved.
                          Please visit on {formatDate(booking.visitDate)}.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Total Amount (Collapsed View) */}
              {expandedBookingId !== booking._id && (
                <div className="px-5 pb-5">
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-4 text-white shadow-md">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium opacity-90">
                        Total Amount
                      </span>
                      <span className="text-2xl font-bold">
                        ₹ {booking.totalAmount?.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center col-span-2 py-16 min-h-[400px]">
            <div className="bg-gray-100 rounded-full p-6 mb-4">
              <IoIosClose className="text-gray-400 text-7xl" />
            </div>

            <p className="text-center text-gray-700 text-xl font-semibold">
              No Bookings Yet
            </p>

            <p className="text-center text-gray-500 text-base mt-2 max-w-md">
              You haven't made any PG room booking requests yet. Start
              exploring available PGs in Indore!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Mybooking;