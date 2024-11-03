"use client";

import { useState } from "react";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (res.ok) {
      // Handle successful signup
      alert("Account created successfully!");
    } else {
      // Handle signup failure
      alert("Failed to create account");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
        <input
          type="text"
          placeholder="Name"
          className="w-full border p-2 mb-4 rounded-lg"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-4 rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-4 rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-green-500 text-white py-2 px-4 rounded-lg w-full hover:bg-green-600"
          onClick={handleSignup}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
