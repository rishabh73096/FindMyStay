
import { useState } from "react"
import { Mail, ArrowLeft, CheckCircle } from "lucide-react"
import { Link } from "@tanstack/react-router"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [focusedField, setFocusedField] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSuccess(true)
    }, 2000)
  }

  const handleResend = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-neutral-900 border border-neutral-700 rounded-2xl p-8 md:p-10">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">Check Your Email</h1>
            <p className="text-neutral-400 text-base mb-6">
              We have sent a password reset link to <span className="text-white font-medium">{email}</span>
            </p>
            <p className="text-neutral-500 text-sm mb-8">
              Did not receive the email? Check your spam folder or try again.
            </p>

            <div className="space-y-4">
              <button
                onClick={handleResend}
                disabled={isLoading}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/50 text-white font-semibold py-3.5 px-4 rounded-xl transition-colors duration-200 text-base"
              >
                {isLoading ? "Sending..." : "Resend Email"}
              </button>

              <Link
                href="/login"
                className="block w-full text-center text-orange-500 hover:text-orange-400 font-medium transition-colors duration-200 py-2"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-700 rounded-2xl p-8 md:p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Forgot Password?</h1>
          <p className="text-neutral-400 text-base">
            Enter your email address and we will send you a link to reset your password.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Email Address
            </label>
            <div className="relative">
              <Mail
                className={
                  "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-200 " +
                  (focusedField === "email" ? "text-orange-500" : "text-neutral-500")
                }
              />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                placeholder="Enter your email address"
                required
                className={
                  "w-full pl-11 pr-4 py-3.5 bg-neutral-800 rounded-xl text-white text-base placeholder-neutral-500 outline-none transition-colors duration-200 border-2 " +
                  (focusedField === "email" ? "border-orange-500" : "border-neutral-600 hover:border-neutral-500")
                }
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !email}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/50 text-white font-semibold py-3.5 px-4 rounded-xl transition-colors duration-200 text-base mt-8 flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                Sending Reset Link...
              </>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>

        {/* Back to Login */}
        <div className="text-center mt-8">
          <Link
            href="/login"
            className="inline-flex items-center text-neutral-400 hover:text-white transition-colors duration-200 text-base"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Login
          </Link>
        </div>

        {/* Help Text */}
        <div className="mt-8 p-4 bg-neutral-800 rounded-xl border border-neutral-700">
          <p className="text-neutral-400 text-sm text-center">
            Having trouble? Contact our support team for assistance.
          </p>
        </div>
      </div>
    </div>
  )
}
