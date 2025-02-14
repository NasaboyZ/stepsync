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
import { fetchUserData } from "@/utils/api";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { UserProfile } from "@/types/interfaces/userProfile";
import AuthenticatedNav from "../authenticatedNav/authenticatedNav";
import { useAvatar } from "@/context/avatar-context-provider";

export default function AuthenticatedHeader() {
  const { avatarUrl } = useAvatar(); // Use the context instead of local state
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));
  const pathname = usePathname();
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (!session?.accessToken) return;

      try {
        const userData = await fetchUserData(session.accessToken);
        setUser(userData);
      } catch (error) {
        console.error("Fehler beim Laden der Benutzerdaten:", error);
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
           
            <ClickAwayListener onClickAway={handleClickAway}>
              <Box display="flex" alignItems="center">
                <Avatar
                  className={styles.avatar}
                  src={avatarUrl}
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
                  {user?.username}
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
