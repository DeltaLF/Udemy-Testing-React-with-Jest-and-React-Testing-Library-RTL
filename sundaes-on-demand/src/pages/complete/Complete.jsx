import { useOrderDetails } from "../../context/OrderDetails";
import Button from "react-bootstrap/Button";

export default function Complete({ setPhase }) {
  const { orderNumber, setOrderNumber, resetOrder } = useOrderDetails();
  function handleClick() {
    setOrderNumber(0);
    resetOrder();
    setPhase(0);
  }
  return (
    <>
      <h2>Thank you</h2>
      <h4>{`Your order number is ${orderNumber.toString()}`}</h4>
      <Button style={{ marginTop: "1rem" }} onClick={handleClick}>
        Create new order
      </Button>
    </>
  );
}
