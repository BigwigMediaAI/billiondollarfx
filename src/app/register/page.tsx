"use client";

import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Logo from "../../../assets/BDFX Logo Animition.gif";
import Button from "../../../components/Button";
import { useRouter } from "next/navigation";
import Link from "next/link";

const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Belarus",
  "Belgium",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Chile",
  "China",
  "Colombia",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "Estonia",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Guatemala",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lithuania",
  "Luxembourg",
  "Macau",
  "Madagascar",
  "Malaysia",
  "Maldives",
  "Malta",
  "Mauritius",
  "Mexico",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Myanmar",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nigeria",
  "North",
  "Korea",
  "Norway",
  "Oman",
  "Pakistan",
  "Panama",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Saudi Arabia",
  "Serbia",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "South Africa",
  "South Korea",
  "Spain",
  "Sri Lanka",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "UAE",
  "Uganda",
  "Ukraine",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

export default function SignUpPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    nationality: "",
    state: "",
    city: "",
    password: "",
    confirmPassword: "",
    referralCode: "",
    agree: false,
  });

  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"form" | "otp">("form");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    // Handle checkbox safely
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleClick = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agree)
      return alert("Please accept the terms and conditions.");
    if (formData.password !== formData.confirmPassword)
      return alert("Passwords do not match.");

    try {
      setLoading(true);
      console.log(formData);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      console.log(data);
      if (!res.ok) return alert(data.message || "Something went wrong.");

      alert("OTP sent to email and WhatsApp.");
      setStep("otp");
    } catch (error) {
      console.error(error);
      alert("Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/auth/verify-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email, otp }),
        }
      );

      const data = await res.json();
      if (!res.ok) return alert(data.message || "OTP verification failed.");

      alert("Registration complete. You can now login.");
      router.push("/login");
    } catch (error) {
      console.error(error);
      alert("OTP verification failed.");
    } finally {
      setLoading(false);
    }
  };

  const handelredirect = () => router.push("/login");

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      <Head>
        <title>Sign Up | WinproFX</title>
      </Head>

      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute w-auto min-w-full min-h-full max-w-none z-0 object-cover"
      >
        <source src="/signup.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 bg-black/30 opacity-85 max-w-3xl w-full mx-4 md:mx-auto rounded-xl p-8 md:p-12 text-white">
        <div className="flex flex-col items-center mb-6">
          <Link href="/">
            <Image
              src={Logo}
              alt="WinproFX Logo"
              width={400}
              className="mb-4"
            />
          </Link>
          <h1 className="text-2xl font-semibold">Sign Up</h1>
          <p className="text-sm mt-2">
            Already have an account?{" "}
            <Link href="/login" className="text-[#00CFFF] cursor-pointer">
              Sign In
            </Link>
          </p>
        </div>

        {step === "form" ? (
          <form
            onSubmit={handleClick}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              name="fullName"
              type="text"
              placeholder="Full Name*"
              className="input"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email*"
              className="input"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              name="phone"
              type="tel"
              placeholder="Phone Number*"
              className="input"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <select
              name="nationality"
              className="input"
              value={formData.nationality}
              onChange={handleChange}
              required
            >
              <option value="">Select Country*</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            <input
              name="state"
              type="text"
              placeholder="State*"
              className="input"
              value={formData.state}
              onChange={handleChange}
              required
            />
            <input
              name="city"
              type="text"
              placeholder="City*"
              className="input"
              value={formData.city}
              onChange={handleChange}
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password*"
              className="input"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password*"
              className="input"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <input
              name="referralCode"
              type="text"
              placeholder="Referral Code (if any)"
              className="input md:col-span-2"
              value={formData.referralCode}
              onChange={handleChange}
            />
            <div className="md:col-span-2 flex items-start text-sm text-gray-300">
              <input
                name="agree"
                type="checkbox"
                className="mr-2 mt-1"
                checked={formData.agree}
                onChange={handleChange}
              />
              <label>
                I agree to the WinproFX{" "}
                <span className="text-[var(--primary)] underline">
                  Privacy Policy
                </span>
                ,{" "}
                <span className="text-[var(--primary)] underline">
                  Terms and Conditions
                </span>
                , and{" "}
                <span className="text-[var(--primary)] underline">
                  Risk Disclosure
                </span>
                .
              </label>
            </div>
            <button
              type="submit"
              className="md:col-span-2 bg-[var(--primary)] hover:bg-[#f3d089] text-white font-semibold py-2 rounded-full"
            >
              {loading ? "Processing..." : "SIGN UP"}
            </button>
            <Button
              text="BACK TO LOGIN"
              onClick={handelredirect}
              className="md:col-span-2 border border-white text-white py-2 rounded-full hover:bg-white hover:text-black transition"
            />
          </form>
        ) : (
          <form
            onSubmit={handleOtpSubmit}
            className="grid grid-cols-1 gap-4 max-w-lg mx-auto"
          >
            <p className="text-white text-sm mb-2">
              Enter the OTP sent to your email/phone
            </p>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="input mb-5"
              required
            />
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-[var(--primary)] hover:bg-[#f3d089] text-white font-semibold py-2 px-4 rounded-full w-fit"
              >
                {loading ? "Verifying..." : "VERIFY OTP"}
              </button>
            </div>
          </form>
        )}
      </div>

      <style jsx>{`
        .input {
          background-color: #0f172a;
          border-radius: 0.5rem;
          padding: 0.75rem;
          color: white;
          border: 1px solid #1e293b;
        }
        .input:focus {
          outline: none;
          border-color: #00cfff;
        }
      `}</style>
    </div>
  );
}
