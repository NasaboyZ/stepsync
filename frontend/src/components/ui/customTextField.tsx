import { TextField, TextFieldProps } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledTextField = styled(TextField)({
  "& label": {
    color: "#fff",
  },
  "& label.Mui-focused": {
    color: "#fff",
  },
  "& .MuiOutlinedInput-root": {
    color: "#fff",
    "& fieldset": {
      borderColor: "#fff",
    },
    "&:hover fieldset": {
      borderColor: "#fff",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#fff",
    },
  },
  "& .MuiFormHelperText-root": {
    color: "#ff3333", // Fehlertext in Rot
  },
});

export const CustomTextField = ({ ...props }: TextFieldProps) => {
  return <StyledTextField variant="outlined" fullWidth {...props} />;
};
