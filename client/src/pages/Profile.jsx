import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { saveProfile, getProfile } from "../api/profileApi";

function Profile() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [profile, setProfile] = useState({
    fullName: user?.name || "",
    college: "",
    degree: "",
    branch: "",
    graduationYear: "",
    github: "",
    linkedin: "",
    skills: "",
    about: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await getProfile(user.id);

      const data = response.data.profile;

      setProfile({
        fullName: data.fullName || "",
        college: data.college || "",
        degree: data.degree || "",
        branch: data.branch || "",
        graduationYear: data.graduationYear || "",
        github: data.github || "",
        linkedin: data.linkedin || "",
        skills: data.skills?.join(", ") || "",
        about: data.about || "",
      });

    } catch (error) {
      console.log("No existing profile found.");
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await saveProfile({
        user: user.id,
        fullName: profile.fullName,
        college: profile.college,
        degree: profile.degree,
        branch: profile.branch,
        graduationYear: profile.graduationYear,
        github: profile.github,
        linkedin: profile.linkedin,
        skills: profile.skills
          .split(",")
          .map((skill) => skill.trim()),
        about: profile.about,
      });

      alert("Profile saved successfully!");

      navigate("/dashboard");

    } catch (error) {
      console.error(error);
      alert("Failed to save profile.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-4xl font-bold text-blue-700 mb-8">
          👤 My Profile
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={profile.fullName}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />

          <input
            type="text"
            name="college"
            placeholder="College"
            value={profile.college}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />

          <input
            type="text"
            name="degree"
            placeholder="Degree"
            value={profile.degree}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />

          <input
            type="text"
            name="branch"
            placeholder="Branch"
            value={profile.branch}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />

          <input
            type="number"
            name="graduationYear"
            placeholder="Graduation Year"
            value={profile.graduationYear}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />

          <input
            type="text"
            name="skills"
            placeholder="React, Java, Node.js"
            value={profile.skills}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />

          <input
            type="url"
            name="github"
            placeholder="GitHub URL"
            value={profile.github}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />

          <input
            type="url"
            name="linkedin"
            placeholder="LinkedIn URL"
            value={profile.linkedin}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />

          <textarea
            rows="5"
            name="about"
            placeholder="About Yourself"
            value={profile.about}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
          >
            Save Profile
          </button>

        </form>

      </div>

    </div>
  );
}

export default Profile;