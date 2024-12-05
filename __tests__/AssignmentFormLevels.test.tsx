import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AssignmentForm from "@/components/AssignmentForm";
import { fetchCandidateLevels, submitAssignment } from "../lib/api";

jest.mock("../lib/api", () => ({
  fetchCandidateLevels: jest.fn() as jest.Mock<Promise<any>>, 
  submitAssignment: jest.fn(),
}));

describe("AssignmentForm Component", () => {
  beforeEach(() => {
    fetchCandidateLevels.mockResolvedValue(["Junior", "Mid", "Senior"]);
    submitAssignment.mockResolvedValue({ success: true });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders candidate levels in dropdown on successful API fetch", async () => {
    const mockLevels = ["Junior", "Mid", "Senior"];
    fetchCandidateLevels.mockResolvedValue(mockLevels);
  
    render(<AssignmentForm />);

    await waitFor(() => {
      const dropdown = screen.getByRole("combobox", { name: /candidate level/i });
      expect(dropdown).toBeInTheDocument();

      const options = screen.getAllByRole("option");
      expect(options).toHaveLength(mockLevels.length + 1);
      expect(options[1].textContent).toBe("Junior");
      expect(options[2].textContent).toBe("Mid");
      expect(options[3].textContent).toBe("Senior");
    });
  });
  
  test("renders all form fields correctly", async () => {
    render(<AssignmentForm />);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/assignment description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/github repository url/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/candidate level/i)).toBeInTheDocument();
  });

  test("disables the submit button if required fields are missing", () => {
    render(<AssignmentForm />);

    const submitButton = screen.getByRole("button", { name: /submit/i });
    expect(submitButton).toBeDisabled();

    userEvent.type(screen.getByLabelText(/name/i), "TestName");
    expect(submitButton).toBeDisabled(); 
  });
});
