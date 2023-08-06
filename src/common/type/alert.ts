import React from "react";

export interface IAlertOption {
  className?: string;
  style?: React.CSSProperties
}

export interface IAlert {
  id?: string;
  type: "success" | "error" | "warning" | "info";
  message: string;
  options?: IAlertOption;
}
