import React from "react";
import { FaCheck, FaTimes, FaExclamation, FaInfo } from "react-icons/fa";
import { IAlert } from "@/common/type/alert";
import { ConditionRecord } from "@/common/type/base";
import { useAlert } from "@/common/hooks/useAlert";
import Space from "../Space";

interface AlertItemProps {
  alert: IAlert;
}

const AlertItem: React.FC<AlertItemProps> = ({ alert }) => {
  const alertApi = useAlert();

  const [isRemoved, setIsRemoved] = React.useState<boolean>(false);

  const timerRef = React.useRef<any>(null);

  const progressBarRef = React.useRef<HTMLDivElement | null>(null);

  const icon = React.useMemo<React.ReactNode>(() => {
    const icons: ConditionRecord = {
      success: <FaCheck size={10} />,
      error: <FaTimes size={10} />,
      warning: <FaExclamation size={10} />,
      info: <FaInfo size={10} />,
    };
    return icons[alert.type];
  }, [alert.type]);

  const handleRemove = () => {
    setIsRemoved(true);
    setTimeout(() => alertApi.remove(alert.id ?? ""), 600);
  };

  const handleMouseEnter = () => {
    if (!progressBarRef.current) return;

    clearTimeout(timerRef.current);

    progressBarRef.current.style.animationPlayState = "paused";
  };

  const handleMouseLeave = () => {
    if (!progressBarRef.current) return;

    if (!progressBarRef.current.parentElement) return;

    const remainTime =
      (progressBarRef.current.offsetWidth /
        progressBarRef.current.parentElement.offsetWidth) *
      4000;

    progressBarRef.current.style.animationPlayState = "running";

    timerRef.current = setTimeout(() => handleRemove(), remainTime);
  };

  React.useEffect(() => {
    timerRef.current = setTimeout(() => handleRemove(), 4000);
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <div
      style={alert.options?.style}
      className={`alert-item alert-item-${alert.type} ${
        isRemoved ? "alert-item-hide" : ""
      } ${alert.options?.className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="item-content">
        <Space align="center">
          <div className="content-icon">{icon}</div>
          <span className="content-message">{alert.message}</span>
        </Space>

        <button type="button" className="content-action" onClick={handleRemove}>
          <FaTimes size={12} />
        </button>
      </div>

      <div className="item-progress">
        <div ref={progressBarRef} className="progress-bar"></div>
      </div>
    </div>
  );
};

export default AlertItem;
