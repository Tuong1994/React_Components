import React from "react";
import { IAlert } from "@/common/type/alert";
import AlertItem from "./Item";

interface AlertProps {
  alerts?: IAlert[];
}

const Alert: React.ForwardRefRenderFunction<HTMLDivElement, AlertProps> = (
  { alerts = [] },
  ref
) => {
  return (
    <div ref={ref} className="alert">
      {alerts.map((alert) => (
        <AlertItem key={alert.id} alert={alert} />
      ))}
    </div>
  );
};

export default React.forwardRef(Alert);
