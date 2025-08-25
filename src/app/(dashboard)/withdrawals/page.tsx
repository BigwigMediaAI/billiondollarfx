"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Wallet, X } from "lucide-react";
import Button from "../../../../components/Button"; // ✅ import your Button

interface Account {
  _id: string;
  accountNo: number;
  currency: string;
}

function Withdrawal() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    accountno: "",
    amount: "",
  });

  // ✅ Fetch all accounts
  const fetchAccounts = async () => {
    try {
      const token = localStorage.getItem("token");
      const userString = localStorage.getItem("user");

      if (!token || !userString) return;

      const user = JSON.parse(userString);
      const email = user.email;

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/auth/user/${email}`
      );

      if (res.data?.accounts?.length > 0) {
        setAccounts(res.data.accounts);
      }
    } catch (err) {
      console.error("Error fetching accounts:", err);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/payment/withdraw`,
        {
          amount: Number(form.amount),
          merchant_user_id: form.accountno,
        }
      );

      if (res.data?.success) {
        alert("Withdrawal request submitted!");
      } else {
        alert("Withdrawal failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Withdrawal failed. Try again.");
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full rounded-md overflow-hidden shadow-md">
        <video
          src="/BILLION$ FX WEBSITE WITHDRAWALS.mp4" // 👈 place your video in public/banner/
          className="w-full object-cover rounded-md"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>
      <div className="h-screen md:h-[80vh] bg-gradient-to-br from-[#0a0f1d] to-[#0f172a] px-6 md:px-12 py-10 text-white">
        <h1 className="text-2xl font-bold mb-8">Withdrawal</h1>

        {/* Accounts List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {accounts.length > 0 ? (
            accounts.map((acc) => (
              <div
                key={acc._id}
                className="border border-gray-700 bg-[#111827] rounded-2xl shadow-lg p-6 flex flex-col space-y-4"
              >
                <div className="flex justify-between items-center">
                  <Wallet size={30} className="text-[var(--primary-color)]" />
                  <h2 className="text-lg font-semibold">
                    MT{acc.accountNo} ({acc.currency})
                  </h2>
                </div>
                <p className="text-gray-300 text-sm">
                  Withdraw funds securely from this account.
                </p>

                {/* ✅ Use your Button instead of <button> */}
                <Button
                  text="Withdraw"
                  onClick={() => {
                    setForm((prev) => ({
                      ...prev,
                      accountno: acc.accountNo.toString(),
                    }));
                    setShowModal(true);
                  }}
                  className="w-fit"
                />
              </div>
            ))
          ) : (
            <p className="text-gray-400">No accounts found.</p>
          )}
        </div>

        {/* Modal Popup */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
            <div className="bg-[#1f2937] p-6 rounded-xl w-full max-w-md relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>

              <h2 className="text-xl font-bold mb-4">Withdraw Funds</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Account Number */}
                <div>
                  <label className="block text-sm text-gray-300 mb-1">
                    Account Number
                  </label>
                  <input
                    type="text"
                    name="accountno"
                    value={form.accountno}
                    disabled
                    className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white border border-gray-600"
                  />
                </div>

                {/* Amount */}
                <div>
                  <label className="block text-sm text-gray-300 mb-1">
                    Amount
                  </label>
                  <input
                    type="number"
                    name="amount"
                    value={form.amount}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  />
                </div>

                {/* ✅ Use Button for submit */}
                <Button
                  text={loading ? "Processing..." : "Confirm Withdrawal"}
                  disabled={loading}
                />
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Withdrawal;
