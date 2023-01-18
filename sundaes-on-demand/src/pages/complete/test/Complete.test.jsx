import { render, screen } from "../../../test-utils/testing-library-utils";
import Complete from "../Complete";
test("title, button exist", () => {
  render(<Complete />);
  const title = screen.getByText("Thank you");
  const newOrderButton = screen.getByRole("button", {
    name: /Create new order/i,
  });
});
