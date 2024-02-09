import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import * as servicesImage from "../../src/services/images";
import ImageUpload from "../../src/components/Profile/ImageUpload";


const testID = "1234";

describe("ImageUpload component renders correctly", () => {
  test("ImageUpload component renders all elements", () => {
    render(<ImageUpload id={testID}/>);
    expect(screen.getByRole("input")).toBeInTheDocument();
  });
});