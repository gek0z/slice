"use client";

import { useEffect, useState } from "react";

interface PasswordProtectionProps {
  children: React.ReactNode;
}

export default function PasswordProtection({
  children,
}: PasswordProtectionProps) {
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user was previously authorized
    const isAuthorized = localStorage.getItem("slice-authorized") === "true";
    setAuthorized(isAuthorized);
    // Set loading to false after checking authorization
    setLoading(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password === "pizza") {
      localStorage.setItem("slice-authorized", "true");
      setAuthorized(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  // Show nothing during the initial load to prevent flash
  if (loading) {
    return null;
  }

  if (authorized) {
    return <>{children}</>;
  }

  return (
    <div
      className="min-h-screen bg-crust-neutral2 flex flex-col items-center justify-center py-4 sm:py-8 px-4 sm:px-8"
      style={{
        animation: "fadeIn 0.5s ease-in-out",
      }}
    >
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
      <div className="max-w-md w-full bg-crust-neutral1 px-4 sm:px-6 py-4 sm:py-6 rounded-lg ">
        <form onSubmit={handleSubmit} className="space-y-4 relative">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-crust-neutral7 mb-1 hidden sm"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-crust-neutral9 text-center text-crust-neutral9 placeholder:text-crust-neutral9 border-crust-neutral1 border-2 bg-crust-neutral1 ring-crust-white ${
                error ? "border-red-500" : "border-gray-300"
              }`}
              style={{
                background: "var(--color-crust-neutral1)",
              }}
              placeholder="Enter password"
            />
            {error && (
              <p className="mt-1 text-xs text-red-500 absolute top-[100%] left-0 w-full text-center uppercase font-bold">
                Incorrect password. Try again.
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-crust-yellow1 text-crust-neutral9 uppercase font-bold py-2 px-4 rounded-md hover:bg-crust-yellow2 transition-colors focus:outline-none focus:ring-2 focus:ring-crust-yellow1 focus:ring-offset-2"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}
