import Style from "./titel.module.css";

interface TitelProp {
  label: string;
  style?: "primary" | "secondary";
}
export enum titelStyle {
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

export function TitelComponent({ label, style = "primary" }: TitelProp) {
  return (
    <h2 className={`${Style.titel__component} ${style ? Style[style] : ""}`}>
      {label}
    </h2>
  );
}
