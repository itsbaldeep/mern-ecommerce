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
    <Form.Group className="mb-3">
      <Form.Check
        checked={field.value}
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

export const CheckBoxOptions = ({ label, options, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <div>
        {options.map((opt, index) => (
          <Form.Check
            {...field}
            {...props}
            className="form-check-inline"
            key={index}
            isValid={meta.touched && !meta.error}
            isInvalid={meta.touched && !!meta.error}
            type="checkbox"
            value={opt}
            label={opt}
          />
        ))}
      </div>
    </Form.Group>
  );
};

export const SelectField = ({ label, options, defaultValue, ...props }) => {
  const [field, meta] = useField(props);
  const classes = `form-control ${meta.touched && !meta.error ? "is-valid" : ""}`;
  return (
    <Form.Group className="mb-3">
      <Form.Label htmlFor={field.name}>{label}</Form.Label>
      <select className={classes} {...field} {...props}>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
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
