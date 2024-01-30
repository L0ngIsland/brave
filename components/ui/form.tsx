'use client'
import { useState } from "react";
import { ErrorForm, FormProps, FormRule } from "@/lib/types";
import styled from "styled-components";
import Button from "./button";
import Input from "./input";
import { isErrors, replaceValueForValidation, validate } from "@/lib/helpers";
import { List, ListItem } from "./list";
import { center, redColor } from "@/styles/consts";

export const FormConatainer = styled.form`
  ${center}
`;

export const Fieldset = styled.fieldset`
  border: none;
`;

export const Legend = styled.legend`
  margin-bottom: 10px;
  letter-spacing: 3px;
  font-size: larger;
`;

export const Label = styled.label`
  ${center};
  margin-bottom: 10px;
`;

const Error = styled.span`
  color: ${redColor};
`;

export const Form = ({ values, onSubmit, title, submitTrigger }: FormProps) => {
  const [formValues, setFormValues] = useState<{
    [key: string]: string;
  }>(Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: "" }), {}));
  const [errors, setErrors] = useState<ErrorForm>({});
  const handleChange = (
    { name, value }: EventTarget & HTMLInputElement,
    rules?: FormRule[]
  ) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (rules) {
      setErrors((prev) => ({
        ...prev,
        [name]: validate(replaceValueForValidation(value, name), rules),
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedErrors: ErrorForm = {};

    Object.entries(formValues).forEach(([key, value]: string[]) => {
      if (values[key].rules) {
        updatedErrors[key] = validate(
          replaceValueForValidation(value, key),
          values[key].rules as FormRule[]
        );
      }
    });

    setErrors(updatedErrors);
    if (!isErrors(updatedErrors)) {
      setFormValues(
        Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: "" }), {})
      );
      onSubmit(formValues);
    }
  };
  return (
    <>
      <FormConatainer onSubmit={handleSubmit}>
        <Fieldset>
          <Legend>{title}</Legend>
          {Object.entries(values).map(([key, { label, rules, ...attrs }]) => (
            <div key={key}>
              <Label>
                <Input
                  mask={attrs.mask || ""}
                  name={key}
                  value={formValues[key]}
                  onChange={(e) => handleChange(e.target, rules)}
                  {...attrs}
                />
                {label && label}
              </Label>
              {errors && isErrors(errors) && (
                <List>
                  {errors[key]?.map((err) => (
                    <ListItem key={key}>
                      <Error>{err}</Error>
                    </ListItem>
                  ))}
                </List>
              )}
            </div>
          ))}
          <Button>{submitTrigger}</Button>
        </Fieldset>
      </FormConatainer>
    </>
  );
};
