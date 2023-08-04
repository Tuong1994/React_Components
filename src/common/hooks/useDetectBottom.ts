import React from "react";

const useDetectBottom = (ref: React.MutableRefObject<any>) => {
  const [isBottom, setIsBottom] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (ref && ref.current !== null) {
      if (
        window.innerHeight - ref.current.getBoundingClientRect().bottom <
        300
      ) {
        setIsBottom(true);
      } else setIsBottom(false);
    }
  }, [window.innerHeight, ref]);

  return isBottom;
};

export default useDetectBottom;