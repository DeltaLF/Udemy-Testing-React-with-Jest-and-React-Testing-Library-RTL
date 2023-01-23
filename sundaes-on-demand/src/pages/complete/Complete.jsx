import { useOrderDetails } from "../../context/OrderDetails";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import AlertBanner from "../common/AlertBanner";

export default function Complete({ setPhase }) {
  const [isServerError, setIsServerError] = useState(false);
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
        setIsServerError(true);
        console.log(err);
      });
    return () => {
      controller.abort();
    };
  }, []);
  return (
    <>
      {isServerError ? (
        <AlertBanner />
      ) : (
        <>
          <h2>Thank you</h2>
          <h4>
            {orderNumber === null
              ? "Loading..."
              : `Your order number is ${orderNumber.toString()}`}
          </h4>
        </>
      )}

      <Button style={{ marginTop: "1rem" }} onClick={handleClick}>
        Create new order
      </Button>
    </>
  );
}
