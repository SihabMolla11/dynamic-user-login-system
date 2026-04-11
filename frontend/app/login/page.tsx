"use client";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const login = async (data: any) => {
  const res = await axios.post("http://localhost:8000/api/v1/login", data, {
    withCredentials: true,
  });

  return res.data;
};

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const subMitLogin = async () => {
    try {
      const res = await login(form);

      console.log("LOGIN SUCCESS:", res);

      alert("Login successful ✅");

      window.location.href = "/dashboard";
    } catch (error: any) {
      console.log("LOGIN ERROR:", error);
      alert(error?.response?.data?.error || "Login failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-amber-50/40 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white border border-amber-100 rounded-2xl p-8">
        <div className="mb-7">
          <h1 className="text-xl font-medium text-gray-900">Welcome back</h1>
          <p className="text-sm text-gray-500 mt-1">Sign in to your account</p>
        </div>

        <div className="space-y-4">
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

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-gray-500">Password</label>
              <Link
                href="/forgot-password"
                className="text-xs text-amber-600 hover:text-amber-700 font-medium"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
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
          </div>

          <button
            onClick={subMitLogin}
            type="button"
            className="w-full h-11 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium rounded-lg transition-colors mt-2"
          >
            Sign in
          </button>
        </div>

        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-gray-100" />
          <span className="text-xs text-gray-400">don't have an account?</span>
          <div className="flex-1 h-px bg-gray-100" />
        </div>

        <p className="text-center text-sm text-gray-500">
          <Link href="/registration" className="text-amber-600 font-medium hover:text-amber-700">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
