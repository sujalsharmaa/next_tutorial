"use client";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const verifyUserEmail = async () => {
    try {
      await axios.post('/api/users/verifyEmail', { token });
      setVerified(true);
      console.log("code has set isVerified to true")
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
      console.error('Error during email verification:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2>{token ? `${token}` : "No token"}</h2>

      {loading ? (
        <p>Loading...</p>
      ) : verified ? (
        <div>
          <h2 className="text-2xl">Email verified</h2>
          <Link href="/login">Login</Link>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl text-red-500">Error</h2>
          <p>There was an error verifying your email. Please try again or contact support.</p>
        </div>
      )}
    {verified? (<p>yes verified email</p>) : (<p>not verified</p>)}

    </div>
  );
}
