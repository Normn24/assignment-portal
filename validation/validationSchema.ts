import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required."),
  email: Yup.string()
    .email("Invalid email format.")
    .required("Email is required."),
  assignment_description: Yup.string()
    .min(10, "Assignment description must be at least 10 characters.")
    .required("Assignment description is required."),
  github_repo_url: Yup.string()
    .url("GitHub repository URL must be a valid URL.")
    .required("GitHub repository URL is required."),
  candidate_level: Yup.string().required("Candidate level is required."),
});

export default validationSchema;