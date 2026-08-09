import { Link } from "react-router-dom";

export default function ForgotPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4">
          Forgot Password
        </h1>

        <p className="text-gray-600 mb-6">
          Password reset page is working.
        </p>

        <Link
          to="/login"
          className="text-blue-600 hover:underline"
        >
          ← Back to Login
        </Link>
      </div>
    </div>
  );
}