import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import { useOrderDetails } from "../../context/OrderDetails";

export default function ScoopOption({ name, imagePath }) {
  const { updateItemCount } = useOrderDetails();
  const handleChange = (e) => {
    updateItemCount(name, parseInt(e.target.value), "scoops");
  };
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        alt={`${name} scoop`}
        src={`http://localhost:3030/${imagePath}`}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: "10px" }}
      >
        <Form.Label column xs="6" style={{ textAlign: "right" }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: "left" }}>
          <Form.Control
            type="number"
            defaultValue={0}
            onChange={handleChange}
          ></Form.Control>
        </Col>
      </Form.Group>
    </Col>
  );
}