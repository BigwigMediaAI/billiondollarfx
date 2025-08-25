"use client";
import { useState } from "react";

const TransactionPage = () => {
  const [activeTab, setActiveTab] = useState<"deposit" | "withdrawal">(
    "deposit"
  );

  // Placeholder: no transactions yet
  const depositData: any[] = [];
  const withdrawalData: any[] = [];

  // Pick table data based on tab
  const currentData = activeTab === "deposit" ? depositData : withdrawalData;

  return (
    <div className="flex flex-col gap-4">
      {/* ✅ Top Ticker Bar */}
      <div className="w-full rounded-md overflow-hidden shadow-md">
        <iframe
          src="https://fxpricing.com/fx-widget/ticker-tape-widget.php?id=1,2,3,5,14,20&border=show&speed=50&click_target=blank&theme=dark&tm-cr=212529&hr-cr=FFFFFF13&by-cr=28A745&sl-cr=DC3545&flags=circle&d_mode=compact-name&column=ask,bid,spread&lang=en&font=Arial, sans-serif"
          width="100%"
          height="85"
          style={{ border: "unset" }}
        ></iframe>
      </div>

      {/* ✅ Main Content */}
      <div className="h-screen md:h-[80vh] bg-gradient-to-br from-[#0a0f1d] to-[#0f172a] px-2 md:px-12  py-10 text-white">
        <h1 className="text-2xl font-bold mb-8">Transaction History</h1>

        {/* ✅ Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("deposit")}
            className={`px-4 py-2 rounded-md ${
              activeTab === "deposit" ? "bg-[var(--primary)]" : "bg-gray-700"
            }`}
          >
            Deposit
          </button>
          <button
            onClick={() => setActiveTab("withdrawal")}
            className={`px-4 py-2 rounded-md ${
              activeTab === "withdrawal" ? "bg-[var(--primary)]" : "bg-gray-700"
            }`}
          >
            Withdrawal
          </button>
        </div>

        {/* ✅ Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-700 rounded-lg">
            <thead>
              <tr className="bg-gray-800 text-left">
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Account</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? (
                currentData.map((item, index) => (
                  <tr key={index} className="border-t border-gray-700">
                    <td className="px-4 py-2">{item.date}</td>
                    <td className="px-4 py-2">{item.amount}</td>
                    <td className="px-4 py-2">{item.account}</td>
                    <td className="px-4 py-2">{item.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-4 text-center text-gray-400"
                  >
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
