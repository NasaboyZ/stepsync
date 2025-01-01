"use client";

import { signOut, useSession } from "next-auth/react";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  Avatar,
  Box,
  useMediaQuery,
  Menu,
  MenuItem,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  MdOutlineSpaceDashboard as DashboardIcon,
  MdFitnessCenter as WorkoutIcon,
  MdEmojiEvents as ChallengesIcon,
  MdLogout as LogoutIcon,
  MdMenu as MenuIcon, // Import MenuIcon hier
} from "react-icons/md";
import styles from "./authenticated.module.css";
import DashboardItems from "@/components/dashboardItems/dashboarditems";
import WorkoutItems from "@/components/workoutitems/workoutitems";
import ChallengesItems from "@/components/challengesitems/challengesItems";

const DEFAULT_AVATAR = "/images/default-avatar.png";

export default function AuthenticatedNav() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [avatarUrl, setAvatarUrl] = React.useState<string>("");
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));
  const pathname = usePathname();
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  React.useEffect(() => {
    async function fetchUserData() {
      if (!session?.accessToken) {
        console.log("Kein Access Token vorhanden");
        return;
      }

      try {
        // Benutzerdaten abrufen
        const userResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/user`,
          {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        );

        if (!userResponse.ok) {
          throw new Error("Fehler beim Abrufen der Benutzerdaten");
        }

        const userData = await userResponse.json();
        setUsername(userData.username);
        console.log("Benutzerdaten:", userData);

        // Avatar-Bild abrufen
        const uploadsResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads`,
          {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        );

        const uploadsData = await uploadsResponse.json();
        console.log("Backend URL:", process.env.NEXT_PUBLIC_BACKEND_URL);
        console.log("Uploads Response:", uploadsData);
        console.log("Session Token:", session?.accessToken);

        if (uploadsData.images && uploadsData.images.length > 0) {
          const avatar = uploadsData.images.find((img: { pathname: string }) =>
            img.pathname.includes("avatar")
          );

          if (avatar) {
            const avatarUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}${avatar.pathname}`;
            console.log("Avatar URL:", avatarUrl);
            setAvatarUrl(avatarUrl);
          } else {
            console.log("Kein Avatar in den Bildern gefunden");
          }
        } else {
          console.log("Keine Bilder in der Response gefunden");
        }
      } catch (error) {
        console.error("Fehler beim Laden der Daten:", error);
        setAvatarUrl(DEFAULT_AVATAR);
      }
    }

    fetchUserData();
  }, [session]);

  // Funktion zum Hochladen eines neuen Avatars
  const handleAvatarUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (
      !event.target.files ||
      !event.target.files[0] ||
      !session?.accessToken
    ) {
      return;
    }

    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Fehler beim Hochladen des Avatars");
      }

      const data = await response.json();
      console.log("Upload erfolgreich:", data);

      // Avatar-URL aktualisieren
      if (data.image?.pathname) {
        setAvatarUrl(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${data.image.pathname}`
        );
      }
    } catch (error) {
      console.error("Fehler beim Avatar-Upload:", error);
      // Hier könnte eine Benutzerbenachrichtigung hinzugefügt werden
    }
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  const renderContent = () => {
    switch (pathname) {
      case "/dashboard":
        return <DashboardItems />;
      case "/workout":
        return <WorkoutItems />;
      case "/challenges":
        return <ChallengesItems />;
      default:
        return null;
    }
  };

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

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div className={styles.container}>
      {isLargeScreen ? (
        <aside className={styles.permanentDrawer}>
          <List>
            <ListItem className={styles.listItem}>
              <ListItemIcon className={styles.listItemIcon}>
                <DashboardIcon />
              </ListItemIcon>
              <Link href="/dashboard" className={styles.listItemText}>
                Dashboard
              </Link>
            </ListItem>
            <ListItem className={styles.listItem}>
              <ListItemIcon className={styles.listItemIcon}>
                <WorkoutIcon />
              </ListItemIcon>
              <Link href="/workout" className={styles.listItemText}>
                Workout
              </Link>
            </ListItem>
            <ListItem className={styles.listItem}>
              <ListItemIcon className={styles.listItemIcon}>
                <ChallengesIcon />
              </ListItemIcon>
              <Link href="/challenges" className={styles.listItemText}>
                Challenges
              </Link>
            </ListItem>

            <ListItem onClick={handleSignOut} className={styles.listItem}>
              <ListItemIcon className={styles.listItemIcon}>
                <LogoutIcon />
              </ListItemIcon>
              <Typography className={styles.listItemText}>Logout</Typography>
            </ListItem>
          </List>
        </aside>
      ) : (
        <Drawer open={drawerOpen} onClose={toggleDrawer}></Drawer>
      )}
      <main className={styles.mainContent}>
        <AppBar position="static" className={styles.appBar}>
          <Toolbar>
            {!isLargeScreen && (
              <IconButton
                edge="start"
                color="inherit"
                onClick={toggleDrawer}
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
                onChange={handleAvatarUpload}
              />
              <label htmlFor="avatar-upload">
                <Avatar
                  className={styles.avatar}
                  src={avatarUrl}
                  style={{ cursor: "pointer" }}
                >
                  {username ? username[0].toUpperCase() : "?"}
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
        <div className={styles.content}>{renderContent()}</div>
      </main>
    </div>
  );
}
