import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

export default function SummaryForm({ setPhase }) {
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
    setPhase(2);
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
    </Form>
  );
}
