export interface FormRule {
  required?: boolean;
  phone?: boolean;
  email?: boolean;
  whiteSpace?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  message?: string;
}

export interface FieldError {
  [x: string]: string | object;
}

export interface SelectOption {
  label: string;
  value: string | number;
}

export interface IDate {
  fullDate: Date;
  date: number;
  day: number;
  month: number;
  year: number;
  type: "main" | "sub";
}
