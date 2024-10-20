import Style from "./button.module.css";

interface ButtonProps {
  label: string;
  onClick?: () => void;
}

export function Button({ label, onClick }: ButtonProps) {
  return (
    <button className={Style["Herosection__mehrerfahrenBTN"]} onClick={onClick}>
      {label}
    </button>
  );
}
