import React from "react";

interface GridContextInitData {
  gutters: [number?, number?];
}

export const GridContext = React.createContext<GridContextInitData>({
  gutters: [],
});
