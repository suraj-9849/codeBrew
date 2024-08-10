const fs = require("fs");
const Groq = require("groq-sdk");
require("dotenv").config();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function askgroq(data) {
  let response = "";

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

  let prompt = `Generate me the HTML and CSS code (HTML and CSS in the same file, i.e., inline css) for a simple, single-page portfolio website for a developer using the following information:

  *Name:* ${name}
  
  *About:* "${about}"
  
  *Skills:* `;
  prompt += skills.join(", ");
  prompt += ` (List each skill as a small card. Use Bootstrap icons CDN link if needed. Keep the cards compact and small.)
  
  *Projects and their links and repos:* `;
  projects.forEach((project) => {
    prompt += `Name: ${project.title}, Link: ${project.deployedLink}, Repo: ${project.githubLink}. `;
  });
  prompt += `(Make a card for each project with buttons to the link and repo if available. The cards should be in a grid layout, horizontal first. Overflow into vertical if the width is less than 400 px.)
  
  *Education:* `;
  education.forEach((ed) => {
    prompt += `Year passed out: ${ed.year}, Course: ${ed.course}, Institute: ${ed.educational_institution}. `;
  });
  prompt += `(List educational qualifications properly in sequential order. Course should be highlighted, then the institution, and year passed out. Structure it well.)
  
  *Work Experience:* ${exp}
  
  *Socials:* Add the links to the socials of the developer with icons at the end of the site for each of these links. Include Email: ${email}, Github: ${github}, and LinkedIn: ${linkedin}. The social links should be added without section titles. Add these as buttons with decent styling, no default HTML styles. Use Tailwind CDN for responsiveness and visual appeal.
  
  Make sure to add a title for each section on a separate line above where the section starts. Do not forget the title of the portfolio site. Turn all links into buttons with spacing. Style the buttons and make them look decent and not default HTML. Use Tailwind CDN to make the site responsive and attractive. Include borders or visual distinction from the background. Ensure skills cards have a hover effect. Remove underlines from project links. Keep education as a bulleted list. Center the project cards and skills cards, but not the section titles. Start and end the entire code block between three backticks. I need a visually stunning HTML page with all this necessary information and a highly interactive portfolio website. The website should include the following sections:`;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
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

    for await (const chunk of chatCompletion) {
      response += chunk.choices[0]?.delta?.content || "";
    }

    console.log("Complete Response:", response);

    const match = response.match(/([^`]*)/);
    if (match) {
      const code = match[1];

      fs.writeFile("test.html", code, function (err) {
        if (err) {
          console.error("Error writing file:", err);
        } else {
          console.log("File saved!");
        }
      });
    } else {
      console.error("Code block not found in response.");
    }
  } catch (error) {
    console.error("Error generating HTML:", error);
  }
}

module.exports = askgroq;