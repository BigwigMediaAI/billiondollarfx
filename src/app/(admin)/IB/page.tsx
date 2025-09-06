"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface IBRequest {
  _id: string;
  email: string;
  existingClientBase: string;
  offerEducation: string;
  expectedClientsNext3Months: string;
  expectedCommissionDirect: string;
  expectedCommissionSubIB: string;
  yourShare: number;
  clientShare: number;
  status: "pending" | "approved" | "rejected";
  referralCode?: string;
}

export default function IBRequestsPage() {
  const router = useRouter();
  const [requests, setRequests] = useState<IBRequest[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/ib`);
      const data = await res.json();
      setRequests(data);
    } catch (err) {
      console.error("Error fetching IB requests:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    // 🔐 Redirect to login if no token
    if (!token || token !== "admin-token") {
      router.push("/login");
      return;
    }

    fetchRequests();
  }, []);

  const approve = async (email: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/ib/${email}/approve`,
        { method: "PUT" }
      );
      const data = await res.json();
      alert(data.message);
      fetchRequests();
    } catch (err) {
      console.error("Approve error:", err);
    }
  };

  const reject = async (email: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/ib/${email}/reject`,
        { method: "PUT" }
      );
      const data = await res.json();
      alert(data.message);
      fetchRequests();
    } catch (err) {
      console.error("Reject error:", err);
    }
  };

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">IB Requests</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-gray-200">
            <tr>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Existing Clients</th>
              <th className="p-3 text-left">Offer Education</th>
              <th className="p-3 text-left">Expected Clients</th>
              <th className="p-3 text-left">Direct Commission</th>
              <th className="p-3 text-left">Sub IB Commission</th>
              <th className="p-3 text-left">Your Share</th>
              <th className="p-3 text-left">Client Share</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Referral Code</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={11} className="p-6 text-center text-gray-400">
                  Loading...
                </td>
              </tr>
            ) : requests.length > 0 ? (
              requests.map((ib) => (
                <tr
                  key={ib._id}
                  className="border-b border-gray-700 hover:bg-gray-900 transition"
                >
                  <td className="p-3">{ib.email}</td>
                  <td className="p-3">{ib.existingClientBase}</td>
                  <td className="p-3">{ib.offerEducation}</td>
                  <td className="p-3">{ib.expectedClientsNext3Months}</td>
                  <td className="p-3">{ib.expectedCommissionDirect}</td>
                  <td className="p-3">{ib.expectedCommissionSubIB}</td>
                  <td className="p-3">{ib.yourShare}%</td>
                  <td className="p-3">{ib.clientShare}%</td>
                  <td
                    className={`p-3 font-semibold ${
                      ib.status === "approved"
                        ? "text-green-500"
                        : ib.status === "rejected"
                        ? "text-red-500"
                        : "text-yellow-400"
                    }`}
                  >
                    {ib.status}
                  </td>
                  <td className="p-3">{ib.referralCode || "—"}</td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => approve(ib.email)}
                      disabled={ib.status === "approved"}
                      className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm disabled:opacity-50"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => reject(ib.email)}
                      disabled={ib.status === "rejected"}
                      className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm disabled:opacity-50"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={11} className="p-6 text-center text-gray-400">
                  No IB requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
