"use client";

function IBPage({ user }: any) {
  return (
    <div className="bg-[#111a2e] p-8 rounded-lg text-center text-white">
      <h2 className="text-2xl font-semibold mb-4">Welcome, IB Partner 🎉</h2>
      <p className="text-gray-300 mb-4">
        Your account has been approved as an Introducing Broker.
      </p>
      <p className="text-gray-400">Your referral link:</p>
      <p className="text-yellow-400 font-mono mt-2">
        https://billiondollarfx.com/ref/{user._id}
      </p>
    </div>
  );
}

export default IBPage;
