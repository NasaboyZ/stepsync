"use client";

import { create } from "zustand";

type SnackbarState = {
  isOpen: boolean;
  message: string;
  type: "success" | "error" | "info";
  openSnackbar: (message: string, type?: "success" | "error" | "info") => void;
  closeSnackbar: () => void;
};

export const useSnackbarStore = create<SnackbarState>((set) => ({
  isOpen: false,
  message: "",
  type: "info",
  openSnackbar: (message, type = "info") =>
    set({ isOpen: true, message, type }),
  closeSnackbar: () => set({ isOpen: false, message: "", type: "info" }),
}));
