const Groq = require("groq-sdk");
const fs = require("fs");
const groq = new Groq({apiKey: "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"});
let response = "";
async function askgroq(data) {
    //prompt making -------
    let name = data.firstName;
    let email = data.email;
    let github = data.githubLink;
    let linkedin = data.linkedinLink;
    let skills = data.technicalSkills;
    let exp = data.workExperience[0];
    let about = data.aboutMe; 

    let projects = data.projects;
    let education = data.education;

    let prompt = `Generate me the HTML and CSS code (HTML and CSS in the same file, i.e. inline css) for a simple, single page, portfolio website for a developer using the following information: Name: ${name}, About: "${about}", Skills:"` 

    skills.forEach(skill => {
    prompt+=(skill+",");
    });
    prompt+= `" (List out the as a small card for each. Use bootstrap icons cdn link if needed. But keep the cards compact and small), Projects and their links, and repos: "`;

    projects.forEach(project => {
    prompt+=(`name: ${project["title"]}, link: ${project["deployedLink"]}, repo: ${project["githubLink"]}`);
    });
    prompt+= `" (Make a card for each project and buttons to the link and repo if it exists. The cards should be in a grid layout. Horizontal first. If the width becomes less than 400 px, overflow into vertical.), Education: "`;
    education.forEach(ed=>{
    prompt+=(`Year passed out: ${ed["year"]}, Course: ${ed["academy"]}, Institute: ${ed["educational_institution"]}`);
    })
    prompt+= `" (List out educational qualifications properly in a sequential manner. Course should be highlighted, then the instituted and year passed out. It should be structured), Then also add a section detailing past work experience if any: ${exp} Socials: `;

    prompt+= ` Make sure to add the links to the socials of the developer. Add social icons at the end of the site for each of these links. Add the link in the form of a related icon for each one of the links **NO NEED TO ADD SECTION TITLE to the social links section. The links would include Email: ${email}, Github: ${github}, and Linkedin: ${linkedin} THE SOCIAL LINKS NEED TO BE ADDED. DO NOT SKIP THEM. I want both the html code and css code to be generated in one file **NO EXTERNAL STYLESHEET!**. And the links should work. Make it a bit more modern and most importantly, has to be **responsive**. **TITLE for each sectioon has to be present, but on a seperate line above the section starts**. **DO NOT FORGET THE TITLE of the portfolio site. And turn all the links into buttons with some spacing. Style the buttons and make them look decent and not default HTML. Use tailwind cdn to make it more responsive and look good. Include borders or some visual distinction from the foreground to the background as well. Make the skills cards attractive by adding a hover effect. Remove underline for the links: view live, view repo. Do not change education. Keep it as a bulleted list. Try to center the cards and the project cards, but not the section titles. Make sure to start and end the entire code block between three backticks. I need a visually stunning HTML PAGE containing all this necessary information and highly interactive Portfolio website. The website should include the following sections:`;



    const chatCompletion = await groq.chat.completions.create({
        "messages": [
        {
            "role": "user",
            "content": prompt,
        }
        ],
        "model": "llama3-70b-8192",
        //"model": "gemma2-9b-it",
        //"model": "mixtral-8x7b-32768",
        //"model": "llama3-groq-70b-8192-tool-use-preview",
        "temperature": 1,
        "max_tokens": 8192,
        "top_p": 1,
        "stream": true,
        "stop": null
    });
    
    for await (const chunk of chatCompletion) {
        response+=(chunk.choices[0]?.delta?.content || '');
    }
    console.log(response);
    const code = (response.match(/```([^`]*)```/))[1]
    console.log(code);
    fs.writeFile('test.html', code, function (err) {
        if (err) throw err;
        console.log('Saved!');
      }); 
}
module.exports = askgroq;