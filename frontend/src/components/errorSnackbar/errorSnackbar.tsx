import { Snackbar, Alert } from "@mui/material";

interface ErrorSnackbarProps {
  open: boolean;
  message: string;
  onClose: () => void;
}

export const ErrorSnackbar = ({
  open,
  message,
  onClose,
}: ErrorSnackbarProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert onClose={onClose} severity="error" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
