import { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import {
  getResume,
  saveResume,
} from "../api/resumeBuilderApi";

function ResumeBuilder() {
  const [loading, setLoading] = useState(true);

  const [resume, setResume] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    github: "",
    portfolio: "",
    summary: "",
    education: [],
    skills: [],
    experience: [],
    projects: [],
    certifications: [],
    languages: [],
  });

  useEffect(() => {
    loadResume();
  }, []);

  // ==============================
  // LOAD RESUME
  // ==============================

  const loadResume = async () => {
    try {
      const res = await getResume();

      if (res.data.resume) {
        const data = res.data.resume;

        setResume({
          fullName: data.fullName || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
          linkedin: data.linkedin || "",
          github: data.github || "",
          portfolio: data.portfolio || "",
          summary: data.summary || "",
          education: data.education || [],
          skills: data.skills || [],
          experience: data.experience || [],
          projects: data.projects || [],
          certifications: data.certifications || [],
          languages: data.languages || [],
        });
      }
    } catch (error) {
      console.error("Error loading resume:", error);
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // PERSONAL INFORMATION
  // ==============================

  const handleChange = (e) => {
    setResume({
      ...resume,
      [e.target.name]: e.target.value,
    });
  };

  // ==============================
  // SAVE RESUME
  // ==============================

  const handleSave = async () => {
    try {
      await saveResume(resume);
      alert("Resume saved successfully!");
    } catch (error) {
      console.error("Save Resume Error:", error);
      alert("Failed to save resume.");
    }
  };

  // ==============================
  // EDUCATION
  // ==============================

  const addEducation = () => {
    setResume({
      ...resume,
      education: [
        ...resume.education,
        {
          college: "",
          degree: "",
          branch: "",
          year: "",
          cgpa: "",
        },
      ],
    });
  };

  const handleEducationChange = (index, e) => {
    const updatedEducation = [...resume.education];

    updatedEducation[index][e.target.name] = e.target.value;

    setResume({
      ...resume,
      education: updatedEducation,
    });
  };

  const removeEducation = (index) => {
    const updatedEducation = resume.education.filter(
      (_, i) => i !== index
    );

    setResume({
      ...resume,
      education: updatedEducation,
    });
  };

  // ==============================
  // SKILLS
  // ==============================

  const addSkill = () => {
    const skill = prompt("Enter a skill:");

    if (!skill || !skill.trim()) {
      return;
    }

    setResume({
      ...resume,
      skills: [...resume.skills, skill.trim()],
    });
  };

  const removeSkill = (index) => {
    const updatedSkills = resume.skills.filter(
      (_, i) => i !== index
    );

    setResume({
      ...resume,
      skills: updatedSkills,
    });
  };

  // ==============================
  // EXPERIENCE
  // ==============================

  const addExperience = () => {
    setResume({
      ...resume,
      experience: [
        ...resume.experience,
        {
          company: "",
          role: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    });
  };

  const handleExperienceChange = (index, e) => {
    const updatedExperience = [...resume.experience];

    updatedExperience[index][e.target.name] = e.target.value;

    setResume({
      ...resume,
      experience: updatedExperience,
    });
  };

  const removeExperience = (index) => {
    const updatedExperience = resume.experience.filter(
      (_, i) => i !== index
    );

    setResume({
      ...resume,
      experience: updatedExperience,
    });
  };

  // ==============================
  // PROJECTS
  // ==============================

  const addProject = () => {
    setResume({
      ...resume,
      projects: [
        ...resume.projects,
        {
          name: "",
          description: "",
          technologies: "",
          link: "",
        },
      ],
    });
  };

  const handleProjectChange = (index, e) => {
    const updatedProjects = [...resume.projects];

    updatedProjects[index][e.target.name] = e.target.value;

    setResume({
      ...resume,
      projects: updatedProjects,
    });
  };

  const removeProject = (index) => {
    const updatedProjects = resume.projects.filter(
      (_, i) => i !== index
    );

    setResume({
      ...resume,
      projects: updatedProjects,
    });
  };

  // ==============================
  // CERTIFICATIONS
  // ==============================

  const addCertification = () => {
    setResume({
      ...resume,
      certifications: [
        ...resume.certifications,
        {
          name: "",
          organization: "",
          date: "",
          credentialId: "",
          url: "",
        },
      ],
    });
  };

  const handleCertificationChange = (index, e) => {
    const updatedCertifications = [...resume.certifications];

    updatedCertifications[index][e.target.name] =
      e.target.value;

    setResume({
      ...resume,
      certifications: updatedCertifications,
    });
  };

  const removeCertification = (index) => {
    const updatedCertifications =
      resume.certifications.filter(
        (_, i) => i !== index
      );

    setResume({
      ...resume,
      certifications: updatedCertifications,
    });
  };

  // ==============================
  // LANGUAGES
  // ==============================

  const addLanguage = () => {
    setResume({
      ...resume,
      languages: [
        ...resume.languages,
        {
          name: "",
          proficiency: "",
        },
      ],
    });
  };

  const handleLanguageChange = (index, e) => {
    const updatedLanguages = [...resume.languages];

    updatedLanguages[index][e.target.name] =
      e.target.value;

    setResume({
      ...resume,
      languages: updatedLanguages,
    });
  };

  const removeLanguage = (index) => {
    const updatedLanguages = resume.languages.filter(
      (_, i) => i !== index
    );

    setResume({
      ...resume,
      languages: updatedLanguages,
    });
  };

  // ==============================
  // LOADING
  // ==============================

  if (loading) {
    return (
      <MainLayout>
        <div className="text-center text-2xl font-semibold py-20">
          Loading Resume...
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto p-6">

        {/* ==============================
            TITLE
        ============================== */}

        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            📄 Resume Builder
          </h1>

          <p className="text-gray-500 mt-2">
            Build your professional resume step by step.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* ==================================================
              LEFT SIDE
          ================================================== */}

          <div className="bg-white rounded-xl shadow-lg p-6">

            {/* ==============================
                PERSONAL INFORMATION
            ============================== */}

            <h2 className="text-2xl font-bold mb-6">
              👤 Personal Information
            </h2>

            <div className="space-y-4">

              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={resume.fullName}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={resume.email}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={resume.phone}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />

              <input
                type="text"
                name="address"
                placeholder="Address"
                value={resume.address}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />

              <input
                type="text"
                name="linkedin"
                placeholder="LinkedIn URL"
                value={resume.linkedin}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />

              <input
                type="text"
                name="github"
                placeholder="GitHub URL"
                value={resume.github}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />

              <input
                type="text"
                name="portfolio"
                placeholder="Portfolio URL"
                value={resume.portfolio}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />

              <textarea
                rows="6"
                name="summary"
                placeholder="Professional Summary"
                value={resume.summary}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />

            </div>

            {/* ==============================
                EDUCATION
            ============================== */}

            <hr className="my-8" />

            <h2 className="text-2xl font-bold mb-5">
              🎓 Education
            </h2>

            {resume.education.map((edu, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 mb-5 bg-gray-50 relative"
              >

                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                  className="absolute top-3 right-3 text-red-500 hover:text-red-700 text-sm font-semibold"
                >
                  Remove
                </button>

                <input
                  type="text"
                  name="college"
                  placeholder="College"
                  value={edu.college || ""}
                  onChange={(e) =>
                    handleEducationChange(index, e)
                  }
                  className="w-full border p-3 rounded-lg mb-3"
                />

                <input
                  type="text"
                  name="degree"
                  placeholder="Degree"
                  value={edu.degree || ""}
                  onChange={(e) =>
                    handleEducationChange(index, e)
                  }
                  className="w-full border p-3 rounded-lg mb-3"
                />

                <input
                  type="text"
                  name="branch"
                  placeholder="Branch"
                  value={edu.branch || ""}
                  onChange={(e) =>
                    handleEducationChange(index, e)
                  }
                  className="w-full border p-3 rounded-lg mb-3"
                />

                <div className="grid grid-cols-2 gap-3">

                  <input
                    type="text"
                    name="year"
                    placeholder="Graduation Year"
                    value={edu.year || ""}
                    onChange={(e) =>
                      handleEducationChange(index, e)
                    }
                    className="border p-3 rounded-lg"
                  />

                  <input
                    type="text"
                    name="cgpa"
                    placeholder="CGPA"
                    value={edu.cgpa || ""}
                    onChange={(e) =>
                      handleEducationChange(index, e)
                    }
                    className="border p-3 rounded-lg"
                  />

                </div>

              </div>
            ))}

            <button
              type="button"
              onClick={addEducation}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg"
            >
              + Add Education
            </button>

            {/* ==============================
                SKILLS
            ============================== */}

            <hr className="my-8" />

            <h2 className="text-2xl font-bold mb-5">
              🛠️ Skills
            </h2>

            {resume.skills.length === 0 ? (
              <p className="text-gray-500 mb-4">
                No skills added yet.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2 mb-4">

                {resume.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-2 rounded-full"
                  >
                    <span>{skill}</span>

                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      className="text-red-500 hover:text-red-700 font-bold"
                    >
                      ×
                    </button>
                  </div>
                ))}

              </div>
            )}

            <button
              type="button"
              onClick={addSkill}
              className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-lg"
            >
              + Add Skill
            </button>

            {/* ==============================
                EXPERIENCE
            ============================== */}

            <hr className="my-8" />

            <h2 className="text-2xl font-bold mb-5">
              💼 Experience
            </h2>

            {resume.experience.map((experience, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 mb-5 bg-gray-50 relative"
              >

                <button
                  type="button"
                  onClick={() =>
                    removeExperience(index)
                  }
                  className="absolute top-3 right-3 text-red-500 hover:text-red-700 text-sm font-semibold"
                >
                  Remove
                </button>

                <input
                  type="text"
                  name="company"
                  placeholder="Company Name"
                  value={experience.company || ""}
                  onChange={(e) =>
                    handleExperienceChange(index, e)
                  }
                  className="w-full border rounded-lg p-3 mb-3"
                />

                <input
                  type="text"
                  name="role"
                  placeholder="Job Role"
                  value={experience.role || ""}
                  onChange={(e) =>
                    handleExperienceChange(index, e)
                  }
                  className="w-full border rounded-lg p-3 mb-3"
                />

                <div className="grid grid-cols-2 gap-3 mb-3">

                  <input
                    type="text"
                    name="startDate"
                    placeholder="Start Date"
                    value={experience.startDate || ""}
                    onChange={(e) =>
                      handleExperienceChange(index, e)
                    }
                    className="border rounded-lg p-3"
                  />

                  <input
                    type="text"
                    name="endDate"
                    placeholder="End Date"
                    value={experience.endDate || ""}
                    onChange={(e) =>
                      handleExperienceChange(index, e)
                    }
                    className="border rounded-lg p-3"
                  />

                </div>

                <textarea
                  rows="4"
                  name="description"
                  placeholder="Describe your responsibilities and achievements"
                  value={experience.description || ""}
                  onChange={(e) =>
                    handleExperienceChange(index, e)
                  }
                  className="w-full border rounded-lg p-3"
                />

              </div>
            ))}

            <button
              type="button"
              onClick={addExperience}
              className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-3 rounded-lg"
            >
              + Add Experience
            </button>

            {/* ==============================
                PROJECTS
            ============================== */}

            <hr className="my-8" />

            <h2 className="text-2xl font-bold mb-5">
              🚀 Projects
            </h2>

            {resume.projects.map((project, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 mb-5 bg-gray-50 relative"
              >

                <button
                  type="button"
                  onClick={() =>
                    removeProject(index)
                  }
                  className="absolute top-3 right-3 text-red-500 hover:text-red-700 text-sm font-semibold"
                >
                  Remove
                </button>

                <input
                  type="text"
                  name="name"
                  placeholder="Project Name"
                  value={project.name || ""}
                  onChange={(e) =>
                    handleProjectChange(index, e)
                  }
                  className="w-full border rounded-lg p-3 mb-3"
                />

                <textarea
                  rows="4"
                  name="description"
                  placeholder="Project Description"
                  value={project.description || ""}
                  onChange={(e) =>
                    handleProjectChange(index, e)
                  }
                  className="w-full border rounded-lg p-3 mb-3"
                />

                <input
                  type="text"
                  name="technologies"
                  placeholder="Technologies Used"
                  value={project.technologies || ""}
                  onChange={(e) =>
                    handleProjectChange(index, e)
                  }
                  className="w-full border rounded-lg p-3 mb-3"
                />

                <input
                  type="text"
                  name="link"
                  placeholder="GitHub / Project URL"
                  value={project.link || ""}
                  onChange={(e) =>
                    handleProjectChange(index, e)
                  }
                  className="w-full border rounded-lg p-3"
                />

              </div>
            ))}

            <button
              type="button"
              onClick={addProject}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-lg"
            >
              + Add Project
            </button>

            {/* ==============================
                CERTIFICATIONS
            ============================== */}

            <hr className="my-8" />

            <h2 className="text-2xl font-bold mb-5">
              🏆 Certifications
            </h2>

            {resume.certifications.map(
              (certification, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 mb-5 bg-gray-50 relative"
                >

                  <button
                    type="button"
                    onClick={() =>
                      removeCertification(index)
                    }
                    className="absolute top-3 right-3 text-red-500 hover:text-red-700 text-sm font-semibold"
                  >
                    Remove
                  </button>

                  <input
                    type="text"
                    name="name"
                    placeholder="Certification Name"
                    value={certification.name || ""}
                    onChange={(e) =>
                      handleCertificationChange(index, e)
                    }
                    className="w-full border rounded-lg p-3 mb-3"
                  />

                  <input
                    type="text"
                    name="organization"
                    placeholder="Issuing Organization"
                    value={certification.organization || ""}
                    onChange={(e) =>
                      handleCertificationChange(index, e)
                    }
                    className="w-full border rounded-lg p-3 mb-3"
                  />

                  <input
                    type="text"
                    name="date"
                    placeholder="Issue Date"
                    value={certification.date || ""}
                    onChange={(e) =>
                      handleCertificationChange(index, e)
                    }
                    className="w-full border rounded-lg p-3 mb-3"
                  />

                  <input
                    type="text"
                    name="credentialId"
                    placeholder="Credential ID"
                    value={certification.credentialId || ""}
                    onChange={(e) =>
                      handleCertificationChange(index, e)
                    }
                    className="w-full border rounded-lg p-3 mb-3"
                  />

                  <input
                    type="text"
                    name="url"
                    placeholder="Certificate URL"
                    value={certification.url || ""}
                    onChange={(e) =>
                      handleCertificationChange(index, e)
                    }
                    className="w-full border rounded-lg p-3"
                  />

                </div>
              )
            )}

            <button
              type="button"
              onClick={addCertification}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-5 py-3 rounded-lg"
            >
              + Add Certification
            </button>

            {/* ==============================
                LANGUAGES
            ============================== */}

            <hr className="my-8" />

            <h2 className="text-2xl font-bold mb-5">
              🌐 Languages
            </h2>

            {resume.languages.map((language, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 mb-5 bg-gray-50 relative"
              >

                <button
                  type="button"
                  onClick={() =>
                    removeLanguage(index)
                  }
                  className="absolute top-3 right-3 text-red-500 hover:text-red-700 text-sm font-semibold"
                >
                  Remove
                </button>

                <input
                  type="text"
                  name="name"
                  placeholder="Language"
                  value={language.name || ""}
                  onChange={(e) =>
                    handleLanguageChange(index, e)
                  }
                  className="w-full border rounded-lg p-3 mb-3"
                />

                <select
                  name="proficiency"
                  value={language.proficiency || ""}
                  onChange={(e) =>
                    handleLanguageChange(index, e)
                  }
                  className="w-full border rounded-lg p-3"
                >
                  <option value="">
                    Select Proficiency
                  </option>
                  <option value="Beginner">
                    Beginner
                  </option>
                  <option value="Intermediate">
                    Intermediate
                  </option>
                  <option value="Advanced">
                    Advanced
                  </option>
                  <option value="Fluent">
                    Fluent
                  </option>
                  <option value="Native">
                    Native
                  </option>
                </select>

              </div>
            ))}

            <button
              type="button"
              onClick={addLanguage}
              className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-3 rounded-lg"
            >
              + Add Language
            </button>

            {/* ==============================
                SAVE BUTTON
            ============================== */}

            <button
              type="button"
              onClick={handleSave}
              className="block mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              💾 Save Resume
            </button>

          </div>

          {/* ==================================================
              RIGHT SIDE - LIVE PREVIEW
          ================================================== */}

          <div className="bg-gray-50 rounded-xl shadow-lg p-6">

            <h2 className="text-2xl font-bold mb-6">
              👀 Live Resume Preview
            </h2>

            <div className="bg-white rounded-lg p-8 shadow">

              {/* ==============================
                  HEADER
              ============================== */}

              <div className="text-center">

                <h1 className="text-3xl font-bold">
                  {resume.fullName || "Your Name"}
                </h1>

                {resume.email && (
                  <p className="mt-2 text-gray-600">
                    {resume.email}
                  </p>
                )}

                {resume.phone && (
                  <p className="text-gray-600">
                    {resume.phone}
                  </p>
                )}

                {resume.address && (
                  <p className="text-gray-600">
                    {resume.address}
                  </p>
                )}

                <div className="mt-2 text-sm text-blue-600 space-x-3">

                  {resume.linkedin && (
                    <span>LinkedIn</span>
                  )}

                  {resume.github && (
                    <span>GitHub</span>
                  )}

                  {resume.portfolio && (
                    <span>Portfolio</span>
                  )}

                </div>

              </div>

              {/* ==============================
                  SUMMARY
              ============================== */}

              {resume.summary && (
                <>
                  <hr className="my-6" />

                  <h2 className="text-xl font-bold mb-3">
                    Professional Summary
                  </h2>

                  <p className="text-gray-700 whitespace-pre-wrap">
                    {resume.summary}
                  </p>
                </>
              )}

              {/* ==============================
                  EDUCATION
              ============================== */}

              <hr className="my-6" />

              <h2 className="text-xl font-bold mb-4">
                Education
              </h2>

              {resume.education.length === 0 ? (
                <p className="text-gray-500">
                  No education added.
                </p>
              ) : (
                resume.education.map((edu, index) => (
                  <div
                    key={index}
                    className="mb-5"
                  >

                    <h3 className="font-bold">
                      {edu.degree || "Degree"}
                    </h3>

                    <p>
                      {edu.college || "College"}
                    </p>

                    {edu.branch && (
                      <p>{edu.branch}</p>
                    )}

                    {(edu.cgpa || edu.year) && (
                      <p className="text-gray-600">
                        {edu.cgpa &&
                          `CGPA: ${edu.cgpa}`}

                        {edu.cgpa &&
                          edu.year &&
                          " | "}

                        {edu.year}
                      </p>
                    )}

                  </div>
                ))
              )}

              {/* ==============================
                  SKILLS
              ============================== */}

              <hr className="my-6" />

              <h2 className="text-xl font-bold mb-4">
                Skills
              </h2>

              {resume.skills.length === 0 ? (
                <p className="text-gray-500">
                  No skills added.
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">

                  {resume.skills.map(
                    (skill, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 px-3 py-1 rounded"
                      >
                        {skill}
                      </span>
                    )
                  )}

                </div>
              )}

              {/* ==============================
                  EXPERIENCE
              ============================== */}

              <hr className="my-6" />

              <h2 className="text-xl font-bold mb-4">
                Experience
              </h2>

              {resume.experience.length === 0 ? (
                <p className="text-gray-500">
                  No experience added.
                </p>
              ) : (
                resume.experience.map(
                  (experience, index) => (
                    <div
                      key={index}
                      className="mb-6"
                    >

                      <h3 className="font-bold text-lg">
                        {experience.role ||
                          "Job Role"}
                      </h3>

                      <p className="font-semibold">
                        {experience.company ||
                          "Company"}
                      </p>

                      {(experience.startDate ||
                        experience.endDate) && (
                        <p className="text-sm text-gray-500">
                          {experience.startDate}

                          {experience.startDate &&
                            experience.endDate &&
                            " - "}

                          {experience.endDate}
                        </p>
                      )}

                      {experience.description && (
                        <p className="mt-2 whitespace-pre-wrap text-gray-700">
                          {experience.description}
                        </p>
                      )}

                    </div>
                  )
                )
              )}

              {/* ==============================
                  PROJECTS
              ============================== */}

              <hr className="my-6" />

              <h2 className="text-xl font-bold mb-4">
                Projects
              </h2>

              {resume.projects.length === 0 ? (
                <p className="text-gray-500">
                  No projects added.
                </p>
              ) : (
                resume.projects.map(
                  (project, index) => (
                    <div
                      key={index}
                      className="mb-6"
                    >

                      <h3 className="font-bold text-lg">
                        {project.name ||
                          "Project Name"}
                      </h3>

                      {project.description && (
                        <p className="mt-1 text-gray-700 whitespace-pre-wrap">
                          {project.description}
                        </p>
                      )}

                      {project.technologies && (
                        <p className="mt-2 text-sm">
                          <strong>
                            Technologies:
                          </strong>{" "}
                          {project.technologies}
                        </p>
                      )}

                      {project.link && (
                        <p className="mt-1 text-blue-600 text-sm break-all">
                          {project.link}
                        </p>
                      )}

                    </div>
                  )
                )
              )}

              {/* ==============================
                  CERTIFICATIONS
              ============================== */}

              <hr className="my-6" />

              <h2 className="text-xl font-bold mb-4">
                Certifications
              </h2>

              {resume.certifications.length === 0 ? (
                <p className="text-gray-500">
                  No certifications added.
                </p>
              ) : (
                resume.certifications.map(
                  (certification, index) => (
                    <div
                      key={index}
                      className="mb-5"
                    >

                      <h3 className="font-bold">
                        {certification.name ||
                          "Certification Name"}
                      </h3>

                      {certification.organization && (
                        <p>
                          {certification.organization}
                        </p>
                      )}

                      {certification.date && (
                        <p className="text-sm text-gray-500">
                          {certification.date}
                        </p>
                      )}

                      {certification.credentialId && (
                        <p className="text-sm text-gray-600">
                          Credential ID:{" "}
                          {certification.credentialId}
                        </p>
                      )}

                      {certification.url && (
                        <p className="text-sm text-blue-600 break-all">
                          {certification.url}
                        </p>
                      )}

                    </div>
                  )
                )
              )}

              {/* ==============================
                  LANGUAGES
              ============================== */}

              <hr className="my-6" />

              <h2 className="text-xl font-bold mb-4">
                Languages
              </h2>

              {resume.languages.length === 0 ? (
                <p className="text-gray-500">
                  No languages added.
                </p>
              ) : (
                resume.languages.map(
                  (language, index) => (
                    <div
                      key={index}
                      className="mb-3"
                    >

                      <p>
                        <span className="font-semibold">
                          {language.name ||
                            "Language"}
                        </span>

                        {language.proficiency && (
                          <span className="text-gray-600">
                            {" - "}
                            {language.proficiency}
                          </span>
                        )}
                      </p>

                    </div>
                  )
                )
              )}

            </div>

          </div>

        </div>

      </div>
    </MainLayout>
  );
}

export default ResumeBuilder;