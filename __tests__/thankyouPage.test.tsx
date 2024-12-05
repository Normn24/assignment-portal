import { render, screen, waitFor } from "@testing-library/react";
import ThankYouPage from "../app/thank-you/page"; 

describe("ThankYouPage", () => {
  test("displays the correct confirmation message", async () => {
    render(<ThankYouPage />); 

    await waitFor(() => {
      const confirmationMessage = screen.getByText(/thank you for submitting your assignment!/i); 
      expect(confirmationMessage).toBeInTheDocument(); 
    });
  });
});
