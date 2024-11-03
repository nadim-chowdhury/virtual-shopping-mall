"use client";

import { useEffect, useState } from "react";

interface UserProfile {
  name: string;
  email: string;
  address: string;
}

const fetchProfile = async (): Promise<UserProfile> => {
  const res = await fetch("/api/profile");
  if (!res.ok) {
    throw new Error("Failed to fetch profile data");
  }
  return res.json();
};

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const profileData = await fetchProfile();
        setProfile(profileData);
      } catch (error) {
        console.log("getProfile ~ error:", error);
        setError("Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      {profile && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-lg">
            <strong>Name:</strong> {profile.name}
          </p>
          <p className="text-lg">
            <strong>Email:</strong> {profile.email}
          </p>
          <p className="text-lg">
            <strong>Address:</strong> {profile.address}
          </p>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-blue-600">
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
}
