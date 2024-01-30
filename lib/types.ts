export type Operator = {
  id: number;
  name: string;
};
export type PaymentData = {
  phone: string;
  amount: number;
};

export type FormProps = {
  values: FormValues;
  onSubmit: (values: { [key: string]: string }) => void;
  title?: string;
  submitTrigger: React.ReactNode;
};

export type FormValues = {
  [key: string]: FormValue;
};
export type ResponseData = {
  data: {
    [key: string]: any;
  };
};
export type FormValue = {
  label?: string;
  rules?: FormRule[];
  mask?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;
export type ErrorForm = {
  [key: string]: (string | false)[];
};
export type FormRule = {
  pattern: RegExp;
  message: string;
};
export type ErrorData = {
  error: string;
  [key: string]: string;
};
