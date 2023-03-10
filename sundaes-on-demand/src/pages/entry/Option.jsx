import axios from "axios";
import { useEffect, useState } from "react";
import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";
import Row from "react-bootstrap/Row";
import AlertBanner from "../common/AlertBanner";
import { pricePerItem } from "../../constants";
import { formatCurrency } from "../../utilities";
import { useOrderDetails } from "../../context/OrderDetails";

export default function Options({ optionType }) {
  const [items, setItems] = useState([]);
  const [isServerError, setIsServerError] = useState(false);
  const { totals } = useOrderDetails();
  useEffect(() => {
    /**
     *  fix for strict mode:
     * in strict mode one component is mount twice
     * this cause unnecessary axios fetech and abort controller error
     *
     *  solution: add useRef to make should the fetch is only executed once
     */
    // option type is scoops or toppings
    // create an abortController to attach to network request
    const controller = new AbortController();
    axios
      .get(`http://localhost:3030/${optionType}`, {
        signal: controller.signal,
      })
      .then((response) => {
        setItems(response.data);
      })
      .catch((err) => {
        if (err.name === "CanceledError") return;
        setIsServerError(true);
      });
    // abort axios call on component unmount
    return () => {
      controller.abort();
    };
  }, [optionType]);

  if (isServerError) return <AlertBanner />;
  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;

  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();
  const optionItems = items.map((item) => {
    return (
      <ItemComponent
        key={item.name}
        name={item.name}
        imagePath={item.imagePath}
      />
    );
  });
  return (
    <>
      <h2>{title}</h2>
      <p> {formatCurrency(pricePerItem[optionType])} each </p>
      <p>
        {title} total: {formatCurrency(totals[optionType])}
      </p>
      <Row>{optionItems}</Row>
    </>
  );
}
