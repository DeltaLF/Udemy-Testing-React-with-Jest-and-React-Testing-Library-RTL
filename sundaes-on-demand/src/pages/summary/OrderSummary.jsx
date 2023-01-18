import React from "react";
import SummaryForm from "./SummaryForm";
import { useOrderDetails } from "../../context/OrderDetails";
import { formatCurrency } from "../../utilities";

export default function OrderSummary({ setPhase }) {
  const { totals, optionCounts } = useOrderDetails();
  const scoopArray = Object.entries(optionCounts.scoops); // [["chocolate",1]]
  const scoopList = scoopArray.map(([key, value]) => {
    return (
      <li key={key}>
        {value} {key}
      </li>
    );
  });
  const toppingArray = Object.entries(optionCounts.toppings);
  const toppingList = toppingArray.map(([key, value]) => {
    return (
      <li key={key}>
        {value} {key}
      </li>
    );
  });

  return (
    <div>
      <h1>OrderSummary</h1>
      <h2>Scoops: {formatCurrency(totals.scoops)} </h2>
      <ul>{scoopList}</ul>
      <h2>Toppings: {formatCurrency(totals.toppings)} </h2>
      <ul>{toppingList}</ul>
      <SummaryForm setPhase={setPhase} />
    </div>
  );
}
