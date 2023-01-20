import { render, screen } from "../../../test-utils/testing-library-utils";
import Complete from "../Complete";
test("title, button exist", () => {
  const { unmount } = render(<Complete setPhase={jest.fn()} />);
  const title = screen.getByText("Thank you");
  const newOrderButton = screen.getByRole("button", {
    name: /Create new order/i,
  });
  unmount();
});

test("show loading before respond from server", async () => {
  const { unmount } = render(<Complete />);

  const headerSync = screen.getByRole("heading", { name: /loading/i });
  expect(headerSync).toBeInTheDocument();
  const headerAsync = await screen.findByRole("heading", { name: /999/i });
  expect(headerAsync).toBeInTheDocument();

  const notLoading = screen.queryByText(/loading/i);
  expect(notLoading).not.toBeInTheDocument();
  unmount();
});
