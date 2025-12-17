import { useState, useContext } from "react";
import { Mail, Lock, User, Phone } from "lucide-react";
import { useRouter } from "next/router";
import Image from "next/image";
import { userContext } from "@/pages/_app";
import { Api } from "../../services/service";
import { toast } from "react-toastify";

function Signup(props) {
  const router = useRouter();
  const [user, setUser] = useContext(userContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [focusedField, setFocusedField] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (!formData.email || !formData.password || !formData.name) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      props?.loader?.(true);

      const res = await Api("post", "auth/register", formData, router);
      router.push("/login");
      props.toaster({ type: "sucess", message: res?.message || "Ragister Successful" });
    } catch (error) {
      props.toaster({ type: "sucess", message: error?.message || "Ragister Successful" });
    } finally {
      setLoading(false);
      props?.loader?.(false);

    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col md:flex-row mt-14">
      <div className="hidden md:flex md:flex-1 bg-neutral-900 items-center justify-center p-6">
        <div className="relative w-full h-full max-h-[700px] bg-neutral-800 border border-neutral-700 rounded-2xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1740101957423-d8e97afb661b?auto=format&fit=crop&q=80&w=687"
            fill
            alt="Signup cover"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* ========== RIGHT FORM SECTION ========== */}
      <div className="flex-1 bg-black flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-lg bg-neutral-900 border border-neutral-700 rounded-2xl p-4 md:p-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white">Create Account</h1>
            <p className="text-neutral-400 mt-1">
              Join us today and get started
            </p>
          </div>

          {/* ========= FORM ========= */}
          <form className="space-y-4" onSubmit={submit}>
            {/* Name */}
            <div>
              <label className="text-sm text-white">Full Name</label>
              <div className="relative mt-1">
                <User
                  className={`absolute left-3 top-3 w-5 ${
                    focusedField === "name"
                      ? "text-orange-500"
                      : "text-neutral-500"
                  }`}
                />
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full pl-11 pr-4 py-3.5 bg-neutral-800 text-white rounded-xl border-2 outline-none 
                      ${
                        focusedField === "name"
                          ? "border-orange-500"
                          : "border-neutral-600 hover:border-neutral-500"
                      }`}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-white">Email Address</label>
              <div className="relative mt-1">
                <Mail
                  className={`absolute left-3 top-3 w-5 ${
                    focusedField === "email"
                      ? "text-orange-500"
                      : "text-neutral-500"
                  }`}
                />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full pl-11 pr-4 py-3.5 bg-neutral-800 text-white rounded-xl border-2 outline-none 
                      ${
                        focusedField === "email"
                          ? "border-orange-500"
                          : "border-neutral-600 hover:border-neutral-500"
                      }`}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-white">Password</label>
              <div className="relative mt-1">
                <Lock
                  className={`absolute left-3 top-3 w-5 ${
                    focusedField === "password"
                      ? "text-orange-500"
                      : "text-neutral-500"
                  }`}
                />
                <input
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full pl-11 pr-4 py-3.5 bg-neutral-800 text-white rounded-xl border-2 outline-none 
                      ${
                        focusedField === "password"
                          ? "border-orange-500"
                          : "border-neutral-600 hover:border-neutral-500"
                      }`}
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm text-white">Phone Number</label>
              <div className="relative mt-1">
                <Phone
                  className={`absolute left-3 top-3 w-5 ${
                    focusedField === "phone"
                      ? "text-orange-500"
                      : "text-neutral-500"
                  }`}
                />
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  onFocus={() => setFocusedField("phone")}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full pl-11 pr-4 py-3.5 bg-neutral-800 text-white rounded-xl border-2 outline-none 
                      ${
                        focusedField === "phone"
                          ? "border-orange-500"
                          : "border-neutral-600 hover:border-neutral-500"
                      }`}
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3.5 rounded-xl mt-6"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-neutral-400 mt-6">
            Already have an account?{" "}
            <button
              onClick={() => router.push("/login")}
              className="text-orange-500 hover:text-orange-400"
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
