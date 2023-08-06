import React from "react";
import { AlertContext } from "@/components/UI/Alert/Context";

export const useAlert = () => React.useContext(AlertContext);
