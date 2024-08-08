import React, { useRef } from "react";
import { IoIosReturnRight } from "react-icons/io";

function Formportfolio() {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const githubLinkRef = useRef();
  const linkedinLinkRef = useRef();
  const technicalSkillsRef = useRef();
  const aboutMeRef = useRef();
  const projectsRef = useRef();
  const educationRef = useRef();
  const workExperienceRef = useRef();

  const handleSubmit = () => {
    const formData = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      email: emailRef.current.value,
      githubLink: githubLinkRef.current.value,
      linkedinLink: linkedinLinkRef.current.value,
      technicalSkills: technicalSkillsRef.current.value,
      aboutMe: aboutMeRef.current.value,
      projects: projectsRef.current.value,
      education: educationRef.current.value,
      workExperience: workExperienceRef.current.value,
    };

    fetch("http://localhost:3000/userData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center ">
      <h1 className="text-4xl mb-6 ">Enter the Details: </h1>
      <form method="post" className="w-full mb-10 max-w-3xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <label htmlFor="firstName" className="mb-1">
              First Name
            </label>
            <input
              ref={firstNameRef}
              id="firstName"
              type="text"
              placeholder="Enter your first name"
              className="px-7 py-2 border rounded text-black "
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="lastName" className="mb-1">
              Last Name
            </label>
            <input
              ref={lastNameRef}
              id="lastName"
              type="text"
              placeholder="Enter your last name"
              className="px-7 py-2 border rounded text-black"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1">
            Email
          </label>
          <input
            ref={emailRef}
            id="email"
            type="email"
            placeholder="Enter your email"
            className="p-2 border rounded text-black "
          />
        </div>

        <div className="flex justify-between items-center ">
          <div className="flex flex-col">
            <label htmlFor="githubLink" className="mb-1">
              GitHub Link
            </label>
            <input
              ref={githubLinkRef}
              id="githubLink"
              type="url"
              placeholder="GitHub profile link"
              className="px-7 py-2 border rounded text-black  "
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="linkedinLink" className="mb-1">
              LinkedIn Link
            </label>
            <input
              ref={linkedinLinkRef}
              id="linkedinLink"
              type="url"
              placeholder="LinkedIn profile link"
              className="px-7 py-2 border rounded text-black "
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="technicalSkills" className="mb-1">
            Technical Skills
          </label>
          <input
            ref={technicalSkillsRef}
            id="technicalSkills"
            type="text"
            placeholder="List your technical skills"
            className="p-2 border rounded text-black "
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="aboutMe" className="mb-1">
            About Me
          </label>
          <input
            ref={aboutMeRef}
            id="aboutMe"
            type="text"
            placeholder="Write a short bio about yourself"
            className="p-2 border rounded text-black "
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="projects" className="mb-1">
            Projects
          </label>
          <input
            ref={projectsRef}
            id="projects"
            type="text"
            placeholder="Describe your projects"
            className="p-2 border rounded text-black "
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="education" className="mb-1">
            Education
          </label>
          <input
            ref={educationRef}
            id="education"
            type="text"
            placeholder="Enter your education details"
            className="p-2 border rounded text-black "
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="workExperience" className="mb-1">
            Work Experience
          </label>
          <input
            ref={workExperienceRef}
            id="workExperience"
            type="text"
            placeholder="List your work experience"
            className="p-2 border rounded text-black "
          />
        </div>
      </form>
      <div
        id="submitBtn"
        onClick={handleSubmit}
        className="w-44 px-4 py-2 flex items-center justify-between bg-zinc-100 rounded-full hover:scale-105 hover:duration-150 text-black cursor-pointer"
      >
        <span className="text-sm ">Create </span>
        <IoIosReturnRight />
      </div>
    </div>
  );
}

export default Formportfolio;