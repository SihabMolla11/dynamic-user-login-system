"use client";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

interface Device {
  deviceName: string;
  browser: string;
  os: string;
  ip: string;
  isActive: boolean;
}

export default function DevicesPage(): React.JSX.Element {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDevices = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("http://localhost:8000/api/v1/getLoginDivices", {
        withCredentials: true,
      });

      setDevices(response.data);
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      setError(axiosError.response?.data?.message ?? "Failed to load devices. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  const getOsIcon = (os: string): React.JSX.Element => {
    if (os === "iOS" || os === "Android") {
      return (
        <svg
          className="w-5 h-5 text-amber-700"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <rect x="7" y="2" width="10" height="20" rx="3" />
          <line x1="12" y1="18" x2="12" y2="18.5" strokeWidth={2} strokeLinecap="round" />
        </svg>
      );
    }
    if (os === "macOS") {
      return (
        <svg
          className="w-5 h-5 text-amber-700"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <path d="M12 3C8 3 5 6 5 10c0 5 7 11 7 11s7-6 7-11c0-4-3-7-7-7z" />
        </svg>
      );
    }
    return (
      <svg
        className="w-5 h-5 text-amber-700"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-lg font-medium text-gray-900">My devices</h1>
        <p className="text-sm text-gray-500 mt-1">All devices linked to your account</p>
      </div>

      {/* Loading skeletons */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_: unknown, i: number) => (
            <div
              key={i}
              className="bg-white border border-gray-100 rounded-xl p-5 h-52 animate-pulse"
            >
              <div className="flex justify-between mb-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg" />
                <div className="w-16 h-6 bg-gray-100 rounded-full" />
              </div>
              <div className="h-3 bg-gray-100 rounded w-3/4 mb-2" />
              <div className="h-3 bg-gray-100 rounded w-1/2 mb-4" />
              <div className="border-t border-gray-100 pt-4 space-y-2">
                <div className="h-3 bg-gray-100 rounded w-full" />
                <div className="h-3 bg-gray-100 rounded w-full" />
                <div className="h-3 bg-gray-100 rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-5 h-5 text-red-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <p className="text-sm text-red-600 font-medium">{error}</p>
            <button
              onClick={fetchDevices}
              className="mt-3 text-xs text-gray-500 underline hover:text-gray-700"
            >
              Try again
            </button>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && devices.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
            <svg
              className="w-5 h-5 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
          </div>
          <p className="text-sm font-medium text-gray-700">No devices found</p>
          <p className="text-xs text-gray-400 mt-1">No devices are linked to your account yet.</p>
        </div>
      )}

      {/* Device cards */}
      {!loading && !error && devices.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {devices.map((device: Device, index: number) => (
            <div
              key={index}
              className="bg-white border border-gray-100 rounded-xl p-5 flex flex-col gap-4 hover:border-amber-200 transition-colors"
            >
              {/* Top row */}
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                  {getOsIcon(device.os)}
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
                    device.isActive ? "bg-green-50 text-green-800" : "bg-gray-100 text-gray-500"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      device.isActive ? "bg-green-500" : "bg-gray-400"
                    }`}
                  />
                  {device.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              {/* Device name */}
              <div>
                <h3 className="font-medium text-gray-900">{device.deviceName}</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  {device.browser} on {device.os}
                </p>
              </div>

              <div className="border-t border-gray-100" />

              {/* Meta rows */}
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-gray-400">
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15 15 0 010 20M12 2a15 15 0 000 20" />
                    </svg>
                    Browser
                  </span>
                  <span className="font-medium text-gray-700">{device.browser}</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-gray-400">
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <rect x="2" y="3" width="20" height="14" rx="2" />
                      <line x1="8" y1="21" x2="16" y2="21" />
                      <line x1="12" y1="17" x2="12" y2="21" />
                    </svg>
                    OS
                  </span>
                  <span className="font-medium text-gray-700">{device.os}</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-gray-400">
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5" />
                      <path d="M2 12l10 5 10-5" />
                    </svg>
                    IP address
                  </span>
                  <span className="font-mono text-gray-500">{device.ip}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
