import Style from "./button.module.css";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  style: ButtonStyle;
  type?: "submit" | "button";
}

export enum ButtonStyle {
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

export function Button({
  label,
  onClick,
  style,
  type = "button",
}: ButtonProps) {
  return (
    <button
      className={`${Style.herosection__mehrerfahrenBTN} ${Style[style]}`}
      onClick={onClick}
      type={type}
    >
      {label}
    </button>
  );
}
