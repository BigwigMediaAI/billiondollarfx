"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface User {
  _id: string;
  fullName: string;

  email: string;
  phone: string;
  nationality: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE}/api/auth/users`)
      .then((res) => {
        setUsers(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch users:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen text-white">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Users</h1>
        <p className="text-gray-400 mt-1 text-sm">List of registered users</p>
        <hr className="mt-4 border-gray-700" />
      </div>

      {loading ? (
        <p className="text-gray-400">Loading users...</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-[#1f2937]">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#1f2937] text-gray-300 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">Full Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Nationality</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-gray-400">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b border-gray-700 hover:bg-[#111827]"
                  >
                    <td className="px-4 py-3">{user.fullName}</td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">{user.phone}</td>
                    <td className="px-4 py-3">{user.nationality || "N/A"}</td>
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
