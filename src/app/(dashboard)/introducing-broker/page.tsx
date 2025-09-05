"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import IBRequest from "../../../../components/IBRequest"; // ✅ Component 1 (form + request flow)
import IBPage from "../../../../components/IBPage"; // ✅ Component 2 (approved IB page)

function IntroducingBroker() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch user (same as LiveAccounts logic)
  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    const userString = localStorage.getItem("user");
    if (!token || !userString) return;

    const parsedUser = JSON.parse(userString);
    const email = parsedUser.email;
    console.log(email);

    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/auth/user/${email}`
      );
      setUser(res.data);
      //   console.log(res.data);
      console.log(res.data.isApprovedIB);
    } catch (err) {
      console.error("Error fetching user:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) return <p className="text-white">Loading...</p>;

  return (
    <div>
      {!user.isApprovedIB ? (
        <IBRequest user={user} refreshUser={fetchUser} />
      ) : (
        <IBPage user={user} />
      )}
    </div>
  );
}

export default IntroducingBroker;
