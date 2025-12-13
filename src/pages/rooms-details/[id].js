import React, { useContext, useEffect, useState } from "react";
import {
  Home,
  ArrowRight,
  Bed,
  Users,
  MapPin,
  IndianRupee,
  X,
  CheckCircle,
} from "lucide-react";

import { useRouter } from "next/router";
import { Api } from "../../../services/service";
import { toast } from "sonner";
import { userContext } from "../_app";

function PropertyDetails() {
  const [propertyData, setPropertyData] = useState({});
  const router = useRouter();
  const [user] = useContext(userContext);
  const [selectedImage, setSelectedImage] = useState();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [bedError, setBedError] = useState("");
  const [bookingData, setBookingData] = useState({
    visitDate: "",
    bedCountBooked: 1,
    documents: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;

    const id = router.query.id;
    console.log(id);

    if (id) {
      fetchRooms(id);
      console.log(id);
    }
  }, [router.isReady, router.query.id]);

  const fetchRooms = async (roomId) => {
    try {
      console.log(roomId);
      const res = await Api("get", `rooms/getRoom/${roomId}`, "", router);

      if (res?.status) {
        setPropertyData(res?.data || []);
        setSelectedImage(res?.data?.images[0]);
      } else {
        toast.error(res?.message || "Failed to fetch rooms");
      }
    } catch (err) {
      toast.error(err?.data?.message || err?.message || "An error occurred");
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (bookingData.bedCountBooked > propertyData.availableBeds) {
      setIsSubmitting(false);
      return toast.error("Selected beds exceed availability");
    }

    try {
      const total =
        Number(bookingData.bedCountBooked) * Number(propertyData.pricePerMonth);

      const bookingPayload = {
        roomId: propertyData._id,
        roomPriceAtBooking: propertyData.pricePerMonth,
        totalAmount: total,
        visitDate: bookingData.visitDate,
        bedCountBooked: bookingData.bedCountBooked,
      };

      console.log("Booking Payload:", bookingPayload);

      const res = await Api("post", "booking/Create", bookingPayload, router);

      if (res?.status) {
        setShowBookingModal(false);
        setShowSuccessModal(true);

        setBookingData({
          visitDate: "",
          bedCountBooked: 1,
          documents: [],
        });
      } else {
        toast.error(res?.message || "Booking failed");
      }
    } catch (err) {
      toast.error(err?.data?.message || err?.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const goToMyBookings = () => {
    setShowSuccessModal(false);
    alert("Redirecting to My Bookings page...");
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Home className="w-4 h-4" />
          <span className="font-medium">Home</span>
          <ArrowRight className="w-4 h-4 text-gray-400" />
          <span className="font-medium">{propertyData?.city}</span>
          <ArrowRight className="w-4 h-4 text-gray-400" />
          <span className="font-semibold text-orange-600 truncate max-w-xs">
            {propertyData?.propertyName}
          </span>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Property Header */}
          <div className="p-4 md:p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {propertyData.propertyName}
                </h1>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-5 h-5 text-orange-600" />
                  <span className="text-sm md:text-base">
                    {propertyData?.city}, {propertyData?.state} -{" "}
                    {propertyData?.pincode}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-start md:items-end">
                <div className="flex items-center gap-2 text-orange-600 font-bold text-2xl md:text-3xl">
                  <IndianRupee className="w-6 h-6 md:w-8 md:h-8" />
                  <span>{propertyData?.pricePerMonth}</span>
                </div>
                <span className="text-sm text-gray-500 mt-1">per month</span>
              </div>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Main Image */}
              <div className="md:col-span-2">
                <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={selectedImage}
                    alt="Property"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-3 md:grid-cols-1 gap-2">
                {propertyData?.images?.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedImage(img)}
                    className={`relative aspect-video rounded-lg overflow-hidden cursor-pointer transition-all ${
                      selectedImage === img
                        ? "ring-2 ring-orange-600"
                        : "hover:opacity-80"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Property Details */}
          <div className="p-4 md:p-6 bg-gray-50">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              Property Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* Room Type */}
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Bed className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Room Type</p>
                    <p className="font-semibold text-gray-900">
                      {propertyData?.roomType}
                    </p>
                  </div>
                </div>
              </div>

              {/* Gender */}
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Users className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Gender Allowed</p>
                    <p className="font-semibold text-gray-900">
                      {propertyData?.genderAllowed}
                    </p>
                  </div>
                </div>
              </div>

              {/* Total Beds */}
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Bed className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Beds</p>
                    <p className="font-semibold text-gray-900">
                      {propertyData?.totalBeds}
                    </p>
                  </div>
                </div>
              </div>

              {/* Available Beds */}
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Bed className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Available Beds</p>
                    <p className="font-semibold text-green-600">
                      {propertyData?.availableBeds}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                About this Property
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {propertyData.description}
              </p>
            </div>

            {/* Address Details */}
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-200 mt-4">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                Location Details
              </h3>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 text-orange-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Full Address</p>
                    <p className="text-gray-900 font-medium">
                      {propertyData?.city}, {propertyData?.state}
                    </p>
                    <p className="text-gray-600 text-sm">
                      PIN: {propertyData?.pincode}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Book Visit Button */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 md:p-6 rounded-lg shadow-lg mt-6 text-white">
              <h3 className="text-lg md:text-xl font-bold mb-2">
                Interested in this property?
              </h3>
              <p className="mb-4 opacity-90">
                Schedule a visit to see the property before booking
              </p>
              <div className="flex flex-col md:flex-row items-center justify-start gap-4">
                <button
                  onClick={() => setShowBookingModal(true)}
                  disabled={propertyData?.availableBeds === 0}
                  className="bg-white text-orange-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {propertyData.availableBeds === 0
                    ? "No Beds Available"
                    : "Schedule Visit"}
                </button>
                <button
                  onClick={() => router.push("/ContactUs")}
                  className="bg-white text-orange-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showBookingModal && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white border-b px-5 py-4 flex items-center justify-between">
              <h2 className="text-lg md:text-2xl font-bold text-gray-900">
                Schedule Property Visit
              </h2>
              <button
                onClick={() => setShowBookingModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <form
              onSubmit={handleBookingSubmit}
              className="p-5 md:p-6 space-y-6 overflow-y-auto max-h-[80vh]"
            >
              {/* Property Info */}
              <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl">
                <h3 className="font-semibold text-gray-900">
                  {propertyData.propertyName}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {propertyData.roomType} Room
                </p>
                <p className="text-orange-600 font-bold text-lg mt-2">
                  ₹{propertyData.pricePerMonth}/month
                </p>
              </div>

              {/* Visit Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Visit Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  min={getMinDate()}
                  value={bookingData.visitDate}
                  onChange={(e) =>
                    setBookingData((prev) => ({
                      ...prev,
                      visitDate: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 border text-black rounded-lg focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* Bed Count */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Number of Beds <span className="text-red-500">*</span>
                </label>

                <input
                  type="number"
                  required
                  min={1}
                  max={propertyData.availableBeds}
                  value={bookingData.bedCountBooked}
                  onChange={(e) => {
                    const value = Number(e.target.value);

                    if (value > propertyData.availableBeds) {
                      setBedError(
                        `Only ${propertyData.availableBeds} bed${
                          propertyData.availableBeds > 1 ? "s" : ""
                        } available`
                      );
                      return;
                    }

                    setBedError("");
                    setBookingData((prev) => ({
                      ...prev,
                      bedCountBooked: value,
                    }));
                  }}
                  className={`w-full px-4 py-3 text-black border rounded-lg focus:ring-2 focus:ring-orange-500
    ${bedError ? "border-red-500" : "border-gray-300"}
  `}
                  placeholder="Enter number of beds"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Available Beds:{" "}
                  <span className="font-semibold text-gray-800">
                    {propertyData.availableBeds}
                  </span>
                </p>
                {bedError && (
                  <p className="text-xs text-red-500 mt-1">{bedError}</p>
                )}
              </div>

              {/* Note */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> This is only a visit request. Payment
                  will be required after the visit and owner approval.
                </p>
              </div>

              {/* Actions */}
              <div className="flex md:flex-row flex-col  gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 py-3 border rounded-lg font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                {user?._id ? (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? "Scheduling..." : "Schedule Visit"}
                  </button>
                ) : (
                  <div
                    onClick={()=> router.push("/login")}
                    className="flex-1 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 disabled:opacity-50 cursor-pointer text-center"
                  >
                    Login to Schedule Visit
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Visit Scheduled Successfully!
            </h3>
            <p className="text-gray-600 mb-6">
              Your visit request has been sent to the property owner. You will
              be notified once it's approved.
            </p>
            <div className="space-y-3">
              <button
                onClick={goToMyBookings}
                className="w-full px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors"
              >
                View My Bookings
              </button>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PropertyDetails;
