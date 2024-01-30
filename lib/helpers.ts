'use client'
import { ErrorForm, FormRule } from "@/lib/types";

export const fetchData = async (endpoint: string, options: RequestInit) => {
  return fetch(process.env.NEXT_PUBLIC_API + endpoint, options)
    .then(async (response) => {
      if (!response.ok) {
        const error = await response.json();
        throw JSON.stringify(error);
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
};
export const replaceValueForValidation = (value: string, type: string) => {
  return type === "phone" ? value.replace(/\((\d{3})\)/, "$1") : value;
};
export const validate = (value: string, rules: FormRule[]) => {
  return rules.map(({ pattern, message }) => !pattern.test(value) && message);
};

export const isErrors = (errors: ErrorForm) => {
  return Object.values(errors)
    .map((arr) => {
      return Array.isArray(arr) && arr.some((error) => !error);
    })
    .some((val) => !val);
};
