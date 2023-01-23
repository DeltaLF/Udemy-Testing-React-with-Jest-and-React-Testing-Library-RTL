import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import ScoopOption from "../ScoopOption";

test("valid scoop count value", async () => {
  render(
    <ScoopOption name={"chocolate"} imagePath={"/path/to/chocolate.png"} />
  );
  const user = userEvent.setup();
  const chocolate = await screen.findByRole("spinbutton", {
    name: /chocolate/i,
  });
  await user.type(chocolate, "-1");

  expect(chocolate).toHaveClass("is-invalid");
  await user.clear(chocolate);
  await user.type(chocolate, "1");
  expect(chocolate).not.toHaveClass("is-invalid");
  await user.type(chocolate, ".1");
  expect(chocolate).toHaveClass("is-invalid");
  await user.clear(chocolate);
  await user.type(chocolate, "5");
  expect(chocolate).not.toHaveClass("is-invalid");
  await user.clear(chocolate);
  await user.type(chocolate, "35");
  expect(chocolate).toHaveClass("is-invalid");
});
