import { IAlert } from "@/common/type/alert";
import { Action, AlertAction } from "./actionType";

export interface AlertState {
  alerts: IAlert[];
}

export const alertReducer: React.Reducer<AlertState, AlertAction> = (
  state,
  action
) => {
  switch (action.type) {
    case Action.ADD_ALERT: {
      return {
        ...state,
        alerts: [...state.alerts, action.payload],
      };
    }

    case Action.REMOVE_ALERT: {
      return {
        ...state,
        alerts: [...state.alerts].filter(
          (alert) => alert.id !== action.payload
        ),
      };
    }

    default:
      return { ...state };
  }
};
