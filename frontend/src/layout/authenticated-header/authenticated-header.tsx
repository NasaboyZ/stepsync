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

import styles from "./authenticated-header.module.css";
import { fetchUserData, fetchUserAvatar } from "@/utils/api";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { UserProfile } from "@/types/interfaces/userProfile";
import AuthenticatedNav from "../authenticatedNav/authenticatedNav";

export default function AuthenticatedHeader() {
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));
  const pathname = usePathname();
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

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
        setUser(userData);
        if (userData && userData.username) {
          setUsername(userData.username);
        }

        // Lade das Avatar-Bild separat
        const avatarData = await fetchUserAvatar(session.accessToken);
        setAvatarUrl(avatarData.path);
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

  const handleLogout = async () => {
    handleMenuClose();
    await signOut({ callbackUrl: "/login" });
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <AppBar position="static" className={styles.appBar}>
        <Toolbar>
          {!isLargeScreen && (
            <IconButton
              edge="start"
              color="inherit"
              className={styles.menuButton}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography variant="h6" className={styles.title}>
            {getTitle()}
          </Typography>
          <Box className={styles.userSection}>
            <span className={styles.separator}></span>
            <ClickAwayListener onClickAway={handleClickAway}>
              <Box display="flex" alignItems="center">
                <Avatar
                  className={styles.avatar}
                  src={avatarUrl || undefined}
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
                  <MenuItem
                    onClick={handleMenuClose}
                    component="a"
                    href="/profileinstellungen"
                  >
                    Profileinstellungen
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </Box>
            </ClickAwayListener>
          </Box>
        </Toolbar>
      </AppBar>
      {!isLargeScreen && (
        <AuthenticatedNav
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        />
      )}
    </>
  );
}
