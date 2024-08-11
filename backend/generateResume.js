const path = require("path");
const fs = require("fs");
const Groq = require("groq-sdk");
require("dotenv").config();
var convertapi = require("convertapi")(process.env.CONVERT_API);
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
async function askgroq2(data) {
  const name = data.firstName;
  const email = data.email;
  const github = data.githubLink;
  const linkedin = data.linkedinLink;
  const skills = data.technicalSkills || [];
  const exp =
    data.workExperience && data.workExperience.length > 0
      ? data.workExperience[0]
      : "No work experience provided";
  const about = data.aboutMe || "";
  const projects = data.projects || [];
  const education = data.education || [];

  let prompt = `Please generate a detailed and well-structured professional resume document based on the following information:

1. **Name:** 
   - ${name}

2. **Contact Information:** 
   - Email: ${email}
   - GitHub: ${github}
   - LinkedIn: ${linkedin}

3. **Professional Summary:**
   - ${about}
   (Provide a concise and impactful summary that highlights the candidate's key strengths, experiences, and career objectives.)

4. **Technical Skills:**
   - ${skills.join(", ")}
   (List each skill separately, categorizing them if applicable. For example, group programming languages, frameworks, tools, etc., under appropriate headings.)

5. **Work Experience:**
   - ${exp}
   (For each role, include the job title, company name, location, dates of employment, and a bulleted list of key responsibilities and achievements. Use action verbs to describe achievements and quantify results where possible.)

6. **Projects:**
   - ${projects
     .map(
       (project) =>
         `**${project["title"]}**\n   - Description: Briefly describe the project's purpose and your contributions.\n   - Live Demo: [View Live](${project["deployedLink"]})\n   - Source Code: [GitHub Repo](${project["githubLink"]})`
     )
     .join("\n\n")}
   (Create a separate entry for each project, including the title, a brief description, and links to the live demo and source code. Emphasize the impact and technologies used.)

7. **Education:**
   - ${education
     .map(
       (ed) =>
         `**${ed["course"]}** - ${ed["educational_institution"]} (${ed["year"]})`
     )
     .join("\n")}
   (List educational qualifications, highlighting the degree, institution, and graduation year. If applicable, mention any honors, relevant coursework, or extracurricular activities.)

Please ensure the resume is formatted in a professional and clean layout, with appropriate section headings, consistent fonts, and clear spacing. The document should be ready for use in a job application for a technical position. Prioritize clarity, conciseness, and relevance in each section.`;

  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "llama3-70b-8192",
    //"model": "gemma2-9b-it",
    //"model": "mixtral-8x7b-32768",
    //"model": "llama3-groq-70b-8192-tool-use-preview",
    temperature: 1,
    max_tokens: 8192,
    top_p: 1,
    stream: true,
    stop: null,
  });

  let response = "";
  for await (const chunk of chatCompletion) {
    response += chunk.choices[0]?.delta?.content || "";
  }

  console.log(response);

  // Ensure the directory exists
  const pdfDir = path.join(__dirname, "resumepdf");
  if (!fs.existsSync(pdfDir)) {
    fs.mkdirSync(pdfDir);
  }
  
  fs.writeFile("resume.txt", response, async function (err) {
    if (err) {
      console.error("Error saving resume:", err);
      return;
    }
    console.log("Resume saved!");
  
    try {
      const result = await convertapi.convert("pdf", {
        File: path.join(__dirname, "resume.txt"),
      }, "txt");
      await result.saveFiles(path.join(pdfDir, "resume.pdf"));
      console.log("PDF converted and saved!");
    } catch (error) {
      console.error(error);
    }
  });
}

module.exports = askgroq2;
