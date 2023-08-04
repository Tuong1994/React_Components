import React from "react";
import * as yup from "yup";
import * as Components from "./components";
import { SelectOption } from "./common/type/form";
import { Formik, Form, Field } from "formik";

const { DatePicker } = Components.Form.Formik.Basic;
const { Comment } = Components.UI;

interface FormData {
  account: string;
  password: string;
  intro: string;
  gender: number;
  userId: number[];
  birthday: Date;
}

function App() {
  const initialData: FormData = {
    account: "",
    password: "",
    intro: "",
    gender: 0,
    userId: [],
    birthday: new Date(),
  };

  const validationSchema = yup.object().shape({
    account: yup.string().required("This field is required"),
  });

  const options: SelectOption[] = [
    { label: "Item 1", value: 1 },
    { label: "Item 2", value: 2 },
    { label: "Item 3", value: 3 },
    { label: "Item 4", value: 4 },
    { label: "Item 5", value: 5 },
    { label: "Item 6", value: 6 },
    { label: "Item 7", value: 7 },
    { label: "Item 8", value: 8 },
    { label: "Item 9", value: 9 },
    { label: "Item 10", value: 10 },
    { label: "Item 11", value: 11 },
  ];

  const onSubmit = (data: FormData) => console.log(data);

  return (
    <div
      style={{
        // display: "flex",
        // flexDirection: "column",
        // justifyContent: "center",
        // alignItems: "center",
        padding: "50px",
      }}
    >
 
    </div>
  );
}

export default App;
