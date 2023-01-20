import React from "react";
import SummaryForm from "./SummaryForm";
import { useOrderDetails } from "../../context/OrderDetails";
import { formatCurrency } from "../../utilities";
function parseOptionArray(optionArray) {
  return optionArray.map(([key, value]) => {
    return (
      <li key={key}>
        {value} {key}
      </li>
    );
  });
}
export default function OrderSummary({ setPhase }) {
  const { totals, optionCounts } = useOrderDetails();
  const scoopArray = Object.entries(optionCounts.scoops); // [["chocolate",1]]
  const scoopList = totals.scoops > 0 ? parseOptionArray(scoopArray) : [];
  const toppingArray = Object.entries(optionCounts.toppings);
  const toppingList = totals.toppings > 0 ? parseOptionArray(toppingArray) : [];

  return (
    <div>
      <h1>Order Summary</h1>
      {scoopList.length > 0 && (
        <>
          <h2>Scoops: {formatCurrency(totals.scoops)} </h2>
          <ul>{scoopList}</ul>
        </>
      )}
      {toppingList.length > 0 && (
        <>
          <h2>Toppings: {formatCurrency(totals.toppings)} </h2>
          <ul>{toppingList}</ul>
        </>
      )}

      <SummaryForm setPhase={setPhase} />
    </div>
  );
}
