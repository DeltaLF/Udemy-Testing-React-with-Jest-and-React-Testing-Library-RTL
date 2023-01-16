import "./App.css";
import Container from "react-bootstrap/Container";
import OrderEntry from "./pages/entry/OrderEntry";
import { OrderDetailsProvider } from "./context/OrderDetails";

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        {/* SUmmary page and entry page need provider */}
        <OrderEntry />
      </OrderDetailsProvider>
      {/*confirmation page doesn't need provider */}
    </Container>
  );
}

export default App;
