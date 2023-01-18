import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { useOrderDetails } from "../../context/OrderDetails";

export default function SummaryForm({ setPhase }) {
  const { optionCounts, setOrderNumber } = useOrderDetails();
  const [isShow, setIsShow] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>
        <p>no ice cream will actually be delivered</p>{" "}
      </Popover.Body>
    </Popover>
  );

  const checkboxLabel = (
    <span>
      I agree to
      <OverlayTrigger placement="right" overlay={popover}>
        <span className="text-primary">Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );
  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:3030/order", { optionCounts })
      .then((response) => {
        //orderNumber
        console.log(response.data);
        if (!!response.data.orderNumber) {
          setOrderNumber(response.data.orderNumber);
        }
        // updateItemCount(response.data);
        setPhase(2);
      })
      .catch((err) => {
        console.log(err);
        setIsShow(true);
      });
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          id="term-condition"
          checked={isChecked}
          onChange={(e) => {
            setIsChecked(e.target.checked);
          }}
          label={checkboxLabel}
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        disabled={!isChecked}
        style={{ marginTop: "1rem" }}
      >
        Confirm order
      </Button>
      <Modal
        show={isShow}
        style={{ color: "red" }}
        onHide={() => {
          setIsShow(false);
        }}
      >
        <Modal.Header>
          <h3>Fail to submit</h3>
        </Modal.Header>
        <Modal.Body>
          <div style={{ margin: "2rem" }}>
            <p>Something went wrong, please resubmit again!</p>{" "}
          </div>
        </Modal.Body>
      </Modal>
    </Form>
  );
}
