import { rest } from "msw";

const URL = "http://localhost:3030/";

export const handlers = [
  rest.get(`${URL}scoops`, (req, res, ctx) => {
    return res(
      ctx.json([
        { name: "Chocolate", imagePath: "/images/chocolate.png" },
        { name: "Vanilla", imagePath: "/images/vanilla.png" },
      ])
    );
  }),
  rest.get(`${URL}toppings`, (req, res, ctx) => {
    return res(
      ctx.json([
        { name: "Cherries", imagePath: "/images/cherries.png" },
        { name: "M&Ms", imagePath: "/images/M&Ms.png" },
        { name: "Hot fudge", imagePath: "/images/hot-fudge.png" },
      ])
    );
  }),
  rest.post(`${URL}order`, (req, res, ctx) => {
    return res(ctx.json({ orderNumber: 999 }));
  }),
];
