"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Broker {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

export default function UsersPage() {
  const router = useRouter();
  const [brokers, setBrokers] = useState<Broker[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // 🔐 Redirect to login if no token
    if (!token || token !== "admin-token") {
      router.push("/login");
      return;
    }

    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE}/api/brokers`)
      .then((res) => {
        setBrokers(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch brokers:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen text-white">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Broker Applications</h1>
        <p className="text-gray-400 mt-1 text-sm">
          Below is the list of brokers who have applied to join us.
        </p>
        <hr className="mt-4 border-gray-700" />
      </div>

      {loading ? (
        <p className="text-gray-400">Loading broker applications...</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-[#1f2937]">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#1f2937] text-gray-300 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Message</th>
              </tr>
            </thead>
            <tbody>
              {brokers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-gray-400">
                    No broker applications found.
                  </td>
                </tr>
              ) : (
                brokers.map((broker) => (
                  <tr
                    key={broker._id}
                    className="border-b border-gray-700 hover:bg-[#111827]"
                  >
                    <td className="px-4 py-3">
                      {broker.firstName} {broker.lastName}
                    </td>
                    <td className="px-4 py-3">{broker.email}</td>
                    <td className="px-4 py-3">{broker.phone}</td>
                    <td className="px-4 py-3">{broker.message || "N/A"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
