import { Api } from "../../services/service";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { IoIosArrowDown, IoIosArrowUp, IoIosClose } from "react-icons/io";
import {
  MdAssignment,
  MdDateRange,
  MdLocalShipping,
  MdReceipt,
} from "react-icons/md";
import { FaHashtag, FaBoxOpen } from "react-icons/fa";
import Image from "next/image";

function Mybooking(props) {
  const router = useRouter();
  const [bookingsData, setBookingsData] = useState([]);
  const [expandedBookingId, setExpandedBookingId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) getBookingsByUser();
    else router.push("/signIn");
  }, []);

  const getBookingsByUser = async () => {
    props.loader(true);
    Api("get", "getProductRequestbyUser ", "", router).then(
      (res) => {
        props.loader(false);
        setBookingsData(res.data);
      },
      (err) => {
        props.loader(false);
        // props.toaster({ type: "error", message: err?.message });
      }
    );
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
      Completed: "bg-green-100 text-green-700",
      Pending: "bg-orange-100 text-orange-600",
      Cancel: "bg-red-100 text-red-700",
      Shipped: "bg-blue-100 text-blue-700",
      Preparing: "bg-yellow-100 text-yellow-700",
      Return: "bg-purple-100 text-purple-700",
      "Return Requested": "bg-purple-100 text-purple-700",
      Driverassigned: "bg-green-100 text-green-600",
    };
    return map[status] || "bg-gray-100 text-gray-600";
  };

  return (
    <div className="mx-auto max-w-7xl md:py-5 py-12 min-h-screen md:mt-14 mt-10">
      {/* Page Heading */}
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-center text-[40px] font-bold text-gray-900">
          My <span className="text-orange-500">Orders</span>
        </h1>
        <p className="text-gray-600 text-center mt-1 text-[16px]">
          View and manage all your orders in one place.
        </p>
      </div>

      {/* Order Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8 mx-4 md:mx-0">
        {bookingsData.length > 0 ? (
          bookingsData.map((booking, i) => (
            <div
              key={i}
              className="bg-white shadow-md rounded-xl border border-gray-200 hover:shadow-lg transition-all"
            >
              {/* Top Section */}
              <div className="p-4 bg-gray-50 rounded-t-xl border-b flex justify-between items-start">
                <div className="flex gap-3 items-start">
                  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-orange-500 text-white font-semibold shadow">
                    {i + 1}
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <MdAssignment className="text-orange-500 text-xl" />
                      Order Summary
                    </h3>

                    <p className="flex items-center gap-2 text-gray-700 text-sm mt-1">
                      <MdDateRange className="text-orange-500" />
                      {formatDate(booking.createdAt)}
                    </p>

                    <p className="flex items-center gap-2 text-gray-700 text-sm mt-1">
                      <FaHashtag className="text-orange-500" /> Order ID:{" "}
                      <span className="font-medium">{booking.orderId}</span>
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => toggleBooking(booking._id)}
                  className="p-2 hover:bg-gray-200 rounded-full"
                >
                  {expandedBookingId === booking._id ? (
                    <IoIosArrowUp className="text-xl text-gray-700" />
                  ) : (
                    <IoIosArrowDown className="text-xl text-gray-700" />
                  )}
                </button>
              </div>

              {/* Order Status */}
              <div className="px-4 py-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadge(
                    booking.status
                  )}`}
                >
                  {booking.status}
                </span>
              </div>

              {/* Product List */}
              {expandedBookingId !== booking._id && (
                <div className="p-4">
                  <div className="border rounded-lg overflow-hidden">
                    {booking.productDetail.map((product, idx) => (
                      <div
                        key={idx}
                        className="flex p-3 hover:bg-gray-50 border-b last:border-b-0 cursor-pointer"
                        onClick={() =>
                          router.push(
                            `/myorder/${booking._id}?product_id=${product._id}`
                          )
                        }
                      >
                        <Image
                          width={80}
                          height={80}
                          src={product.image[0] || "/placeholder.png"}
                          className="rounded-lg border bg-white object-contain h-20 w-20"
                          alt="Product"
                        />

                        <div className="ml-4 flex flex-col justify-center">
                          <p className="font-semibold text-gray-900">
                            {product.product?.name}
                          </p>
                          <p className="text-gray-600 text-sm mt-1 flex items-center gap-2">
                            <FaBoxOpen className="text-orange-500" />
                            Quantity: {product.qty}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="mt-4 flex justify-between items-center">
                    <div>
                      <MdReceipt className="text-4xl text-orange-500" />
                    </div>
                    <div className="bg-orange-50 border border-orange-200 px-6 py-3 rounded-lg text-right shadow-sm">
                      <p className="text-sm text-gray-600">Total Amount</p>
                      <p className="text-2xl font-bold text-gray-900">
                        ₹ {booking.total}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center col-span-2 py-10 min-h-[250px] mx-auto">
            <IoIosClose className="text-gray-400 text-6xl mb-3" />

            <p className="text-center text-gray-600 text-lg md:text-xl">
              No bookings available.
            </p>

            <p className="text-center text-gray-500 text-sm mt-1">
              Please check back later
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Mybooking;
