import { useOrderDetails } from "../../context/OrderDetails";
import Button from "react-bootstrap/Button";
import { useEffect } from "react";
import axios from "axios";

export default function Complete({ setPhase }) {
  const { orderNumber, setOrderNumber, resetOrder, optionCounts } =
    useOrderDetails();
  function handleClick() {
    setOrderNumber(null);
    resetOrder();
    setPhase(0);
  }
  useEffect(() => {
    const controller = new AbortController();

    axios
      .post("http://localhost:3030/order", {
        optionCounts,
        signal: controller.signal,
      })
      .then((response) => {
        //orderNumber
        console.log(response.data);
        if (!!response.data.orderNumber) {
          setOrderNumber(response.data.orderNumber);
        }
        // updateItemCount(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      controller.abort();
    };
  }, []);
  return (
    <>
      <h2>Thank you</h2>
      <h4>
        {orderNumber === null
          ? "Loading..."
          : `Your order number is ${orderNumber.toString()}`}
      </h4>
      <Button style={{ marginTop: "1rem" }} onClick={handleClick}>
        Create new order
      </Button>
    </>
  );
}
