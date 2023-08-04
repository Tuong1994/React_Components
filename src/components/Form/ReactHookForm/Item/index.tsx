import React from "react";
import { Controller, useController } from "react-hook-form";
import { FieldError, FormRule } from "@/common/type/form";
import { ErrorMessage } from "@hookform/error-message";
import { NoteMessage } from "@/components/UI";
import { EMAIL_REGEX, PHONE_REGEX } from "@/common/constant/regex";

interface FormItemProps {
  name?: string;
  rules?: FormRule[];
  children?: React.ReactNode | React.ReactNode[];
}

export const FormItemContext = React.createContext<any>({});

const FormItem: React.FC<FormItemProps> = ({
  name = "",
  rules = [],
  children,
}) => {
  const {
    field: { name: fieldName, value: fieldValue, onChange, onBlur },
    fieldState: { invalid },
    formState: { errors },
  } = useController({ name });

  const allRules = () => {
    const ruleRequired: FieldError = {};

    if (rules.length === 0) return ruleRequired;

    rules.forEach((rule) => {
      if (rule.required)
        ruleRequired.required = { value: rule.required, message: rule.message };

      if (rule.email)
        ruleRequired.pattern = { value: EMAIL_REGEX, message: rule.message };

      if (rule.phone)
        ruleRequired.pattern = { value: PHONE_REGEX, message: rule.message };

      if (rule.max)
        ruleRequired.max = { value: rule.max, message: rule.message };

      if (rule.min)
        ruleRequired.min = { value: rule.min, message: rule.message };

      if (rule.maxLength)
        ruleRequired.maxLength = {
          value: rule.maxLength,
          message: rule.message,
        };

      if (rule.minLength)
        ruleRequired.minLength = {
          value: rule.minLength,
          message: rule.message,
        };
    });

    return ruleRequired;
  };

  return (
    <FormItemContext.Provider
      value={{
        fieldName,
        fieldValue,
        isError: invalid,
        ctrlOnChange: onChange,
        ctrlOnBlur: onBlur,
      }}
    >
      <Controller
        name={name}
        rules={{ ...allRules() }}
        render={() => (
          <div
            className={`form-item ${
              !errors[fieldName] ? "form-item-margin" : ""
            }`}
          >
            {children}
          </div>
        )}
      />

      {errors[fieldName] && (
        <div className="form-item-error-message">
          <ErrorMessage
            name={name}
            errors={errors}
            render={(error) => (
              <NoteMessage
                type="error"
                textStyle="italic"
                message={error.message}
              />
            )}
          />
        </div>
      )}
    </FormItemContext.Provider>
  );
};

export default FormItem;
