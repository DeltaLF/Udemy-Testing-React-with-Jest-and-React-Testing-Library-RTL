import Options from "./Option";
import { formatCurrency } from "../../utilities";
import { useOrderDetails } from "../../context/OrderDetails";
import Button from "react-bootstrap/Button";

export default function OrderEntry({ setPhase }) {
  const { getGrandTotal, totals } = useOrderDetails();
  const scoopstotal = totals.scoops;
  return (
    <div>
      <Options optionType={"scoops"} />
      <Options optionType={"toppings"} />
      <h2> Grand total: {formatCurrency(getGrandTotal())} </h2>
      <Button
        variant="warning"
        disabled={!totals || scoopstotal === 0}
        style={{ marginTop: "1rem" }}
        onClick={() => {
          setPhase(1);
        }}
      >
        Check order
      </Button>
    </div>
  );
}
