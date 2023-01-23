import { render, screen } from "../../../test-utils/testing-library-utils";
import Options from "../Option";
import userEvent from "@testing-library/user-event";

test("displays image for each scoop option from server", async () => {
  render(<Options optionType="scoops" />);

  // find images (name of img is alt)
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);
  // confirm alt text of images
  const allText = scoopImages.map((element) => element.alt);
  expect(allText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("displays image for each tooping option from server", async () => {
  render(<Options optionType="toppings" />);
  const toppingImgs = await screen.findAllByRole("img", { name: /topping$/i });
  expect(toppingImgs).toHaveLength(3);
  const allText = toppingImgs.map((item) => item.alt);
  expect(allText).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});

test("do not update scoops total for invalid input", async () => {
  render(<Options optionType="scoops" />);
  const user = userEvent.setup();
  const scoopsTotal = screen.getByText(/Scoops total: \$/i);
  expect(scoopsTotal).toHaveTextContent("$0.00");
  // total updated if input is valid

  const chocolate = await screen.findByRole("spinbutton", {
    name: /chocolate/i,
  });

  await user.type(chocolate, "-5");
  expect(scoopsTotal).toHaveTextContent("$0.00");

  await user.clear(chocolate);
  await user.type(chocolate, "3");
  expect(scoopsTotal).toHaveTextContent("$6.00");
  // not update
  await user.type(chocolate, "30");
  expect(scoopsTotal).toHaveTextContent("$6.00");
  await user.clear(chocolate);
  await user.type(chocolate, "5");
  expect(scoopsTotal).toHaveTextContent("$10.00");
});
