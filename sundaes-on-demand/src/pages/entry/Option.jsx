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
    // option type is scoops or toppings
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => {
        setItems(response.data);
      })
      .catch((err) => {
        setIsServerError(true);
        // if (optionType === "toppings") {
        //   setItems([
        //     { name: "Cherries", imagePath: "/images/cherries.png" },
        //     { name: "M&Ms", imagePath: "/images/M&Ms.png" },
        //     { name: "Hot fudge", imagePath: "/images/hot-fudge.png" },
        //   ]);
        // } else if (optionType === "scoops") {
        //   setItems([
        //     { name: "Chocolate", imagePath: "/images/chocolate.png" },
        //     { name: "Vanilla", imagePath: "/images/vanilla.png" },
        //   ]);
        // }
      });
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
