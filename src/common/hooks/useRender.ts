import React from "react";

const useRender = (trigger: boolean) => {
  const [isRender, setIsRender] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!isRender && trigger) setIsRender(true);
    else if (isRender && !trigger) setTimeout(() => setIsRender(false), 500);
  }, [trigger]);

  return isRender;
};


export default useRender;