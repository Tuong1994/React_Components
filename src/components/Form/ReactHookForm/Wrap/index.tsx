import React from "react";
import {
  useForm,
  FormProvider,
  SubmitHandler,
  FieldValues,
} from "react-hook-form";

interface FormWrapProps<M> {
  initialData: M;
  rootClass?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode | React.ReactNode[];
  onFormSubmit?: (data: M) => void;
}

const FormWrap = <M extends FieldValues>({
  rootClass = "",
  style,
  children,
  initialData,
  onFormSubmit,
}: FormWrapProps<M>) => {
  const methods = useForm<M>({ values: initialData, mode: "all" });

  const onSubmit: SubmitHandler<M> = (data: M) =>
    onFormSubmit && onFormSubmit(data);
    
  return (
    <FormProvider {...methods}>
      <form
        autoComplete="off"
        style={style}
        className={`${rootClass}`}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default FormWrap;
