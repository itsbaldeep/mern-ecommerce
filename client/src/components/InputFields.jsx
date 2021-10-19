import React from "react";
import { useField } from "formik";
import { Form, Button } from "react-bootstrap";

export const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Form.Group className="mb-3">
      <Form.Label htmlFor={field.name}>{label}</Form.Label>
      <Form.Control
        {...field}
        {...props}
        isValid={meta.touched && !meta.error}
        isInvalid={meta.touched && !!meta.error}
      />
      <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>
    </Form.Group>
  );
};

export const CheckBox = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Form.Group classname="mb-3">
      <Form.Check
        {...field}
        {...props}
        isValid={meta.touched && !meta.error}
        isInvalid={meta.touched && !!meta.error}
        label={label}
      />
      <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>
    </Form.Group>
  );
};

export const SelectField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Form.Group className="mb-3">
      <Form.Label htmlFor={field.name}>{label}</Form.Label>
      <select>
        {props.values.map((value) => (
          <option value={value}>{value}</option>
        ))}
      </select>
      <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>
    </Form.Group>
  );
};

export const FormButton = ({ label, ...props }) => {
  return (
    <Button style={{ width: "100%" }} className="my-2" {...props}>
      {label}
    </Button>
  );
};
