"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import IBRequest from "../../../../components/IBRequest";
import IBPage from "../../../../components/IBPage";

interface User {
  email: string;
  ibRequestPending?: boolean;
  isApprovedIB?: boolean;
}

function IntroducingBroker() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch user
  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    const userString = localStorage.getItem("user");
    if (!token || !userString) return;

    const parsedUser: User = JSON.parse(userString);
    const email = parsedUser.email;

    try {
      const res = await axios.get<User>(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/auth/user/${email}`
      );
      setUser(res.data);
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
      {!user?.isApprovedIB ? (
        <IBRequest user={user!} refreshUser={fetchUser} setUser={setUser} />
      ) : (
        <IBPage user={user!} />
      )}
    </div>
  );
}

export default IntroducingBroker;
