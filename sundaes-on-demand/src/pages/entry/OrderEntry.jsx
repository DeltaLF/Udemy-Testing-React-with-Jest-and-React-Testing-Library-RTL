import Options from "./Option";

export default function OrderEntry() {
  return (
    <div>
      <Options optionType={"scoops"} />
      <Options optionType={"toppings"} />
    </div>
  );
}
