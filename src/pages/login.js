import { useContext, useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Api } from "../../services/service"; // <-- Apne API file ka sahi path lagao
import { toast } from "react-toastify";
import { userContext } from "./_app";

function SignIn(props) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [user, setUser] = useContext(userContext);
  const [focusedField, setFocusedField] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      props?.loader?.(true);

      const res = await Api("post", "auth/login", formData, router);
      const user = res.data.user;
      localStorage.setItem("userDetail", JSON.stringify(user));
      localStorage.setItem("token", res.data.token);
      setUser(user);
      toast.success(res.data?.message || "Login Successful");
      router.push("/");
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
      props?.loader?.(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col md:flex-row mt-10">
      {/* Image Section */}
      <div className="hidden md:flex md:flex-1 bg-neutral-900 items-center justify-center p-8">
        <div className="relative w-full h-full max-h-[600px] bg-neutral-800 border border-neutral-700 rounded-2xl overflow-hidden">
          <Image
            fill
            src="https://images.pexels.com/photos/31817684/pexels-photo-31817684.jpeg"
            alt="WiFi password sign"
            className="object-cover"
          />
        </div>
      </div>

      {/* Form Section */}
      <div className="flex-1 bg-black flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md bg-neutral-900 border border-neutral-700 rounded-2xl p-4 md:p-10">
          <div className="text-center mb-8 mt-8">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Welcome Back
            </h1>
            <p className="text-neutral-400 text-base">
              Sign in to your account
            </p>
          </div>

          <form className="space-y-4" onSubmit={submit}>
            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-white">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                    focusedField === "email"
                      ? "text-orange-500"
                      : "text-neutral-500"
                  }`}
                />
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter your email address"
                  className={`w-full pl-11 pr-4 py-3.5 bg-neutral-800 rounded-xl text-white border-2 outline-none transition-colors ${
                    focusedField === "email"
                      ? "border-orange-500"
                      : "border-neutral-600 hover:border-neutral-500"
                  }`}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-white"
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                    focusedField === "password"
                      ? "text-orange-500"
                      : "text-neutral-500"
                  }`}
                />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter your password"
                  className={`w-full pl-11 pr-12 py-3.5 bg-neutral-800 rounded-xl text-white border-2 outline-none transition-colors ${
                    focusedField === "password"
                      ? "border-orange-500"
                      : "border-neutral-600 hover:border-neutral-500"
                  }`}
                />

                {/* Show / Hide Password */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <p
                onClick={() => router.push("/forgot-password")}
                className="text-sm text-orange-500 hover:text-orange-400 cursor-pointer"
              >
                Forgot password?
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3.5 rounded-xl transition-colors "
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="text-center mt-3 mb-6">
            <p className="text-neutral-400">
              Don't have an account?{" "}
              <button
                onClick={() => router.push("/signup")}
                className="text-orange-500 hover:text-orange-400 font-medium"
              >
                Sign up here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
