import { InputProps } from "../types/formTypes";
import {Field, ErrorMessage } from "formik";

const InputField = ({ label, name, type = "text", as }: InputProps) => (
  <div>
    <label htmlFor={name} className="label-text">{label}</label>
    <Field
      id={name}
      as={as}
      type={type}
      name={name}
      className="input-field"
    />
    <ErrorMessage name={name} component="p" className="error-message" />
  </div>
);

export default InputField;
