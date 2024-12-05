import validationSchema from "validation/validationSchema";

describe("Validation Schema", () => {
  test("should return error if name is missing", async () => {
    await expect(
      validationSchema.validate(
        {
          name: "",
          email: "test@email.com",
          assignment_description: "Valid description",
          github_repo_url: "http://github.com",
          candidate_level: "Junior",
        },
        { abortEarly: false }
      )
    ).rejects.toThrow("Name is required.");
  });

  test("should return error if email format is invalid", async () => {
    await expect(
      validationSchema.validate(
        {
          name: "TestName",
          email: "invalidemail",
          assignment_description: "Valid description",
          github_repo_url: "http://github.com",
          candidate_level: "Junior",
        },
        { abortEarly: false }
      )
    ).rejects.toThrow("Invalid email format.");
  });

  test("should return error if assignment description is too short", async () => {
    await expect(
      validationSchema.validate(
        {
          name: "TestName",
          email: "test@email.com",
          assignment_description: "Short",
          github_repo_url: "http://github.com",
          candidate_level: "Junior",
        },
        { abortEarly: false }
      )
    ).rejects.toThrow("Assignment description must be at least 10 characters.");
  });

  test("should return error if github repository url is invalid", async () => {
    await expect(
      validationSchema.validate(
        {
          name: "TestName",
          email: "test@email.com",
          assignment_description: "Valid description",
          github_repo_url: "invalid-url",
          candidate_level: "Junior",
        },
        { abortEarly: false }
      )
    ).rejects.toThrow("GitHub repository URL must be a valid URL.");
  });

  test("should return error if candidate level is missing", async () => {
    await expect(
      validationSchema.validate(
        {
          name: "TestName",
          email: "test@email.com",
          assignment_description: "Valid description",
          github_repo_url: "http://github.com",
          candidate_level: "",
        },
        { abortEarly: false }
      )
    ).rejects.toThrow("Candidate level is required.");
  });

  test("should pass validation if all fields are valid", async () => {
    await expect(
      validationSchema.validate({
        name: "TestName",
        email: "test@email.com",
        assignment_description: "Valid description",
        github_repo_url: "http://github.com",
        candidate_level: "Junior",
      })
    ).resolves.toEqual({
      name: "TestName",
      email: "test@email.com",
      assignment_description: "Valid description",
      github_repo_url: "http://github.com",
      candidate_level: "Junior",
    });
  });
});
