import React, { useState } from "react";
import {
  Home,
  ArrowRight,
  Bed,
  Users,
  MapPin,
  IndianRupee,
  Calendar,
  Upload,
  X,
  CheckCircle,
} from "lucide-react";

function PropertyDetails() {
  // Sample property data based on your schema
  const [propertyData] = useState({
    _id: "prop123",
    propertyName: "Sunrise PG",
    roomType: "Double",
    pricePerMonth: 8500,
    beds: {
      total: 10,
      available: 3,
    },
    genderAllowed: "Boys",
    address: {
      city: "Fatehpur",
      state: "Uttar Pradesh",
      pincode: "212601",
    },
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800",
    ],
    description:
      "Spacious and comfortable accommodation perfect for students and working professionals. Located in a prime area with easy access to public transport, markets, and educational institutions. The property features modern amenities, 24/7 security, and a friendly environment.",
    owner: {
      _id: "owner123",
      name: "Rajesh Kumar",
      phone: "+91 98765 43210",
    },
    createdAt: "2025-01-15",
  });

  const [selectedImage, setSelectedImage] = useState(propertyData.images[0]);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Booking form state
  const [bookingData, setBookingData] = useState({
    visitDate: "",
    bedCountBooked: 1,
    documents: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle file upload
  const handleFileUpload = (e, docType) => {
    const file = e.target.files[0];
    if (file) {
      // In real implementation, upload to server and get URL
      const fileURL = URL.createObjectURL(file);
      setBookingData((prev) => ({
        ...prev,
        documents: [...prev.documents, { type: docType, url: fileURL, file }],
      }));
    }
  };

  // Remove document
  const removeDocument = (index) => {
    setBookingData((prev) => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index),
    }));
  };

  // Handle booking submission
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    try {
      const bookingPayload = {
        room: propertyData._id,
        owner: propertyData.owner._id,
        status: "requested",
        totalAmount: propertyData.pricePerMonth,
        visitDate: bookingData.visitDate,
        bedCountBooked: bookingData.bedCountBooked,
        documents: bookingData.documents,
      };

      console.log("Booking Payload:", bookingPayload);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsSubmitting(false);
      setShowBookingModal(false);
      setShowSuccessModal(true);

      // Reset form
      setBookingData({
        visitDate: "",
        bedCountBooked: 1,
        documents: [],
      });
    } catch (error) {
      setIsSubmitting(false);
      alert("Booking failed. Please try again.");
    }
  };

  // Navigate to My Bookings
  const goToMyBookings = () => {
    setShowSuccessModal(false);
    // In real app: router.push('/my-bookings')
    alert("Redirecting to My Bookings page...");
  };

  // Get minimum date (today)
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
          <span className="font-medium">{propertyData.address.city}</span>
          <ArrowRight className="w-4 h-4 text-gray-400" />
          <span className="font-semibold text-orange-600 truncate max-w-xs">
            {propertyData.propertyName}
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
                    {propertyData.address.city}, {propertyData.address.state} -{" "}
                    {propertyData.address.pincode}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-start md:items-end">
                <div className="flex items-center gap-2 text-orange-600 font-bold text-2xl md:text-3xl">
                  <IndianRupee className="w-6 h-6 md:w-8 md:h-8" />
                  <span>
                    {propertyData.pricePerMonth.toLocaleString("en-IN")}
                  </span>
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
                {propertyData.images.map((img, index) => (
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
                      {propertyData.roomType}
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
                      {propertyData.genderAllowed}
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
                      {propertyData.beds.total}
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
                      {propertyData.beds.available}
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
                      {propertyData.address.city}, {propertyData.address.state}
                    </p>
                    <p className="text-gray-600 text-sm">
                      PIN: {propertyData.address.pincode}
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
              <button
                onClick={() => setShowBookingModal(true)}
                disabled={propertyData.beds.available === 0}
                className="bg-white text-orange-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {propertyData.beds.available === 0
                  ? "No Beds Available"
                  : "Schedule Visit"}
              </button>
              <p className="text-sm mt-2 opacity-75">
                Contact: {propertyData.owner.phone}
              </p>
            </div>
          </div>
        </div>
      </div>

      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-0 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                Schedule Property Visit
              </h2>
              <button
                onClick={() => setShowBookingModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form
              onSubmit={handleBookingSubmit}
              className="p-4 md:p-6 space-y-6"
            >
              {/* Property Info */}
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {propertyData.propertyName}
                </h3>
                <p className="text-sm text-gray-600">
                  {propertyData.roomType} Room
                </p>
                <p className="text-orange-600 font-bold mt-2">
                  ₹{propertyData.pricePerMonth.toLocaleString("en-IN")}/month
                </p>
              </div>

              {/* Visit Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Select Visit Date <span className="text-red-500">*</span>
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              {/* Bed Count */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Number of Beds <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={bookingData.bedCountBooked}
                  onChange={(e) =>
                    setBookingData((prev) => ({
                      ...prev,
                      bedCountBooked: parseInt(e.target.value),
                    }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  {[...Array(Math.min(propertyData.beds.available, 5))].map(
                    (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} Bed{i > 0 ? "s" : ""}
                      </option>
                    )
                  )}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  {propertyData.beds.available} beds available
                </p>
              </div>

              {/* Documents Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Upload Documents (Optional)
                </label>
                <div className="space-y-3">
                  {/* Aadhar Card */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-orange-500 transition-colors">
                    <label className="cursor-pointer flex items-center gap-2">
                      <Upload className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        Upload Aadhar Card
                      </span>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileUpload(e, "Aadhar")}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* College ID */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-orange-500 transition-colors">
                    <label className="cursor-pointer flex items-center gap-2">
                      <Upload className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        Upload College ID
                      </span>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileUpload(e, "College-ID")}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Other */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-orange-500 transition-colors">
                    <label className="cursor-pointer flex items-center gap-2">
                      <Upload className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        Upload Other Document
                      </span>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileUpload(e, "Other")}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Uploaded Documents */}
                {bookingData.documents.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-semibold text-gray-900">
                      Uploaded Documents:
                    </p>
                    {bookingData.documents.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-green-50 p-3 rounded-lg"
                      >
                        <span className="text-sm text-gray-700">
                          {doc.type}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeDocument(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Important Note */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> This is a visit request only. Payment
                  will be required after your visit and approval from the owner.
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Scheduling..." : "Schedule Visit"}
                </button>
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
