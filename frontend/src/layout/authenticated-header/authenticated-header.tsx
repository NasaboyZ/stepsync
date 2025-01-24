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
  ClickAwayListener,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { MdMenu as MenuIcon } from "react-icons/md";
import { GoBell } from "react-icons/go";
import { RxGear } from "react-icons/rx";
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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
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

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  const isMenuOpen = Boolean(anchorEl);

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
          <IconButton className={styles.iconButton} color="inherit">
            <GoBell />
          </IconButton>

          <IconButton className={styles.iconButton} color="inherit">
            <RxGear />
          </IconButton>
          <span className={styles.separator}></span>
          <ClickAwayListener onClickAway={handleClickAway}>
            <Box display="flex" alignItems="center">
              <Avatar
                className={styles.avatar}
                src={user?.avatar?.url}
                style={{ cursor: "pointer" }}
                onClick={handleMenuOpen}
              >
                {user?.username ? user.username[0].toUpperCase() : "?"}
              </Avatar>
              <Typography
                variant="body1"
                className={styles.userName}
                onClick={handleMenuOpen}
                style={{ cursor: "pointer", marginLeft: "8px" }}
              >
                {username}
              </Typography>
              <Menu
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={handleMenuClose}
                slotProps={{
                  paper: {
                    style: {
                      marginTop: "22px",
                    },
                  },
                }}
              >
                <MenuItem onClick={handleMenuClose}>
                  Profileinstellungen
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>Passwort ändern</MenuItem>
                <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
              </Menu>
            </Box>
          </ClickAwayListener>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
