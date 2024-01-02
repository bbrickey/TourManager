import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import TourDashboard from "../components/TourDashboard";
import { useSession } from "next-auth/react";

const mockOpenModal = jest.fn();

describe("Tour Dashboard", () => {
  describe("Render", () => {
    test("should render component", () => {
      render(<TourDashboard />);
      const comp = screen.getByTestId("tour-dashboard");
      expect(comp).toBeInTheDocument();
    });

    test("should render tour button", () => {
      render(<TourDashboard />);
      const tour = screen.getByTestId("tour-button");
      expect(tour).toBeInTheDocument();
    });

    test("should render event button", () => {
      render(<TourDashboard />);
      const event = screen.getByTestId("event-button");
      expect(event).toBeInTheDocument();
    });
  });
});
