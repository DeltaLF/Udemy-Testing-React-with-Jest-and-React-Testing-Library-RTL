import { createContext, useContext, useState } from "react";
import { pricePerItem } from "../constants";
const OrderDetails = createContext();

// create custom hook to check wehter we are in a provider
export function useOrderDetails() {
  const contextValue = useContext(OrderDetails);
  if (!contextValue) {
    throw new Error(
      "uesOrderDetails must be called from within an OrderDetailsProvider"
    );
  }
  return contextValue;
}

export function OrderDetailsProvider(props) {
  const [optionCounts, setOptionCounts] = useState({
    scoops: {}, // {Chocolate:1, Vanilla:3}
    toppings: {}, // {"Gummi Bears":5}
  });
  function updateItemCount(itemName, newItemCount, optionType) {
    // make a copy of optionsCount
    const newOptionCounts = { ...optionCounts };
    // update the optionsCount
    newOptionCounts[optionType][itemName] = newItemCount;
    // set the state with updated copy
    setOptionCounts(newOptionCounts);
  }
  function resetOrder() {
    setOptionCounts({ scoops: {}, toppings: {} });
  }
  // utility function to derive totals from optionCounts state value
  function calculateTotal(optionType) {
    let typekindCount = 0;
    for (let typeKind in optionCounts[optionType]) {
      typekindCount += optionCounts[optionType][typeKind];
    }
    return typekindCount * pricePerItem[optionType];
  }

  const totals = {
    scoops: calculateTotal("scoops"),
    toppings: calculateTotal("toppings"),
  };
  const value = {
    optionCounts,
    totals,
    updateItemCount,
    resetOrder,
  };
  return <OrderDetails.Provider value={value} {...props} />;
}
