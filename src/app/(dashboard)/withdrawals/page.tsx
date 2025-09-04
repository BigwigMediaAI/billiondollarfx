"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Wallet, X } from "lucide-react";
import Button from "../../../../components/Button";
import KycAlertModal from "../../../../components/KycAlertModal";

interface Account {
  _id: string;
  accountNo: number;
  currency: string;
}

interface User {
  email: string;
  isKycVerified: boolean;
  accounts: Account[];
}

function Withdrawal() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [accountNo, setAccountNo] = useState("");
  const [balance, setBalance] = useState<number>(0);
  const [DWBalance, setDWBalance] = useState<string>("0.00");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    accountno: "",
    amount: "",
    account: "",
    ifsc: "",
    name: "",
    mobile: "",
    note: "",
  });
  const [userData, setUserData] = useState<User | null>(null);
  const [showKycPopup, setShowKycPopup] = useState(false);

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

      if (res.data) setUserData(res.data);

      if (res.data?.accounts?.length > 0) {
        setAccounts(res.data.accounts);
        const firstAccountNo = res.data.accounts[0].accountNo;
        setAccountNo(firstAccountNo);
        fetchAccountSummary(firstAccountNo);
      }
    } catch (err) {
      console.error("Error fetching accounts:", err);
    }
  };

  const fetchAccountSummary = async (accountNo: number) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/moneyplant/checkBalance`,
        { accountno: accountNo.toString() },
        { headers: { "Content-Type": "application/json" } }
      );

      const result = res.data;
      if (result.data?.response === "success") {
        const accountData = result.data;
        setBalance(parseFloat(accountData.balance));
        setDWBalance(accountData.DWBalance);
      } else {
        console.warn("Account summary fetch failed:", result.data?.message);
      }
    } catch (error) {
      console.error("Failed to fetch account summary:", error);
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

    const withdrawalAmount = Number(form.amount);

    // ✅ Prevent withdrawal if amount > balance
    if (withdrawalAmount > balance) {
      alert("You cannot withdraw more than your available balance.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/payment/ramee/withdrawal`,
        {
          account: form.account,
          ifsc: form.ifsc,
          name: form.name,
          mobile: form.mobile,
          note: form.note,
          amount: withdrawalAmount,
          accountNo: form.accountno,
        }
      );

      console.log(res.data);
      if (res.data?.success) {
        alert("Withdrawal request submitted!");
        fetchAccountSummary(Number(form.accountno)); // refresh balance
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
          src="/BILLION$ FX WEBSITE WITHDRAWALS.mp4"
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
                  <div className="flex flex-col">
                    <h2>$({balance})</h2>
                    <h2 className="text-lg font-semibold">MT{acc.accountNo}</h2>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">
                  Withdraw funds securely from this account.
                </p>

                <Button
                  text="Withdraw"
                  onClick={() => {
                    if (userData?.isKycVerified === false) {
                      setShowKycPopup(true);
                    } else {
                      setForm((prev) => ({
                        ...prev,
                        accountno: acc.accountNo.toString(),
                      }));
                      setShowModal(true);
                    }
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
            <div className="bg-[#1f2937] p-6 rounded-xl w-full max-w-md relative max-h-[70vh] overflow-auto no-scrollbar">
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
                    Trading Account No
                  </label>
                  <input
                    type="text"
                    name="accountno"
                    value={form.accountno}
                    disabled
                    className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white border border-gray-600"
                  />
                </div>

                {/* Bank Account */}
                <div>
                  <label className="block text-sm text-gray-300 mb-1">
                    Bank Account
                  </label>
                  <input
                    type="text"
                    name="account"
                    value={form.account}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-600"
                  />
                </div>

                {/* IFSC */}
                <div>
                  <label className="block text-sm text-gray-300 mb-1">
                    IFSC
                  </label>
                  <input
                    type="text"
                    name="ifsc"
                    value={form.ifsc}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-600"
                  />
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm text-gray-300 mb-1">
                    Account Holder Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-600"
                  />
                </div>

                {/* Mobile */}
                <div>
                  <label className="block text-sm text-gray-300 mb-1">
                    Mobile
                  </label>
                  <input
                    type="text"
                    name="mobile"
                    value={form.mobile}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-600"
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
                    className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-600"
                  />
                </div>

                {/* Note */}
                <div>
                  <label className="block text-sm text-gray-300 mb-1">
                    Note
                  </label>
                  <input
                    type="text"
                    name="note"
                    value={form.note}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-600"
                  />
                </div>

                <Button
                  text={loading ? "Processing..." : "Confirm Withdrawal"}
                  disabled={loading}
                />
              </form>
            </div>
          </div>
        )}
      </div>

      <KycAlertModal
        isOpen={showKycPopup}
        onClose={() => setShowKycPopup(false)}
      />
    </div>
  );
}

export default Withdrawal;
