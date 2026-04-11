"use client";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";


export default function RegistrationForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const getStrength = (pw: string) => {
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
  };

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"];
  const strengthColor = ["", "bg-red-400", "bg-amber-400", "bg-amber-500", "bg-amber-600"];
  const strength = getStrength(form.password);


   const registerUser = async (data: any) => {
    const res = await axios.post("http://localhost:8000/api/v1/register", data, {
      withCredentials: true,
    });

    return res.data;
  };


  const submitForm = async () => {
    try {
      const payload = {
        ...form,
        phoneNumber: form.phoneNumber ? `+880${form.phoneNumber}` : undefined,
      };

      const res = await registerUser(payload);

      console.log("REGISTER SUCCESS:", res);

      alert("Registration successful ✅");

      window.location.href = "/dashboard";
    } catch (error: any) {
      console.log("REGISTER ERROR:", error);

      alert(error?.response?.data?.error || "Registration failed ❌");
    }
  };


  return (
    <div className="min-h-screen bg-amber-50/40 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white border border-amber-100 rounded-2xl p-8">
        {/* Header */}
        <div className="mb-7">
          <h1 className="text-xl font-medium text-gray-900">Create your account</h1>
          <p className="text-sm text-gray-500 mt-1">Fill in the details below to get started</p>
        </div>

        <div className="space-y-4">
          {/* Name row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-500">First name</label>
              <input
                type="text"
                placeholder="Sihab"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                className="h-10 px-3 text-sm border border-gray-200 rounded-lg outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-500">Last name</label>
              <input
                type="text"
                placeholder="Molla"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                className="h-10 px-3 text-sm border border-gray-200 rounded-lg outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition"
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-500">Email address</label>
            <input
              type="email"
              placeholder="sihab@gmail.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="h-10 px-3 text-sm border border-gray-200 rounded-lg outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-500">Phone number</label>
            <div className="flex">
              <span className="flex items-center px-3 text-sm text-gray-500 bg-gray-50 border border-r-0 border-gray-200 rounded-l-lg">
                +880
              </span>
              <input
                type="tel"
                placeholder="01700 000 000"
                value={form.phoneNumber}
                onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                className="flex-1 h-10 px-3 text-sm border border-gray-200 rounded-r-lg outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-500">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full h-10 px-3 pr-10 text-sm border border-gray-200 rounded-lg outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {form.password && (
              <div className="space-y-1.5">
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        i <= strength ? strengthColor[strength] : "bg-gray-100"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-amber-700">{strengthLabel[strength]} password</p>
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            onClick={submitForm}
            type="button"
            className="w-full h-11 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium rounded-lg transition-colors mt-2"
          >
            Create account
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-gray-100" />
          <span className="text-xs text-gray-400">already have an account?</span>
          <div className="flex-1 h-px bg-gray-100" />
        </div>

        <p className="text-center text-sm text-gray-500">
          <Link href="/login" className="text-amber-600 font-medium hover:text-amber-700">
            Sign in instead
          </Link>
        </p>
      </div>
    </div>
  );
}
