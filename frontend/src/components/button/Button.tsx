import Style from "./button.module.css";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  style: ButtonStyle;
}

export enum ButtonStyle {
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

export function Button({ label, onClick, style }: ButtonProps) {
  return (
    <button
      className={`${Style.herosection__mehrerfahrenBTN} ${Style[style]}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
