"use client";

import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  useMediaQuery,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { MdMenu as MenuIcon } from "react-icons/md";
import styles from "./authenticated-header.module.css";
import { fetchUserData } from "@/utils/api";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { UserProfile } from "@/types/interfaces/userProfile";

export default function AuthenticatedHeader() {
  const [username, setUsername] = useState("");
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));
  const pathname = usePathname();
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      fetchUserData(token)
        .then((userData) => setUser(userData))
        .catch((error) =>
          console.error("Fehler beim Laden der Benutzerdaten:", error)
        );
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (!session?.accessToken) return;

      try {
        const userData = await fetchUserData(session.accessToken);
        if (userData && userData.username) {
          setUsername(userData.username);
        }
      } catch (error) {
        console.error("Fehler beim Laden der Daten:", error);
        setUsername("");
      }
    }

    fetchData();
  }, [session]);

  const getTitle = () => {
    switch (pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/workout":
        return "Workout";
      case "/challenges":
        return "Challenges";
      default:
        return "Dashboard";
    }
  };

  return (
    <AppBar position="static" className={styles.appBar}>
      <Toolbar>
        {!isLargeScreen && (
          <IconButton
            edge="start"
            color="inherit"
            className={styles.menuButton}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" className={styles.title}>
          {getTitle()}
        </Typography>
        <Box className={styles.userSection}>
          <input
            type="file"
            id="avatar-upload"
            style={{ display: "none" }}
            accept="image/*"
          />
          <label htmlFor="avatar-upload">
            <Avatar
              className={styles.avatar}
              src={user?.avatar?.url}
              style={{ cursor: "pointer" }}
            >
              {user?.username ? user.username[0].toUpperCase() : "?"}
            </Avatar>
          </label>
          <Typography variant="body1" className={styles.userName}>
            {username}
          </Typography>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={() => setAnchorEl(null)}>
              Profileinstellungen
            </MenuItem>
            <MenuItem onClick={() => setAnchorEl(null)}>
              Passwort ändern
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
