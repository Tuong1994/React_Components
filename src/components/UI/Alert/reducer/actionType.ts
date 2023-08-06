import { IAlert } from "@/common/type/alert";

export enum Action {
  ADD_ALERT = "ADD_ALERT",
  REMOVE_ALERT = "REMOVE_ALERT",
}

interface AddAlertAction {
  type: Action.ADD_ALERT;
  payload: IAlert;
}

interface RemoveAlertAction {
  type: Action.REMOVE_ALERT;
  payload: string;
}

export type AlertAction = AddAlertAction | RemoveAlertAction;
