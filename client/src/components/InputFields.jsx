import React from "react";
import { useField, FieldArray, Field } from "formik";
import { Form, Button, Row, Col } from "react-bootstrap";

import { days } from "config.json";

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
          <Field
            name={props.name}
            key={index}
            as={Form.Check}
            className="form-check-inline"
            checked={field.value.includes(opt)}
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

export const SelectField = ({ label, options, ...props }) => {
  const [field, meta] = useField(props);
  const classes = `form-control ${
    meta.touched && meta.error ? "is-invalid" : `${meta.touched && !meta.error ? "is-valid" : ""}`
  }`;
  return (
    <Form.Group className="mb-3">
      {label && <Form.Label htmlFor={field.name}>{label}</Form.Label>}
      <select className={classes} {...field} {...props}>
        {options.map((opt, index) => (
          <option key={index} value={opt}>
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

const FieldArrayInput = ({ label, size, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Form.Group className="mb-2">
      <Form.Control
        {...field}
        {...props}
        rows={1}
        size={size}
        isValid={meta.touched && !meta.error}
        isInvalid={meta.touched && !!meta.error}
      />
      <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>
    </Form.Group>
  );
};

export const TextArrayField = ({ label, placeholder, message, size = "md", ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Form.Group>
      <FieldArray name={props.name}>
        {({ push, remove }) => (
          <div>
            <div className="d-flex justify-content-between">
              <Form.Label>{label}</Form.Label>
              <Button
                variant="success"
                size={size}
                onClick={(e) => {
                  e.preventDefault();
                  push("");
                }}
              >
                Add
              </Button>
            </div>
            <p className="text-danger">{typeof meta.error === "string" ? meta.error : ""}</p>
            {field.value.map((_, index) => {
              return (
                <Row key={index}>
                  <Col xs={10}>
                    <FieldArrayInput
                      name={`${field.name}.${index}`}
                      placeholder={placeholder}
                      size={size}
                    />
                  </Col>
                  <Col xs={2} className="d-flex flex-row-reverse">
                    <Form.Group>
                      <Button
                        variant="danger"
                        size={size}
                        onClick={(e) => {
                          e.preventDefault();
                          remove(index);
                        }}
                      >
                        Remove
                      </Button>
                    </Form.Group>
                  </Col>
                </Row>
              );
            })}
          </div>
        )}
      </FieldArray>
      {field.value.length === 0 && <p className="mt-3 text-muted">{message}</p>}
    </Form.Group>
  );
};

export const TextArrayOfObjectsField = ({
  label,
  placeholder,
  message,
  keys,
  fieldType,
  size = "md",
  ...props
}) => {
  const [field, meta] = useField(props);
  const colSize = Math.ceil(10 / keys.length);
  return (
    <Form.Group className="mb-3">
      <FieldArray name={props.name}>
        {({ push, remove }) => (
          <div>
            <div className="d-flex justify-content-between">
              <Form.Label>{label}</Form.Label>
              <Button
                variant="success"
                size={size}
                onClick={(e) => {
                  e.preventDefault();
                  push(Object.assign({}, ...Array.from(keys, (k) => ({ [k]: "" }))));
                }}
              >
                Add
              </Button>
            </div>
            <p className="text-danger">{typeof meta.error === "string" ? meta.error : ""}</p>
            {field.value.map((_, index) => {
              return (
                <Row key={index}>
                  {keys.map((key) => (
                    <Col xs={12} sm={colSize} key={key}>
                      <FieldArrayInput
                        name={`${field.name}.${index}.${key}`}
                        placeholder={placeholder?.[key]}
                        as={fieldType?.[key] || "input"}
                        rows={3}
                        size={size}
                      />
                    </Col>
                  ))}
                  <Col
                    xs={12}
                    sm={colSize * 4 <= 12 ? 12 : 2}
                    className="d-flex flex-row-reverse mb-2"
                  >
                    <Form.Group>
                      <Button
                        variant="danger"
                        size={size}
                        onClick={(e) => {
                          e.preventDefault();
                          remove(index);
                        }}
                      >
                        Remove
                      </Button>
                    </Form.Group>
                  </Col>
                </Row>
              );
            })}
          </div>
        )}
      </FieldArray>
      {field.value.length === 0 && <p className="mt-3 text-muted">{message}</p>}
    </Form.Group>
  );
};

export const TimingsField = ({ label, size = "md", ...props }) => {
  const [field] = useField(props);
  return (
    <Form.Group className="mb-3">
      <FieldArray name={props.name}>
        <>
          <Form.Label>{label}</Form.Label>
          {field.value.map((_, index) => (
            <div key={index}>
              <p className="mb-1">{days[index]}</p>
              <Row className="mt-1">
                <Col md={6}>
                  <FieldArrayInput name={`${field.name}.${index}.from`} type="time" size={size} />
                </Col>
                <Col md={6}>
                  <FieldArrayInput name={`${field.name}.${index}.to`} type="time" size={size} />
                </Col>
              </Row>
            </div>
          ))}
        </>
      </FieldArray>
    </Form.Group>
  );
};
