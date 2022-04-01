import calcflowerL from "./Calcflower_icon_L.svg";
import calcflowerR from "./Calcflower_icon_R.svg";

export const CalcflowerIcon = ({ width = 240, flip = false }) => {
  return (
    <img
      src={flip ? calcflowerL : calcflowerR}
      style={{ width: width }}
      alt="logo"
    />
  );
};
