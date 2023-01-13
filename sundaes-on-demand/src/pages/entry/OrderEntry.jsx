import Options from "./Option";

export default function OrderEntry() {
  return (
    <div>
      <Options optionType={"scoop"} />
      <Options optionType={"topping"} />
    </div>
  );
}
