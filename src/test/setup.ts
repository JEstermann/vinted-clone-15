import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

vi.mock("../lib/userId", () => ({
  getUserId: vi.fn(() => "test-user-id"),
}));

vi.stubGlobal("import", {
  meta: {
    env: {
      VITE_USER_NAME: "Test User",
    },
  },
});
