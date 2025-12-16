import React, { useState, useEffect } from "react";
import { CountryDropdown } from "react-country-region-selector";
import { Api } from "../../services/service";
import { FaUserAlt } from "react-icons/fa";

const EditProfile = ({ loader, toaster }) => {
  const [profileData, setProfileData] = useState({
    username: "",
    lastname: "",
    email: "",
    country: "",
    number: "",
    address: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    country: "",
    number: "",
  });

  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const userDetails = localStorage.getItem("userDetail");
    const token = localStorage.getItem("token");

    if (userDetails && token) {
      setUser(JSON.parse(userDetails));
      getProfileData();
    }
  }, []);

  const validateField = (name, value) => {
    switch (name) {
      case "username":
        if (!value.trim()) return t("First name is required");
        if (!/^[A-Za-z\s]+$/.test(value)) return t("Only letters allowed");
        if (value.length < 2) return t("Minimum 2 characters required");
        return "";
      case "email":
        if (!value.trim()) return t("Email is required");
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return t("Invalid email format");
        return "";
      case "number":
        if (!value) return t("Phone number is required");
        if (!/^\d{10}$/.test(value)) return t("Must be 10 digits");
        return "";
      default:
        return "";
    }
  };

  const handleInputChange = (name, value) => {
    // Prevent numbers in name fields
    if (name === "username" && /[0-9]/.test(value)) {
      return;
    }
    if (name === "number" && value && !/^\d*$/.test(value)) {
      return;
    }

    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleBlur = (name, value) => {
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const getProfileData = () => {
    loader(true);

    Api("get", "auth/profile", null)
      .then((res) => {
        loader(false);
        if (res?.status) {
          setProfileData((prev) => ({
            ...prev,
            username: res.data.name || "",
            email: res.data.email || "",
            number: res.data.phone || "",
          }));
        }
      })
      .catch((err) => {
        loader(false);
        props.toaster({ type: "error", message: err?.data?.message });
      });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    Object.keys(profileData).forEach((key) => {
      const error = validateField(key, profileData[key]);
      if (error) {
        isValid = false;
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const toggleEditMode = () => {
    if (isEditing) {
      if (!validateForm()) {
        toaster({
          type: "error",
          message: t("Please fix the errors in the form"),
        });
        return;
      }
      updateProfile();
    } else {
      setIsEditing(true);
    }
  };

  const updateProfile = () => {
    loader(true);
    const payload = {
      ...profileData,
      name: profileData?.username,
      userId: user._id,
    };

    Api("post", "auth/updateProfile", payload)
      .then((res) => {
        loader(false);
        if (res?.status) {
          toaster({
            type: "success",
            message: ("Profile updated successfully"),
          });
          if (res.data) {
            const userDetail = JSON.parse(
              localStorage.getItem("userDetail") || "{}"
            );
            const updatedUser = { ...userDetail, ...res.data };
            localStorage.setItem("userDetail", JSON.stringify(updatedUser));
            setUser(updatedUser);
          }
          setIsEditing(false);
        } else {
          toaster({
            type: "error",
            message: res?.data?.message || ("Failed to update profile"),
          });
        }
      })
      .catch((err) => {
        loader(false);
        toaster({
          type: "error",
          message: err?.data?.message || ("Failed to update profile"),
        });
      });
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:py-12 mt-10">
      <div className="flex flex-col justify-center items-center mb-10">
        <h1 className="text-center text-3xl md:text-4xl font-bold text-gray-900">
          My <span className="text-orange-500">Profile</span>
        </h1>
        <p className="text-center text-gray-600 mt-2 max-w-lg">
          Manage your personal details and contact information in one place.
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl border shadow-md overflow-hidden">
        {/* Top Section */}
        <div className="p-5 md:p-8 flex flex-col sm:flex-row items-center sm:items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center shadow">
            <FaUserAlt className="text-gray-700" size={40} />
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-xl font-semibold text-gray-900">
              {user?.fullName || profileData.username || "User Name"}
            </h2>
            <p className="text-gray-600">
              {user?.email || profileData.email || "user@example.com"}
            </p>
          </div>

          <button
            className="px-5 py-2.5 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition w-full sm:w-auto"
            onClick={toggleEditMode}
          >
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>

        {/* Form Section */}
        <div className="p-5 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* First Name */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                First Name
              </label>
              {isEditing ? (
                <>
                  <input
                    className={`w-full p-3 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 
                    ${
                      errors.username
                        ? "border-red-500 focus:ring-red-400"
                        : "focus:ring-orange-400"
                    }
                  `}
                    value={profileData.username}
                    type="text"
                    onChange={(e) =>
                      handleInputChange("username", e.target.value)
                    }
                    onBlur={(e) => handleBlur("username", e.target.value)}
                  />
                  {errors.username && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.username}
                    </p>
                  )}
                </>
              ) : (
                <div className="text-gray-900 w-full p-3 border rounded-lg bg-gray-50">
                  {profileData.username || "Not provided"}
                </div>
              )}
            </div>


            {/* Email */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Email
              </label>
              {isEditing ? (
                <>
                  <input
                    className={`w-full p-3 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 
                    ${
                      errors.email
                        ? "border-red-500 focus:ring-red-400"
                        : "focus:ring-orange-400"
                    }
                  `}
                    value={profileData.email}
                    type="email"
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    onBlur={(e) => handleBlur("email", e.target.value)}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </>
              ) : (
                <div className="text-gray-900 w-full p-3 border rounded-lg bg-gray-50">
                  {profileData.email || "Not provided"}
                </div>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Mobile
              </label>
              {isEditing ? (
                <>
                  <input
                    className={`w-full p-3 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 
                    ${
                      errors.number
                        ? "border-red-500 focus:ring-red-400"
                        : "focus:ring-orange-400"
                    }
                  `}
                    value={profileData.number}
                    type="tel"
                    maxLength={10}
                    onChange={(e) =>
                      handleInputChange("number", e.target.value)
                    }
                    onBlur={(e) => handleBlur("number", e.target.value)}
                  />
                  {errors.number && (
                    <p className="text-red-500 text-sm mt-1">{errors.number}</p>
                  )}
                </>
              ) : (
                <div className="text-gray-900 w-full p-3 border rounded-lg bg-gray-50">
                  {profileData.number || "Not provided"}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
