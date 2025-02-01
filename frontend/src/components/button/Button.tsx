import Style from "./button.module.css";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  style: ButtonStyle;
  type?: "submit" | "button";
  href?: string;
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
  href,
}: ButtonProps) {
  if (href) {
    return (
      <a
        href={href}
        className={`${Style.herosection__mehrerfahrenBTN} ${Style[style]}`}
      >
        {label}
      </a>
    );
  }

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
