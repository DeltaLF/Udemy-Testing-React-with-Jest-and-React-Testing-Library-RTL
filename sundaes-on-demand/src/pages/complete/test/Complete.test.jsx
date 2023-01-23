import {
  findByText,
  render,
  screen,
} from "../../../test-utils/testing-library-utils";
import Complete from "../Complete";
import { server } from "../../../../mock/server";
import { rest } from "msw";
import { URL } from "../../../../mock/handlers";

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

test("Show alert for error when submitting order", async () => {
  // overwrite mock submit order API
  // or using resetHandlers
  server.use(
    rest.post(`${URL}order`, (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );
  render(<Complete setPhase={jest.fn()} />);
  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();
  const errorMessage = await screen.findByText(/An unexpected error occured/i);
  expect(errorMessage).toBeInTheDocument();
  expect(loading).not.toBeInTheDocument();
});
