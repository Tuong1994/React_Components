import React from "react";
import { IAlert, IAlertOption } from "@/common/type/alert";
import { alertReducer } from "./reducer";
import { Action } from "./reducer/actionType";
import Alert from ".";
import helper from "@/utils/helper";

interface AlertContextData {
  success: (message: string, options?: IAlertOption) => void;
  error: (message: string, options?: IAlertOption) => void;
  warning: (message: string, options?: IAlertOption) => void;
  info: (message: string, options?: IAlertOption) => void;
  remove: (id: string) => void;
}

export const AlertContext = React.createContext<AlertContextData>(
  {} as AlertContextData
);

export const AlertContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = React.useReducer(alertReducer, {
    alerts: [],
  });

  const addAlert = ({ type, message, options }: IAlert) =>
    dispatch({
      type: Action.ADD_ALERT,
      payload: { id: helper.uuid(), type, message, options },
    });

  const remove = (id: string) =>
    dispatch({ type: Action.REMOVE_ALERT, payload: id });

  const success = (message: string, options?: IAlertOption) =>
    addAlert({ type: "success", message, options });

  const error = (message: string, options?: IAlertOption) =>
    addAlert({ type: "error", message, options });

  const warning = (message: string, options?: IAlertOption) =>
    addAlert({ type: "warning", message, options });

  const info = (message: string, options?: IAlertOption) =>
    addAlert({ type: "info", message, options });

  const value = { success, error, warning, info, remove };

  return (
    <AlertContext.Provider value={value}>
      <Alert alerts={state.alerts} />
      {children}
    </AlertContext.Provider>
  );
};
