import Options from "./Option";
import { formatCurrency } from "../../utilities";
import { useOrderDetails } from "../../context/OrderDetails";

export default function OrderEntry() {
  const { getGrandTotal } = useOrderDetails();
  return (
    <div>
      <Options optionType={"scoops"} />
      <Options optionType={"toppings"} />
      <h2> Grand total: {formatCurrency(getGrandTotal())} </h2>
    </div>
  );
}
