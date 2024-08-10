import { z } from 'zod';

export const ResumeDataSchema = z.object({
    firstName: z.string().nonempty({ message: "First name is required." }),
    lastName: z.string().nonempty({ message: "Last name is required." }),
    email: z.string().email({ message: "Invalid email address." }),
    githubLink: z.string().url({ message: "Invalid GitHub link." }),
    linkedinLink: z.string().url({ message: "Invalid LinkedIn link." }),
    technicalSkills: z.array(z.string()).nonempty({
      message: "Technical skills should be an array of strings.",
    }),
    workExperience: z.array(z.string()),
    aboutMe: z.string().nonempty({ message: "About me section is required." }),
    projects: z.array(
        z.object({
            title: z.string().nonempty({ message: "Project title is required." }),
            githubLink: z.string().url({ message: "Invalid project GitHub link." }),
            deployedLink: z.string().url().optional(),
        })
    ).nonempty({ message: "At least one project is required." }),
    education: z.array(
        z.object({
            academy: z.string().nonempty({ message: "Academy is required." }),
            year: z.string().nonempty({ message: "Year is required." }),
            educational_institution: z.string().nonempty({ message: "Educational institution is required." }),
        })
    ).nonempty({ message: "At least one education record is required." }),
});
