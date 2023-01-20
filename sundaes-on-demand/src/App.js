import "./App.css";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import OrderEntry from "./pages/entry/OrderEntry";
import OrderSummary from "./pages/summary/OrderSummary";
import { OrderDetailsProvider } from "./context/OrderDetails";
import Button from "react-bootstrap/esm/Button";
import Complete from "./pages/complete/Complete";
const THREEPHASES = ["ENTRY", "REVIEW", "COMPLETE"];
function App() {
  const [phase, setPhase] = useState(0);
  return (
    <Container>
      <OrderDetailsProvider>
        {/* Summary page and entry page need provider */}
        {THREEPHASES[phase] === "ENTRY" && <OrderEntry setPhase={setPhase} />}
        {THREEPHASES[phase] === "REVIEW" && (
          <OrderSummary setPhase={setPhase} />
        )}
        {THREEPHASES[phase] === "COMPLETE" && <Complete setPhase={setPhase} />}
      </OrderDetailsProvider>
      {/*confirmation page doesn't need provider */}
    </Container>
  );
}

export default App;
