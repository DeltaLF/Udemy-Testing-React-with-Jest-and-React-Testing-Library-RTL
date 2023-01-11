import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function SummaryForm() {
  const [isChecked, setIsChecked] = useState(false);
  const checkboxLabel = (
    <span>
      I agree to <span className="text-primary">Terms and Conditions</span>
    </span>
  );
  return (
    <Form>
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
      <Button variant="primary" type="submit" disabled={!isChecked}>
        Confirm order
      </Button>
    </Form>
  );
}