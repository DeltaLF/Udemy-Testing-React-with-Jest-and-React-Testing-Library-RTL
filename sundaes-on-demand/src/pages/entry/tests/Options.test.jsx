import { redner, render, screen } from "@testing-library/react";
import Options from "../Option";

test("displays image for each scoop option from server", async () => {
  render(<Options optionType="scoops" />);

  // find images (name of img is alt)
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);
  // confirm alt text of images
  const allText = scoopImages.map((element) => element.alt);
  expect(allText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});
