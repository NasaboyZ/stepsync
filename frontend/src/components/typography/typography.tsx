import { Typography as MuiTypography } from "@mui/material";
import { TypographyProps } from "@/types/interfaces/typography";

export default function Typography({
  children,
  variant = "body1",
  className,
  ...props
}: TypographyProps) {
  const getDefaultStyles = () => {
    switch (variant) {
      case "h1":
        return {
          fontSize: "clamp(20px, 5vw, 64px)",
          fontFamily: "var(--font-ibnsansBold)",
          fontWeight: 700,
        };
      case "h2":
        return {
          fontSize: "clamp(28px, 4vw, 48px)",
          fontFamily: "var(--font-ibnsansBold)",
          fontWeight: 700,
        };
      case "h3":
        return {
          fontSize: "clamp(20px, 3vw, 36px)",
          fontFamily: "var(--font-ibnsansBold)",
          fontWeight: 700,
        };
      case "h4":
        return {
          fontSize: "clamp(18px, 2.5vw, 24px)",
          fontFamily: "var(--font-ibnsansBold)",
          fontWeight: 700,
        };
      case "body1":
        return {
          fontSize: "clamp(16px, 2.5vw, 20px)",
          fontFamily: "var(--font-inter-regular)",
          fontWeight: 400,
        };
      case "body2":
        return {
          fontSize: "14px",
          fontFamily: "var(--font-inter-regular)",
          fontWeight: 400,
        };
      case "caption":
        return {
          fontSize: "12px",
          fontFamily: "var(--font-inter-regular)",
          fontWeight: 400,
        };
      default:
        return {};
    }
  };

  return (
    <MuiTypography
      variant={variant}
      className={className}
      sx={getDefaultStyles()}
      {...props}
    >
      {children}
    </MuiTypography>
  );
}
