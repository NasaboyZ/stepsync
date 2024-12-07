"use client";

import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useSnackbarStore } from "@/store/snackbarStore";

const SnackbarComponent: React.FC = () => {
  const { isOpen, message, type, closeSnackbar } = useSnackbarStore();

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={6000}
      onClose={closeSnackbar}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert onClose={closeSnackbar} severity={type} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarComponent;
