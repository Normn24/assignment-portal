import "@testing-library/jest-dom";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

beforeEach(() => {
  useRouter.mockReturnValue({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    pathname: "/",
    query: {},
    asPath: "/",
  });
});
