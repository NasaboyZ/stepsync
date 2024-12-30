"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Grid, Avatar } from "@mui/material";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Skeleton from "@mui/material/Skeleton";
import styles from "./profileBioCard.module.css";

interface UserProfile {
  username: string;
  age: number | null;
  sex: string;
  height: number | null;
  weight: number | null;
  goal: string;
}

export default function ProfileBioCard() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    async function fetchUserProfile() {
      if (session?.accessToken) {
        try {
          const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user`;
          const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${session?.accessToken}`,
            },
          });

          if (!response.ok) {
            console.error("API Error", response.status);
            return;
          }

          const data = await response.json();
          console.log("Rohdaten von API:", data);

          const profileData = {
            username: data.username,
            age: data.age,
            sex: data.gender,
            height: data.height,
            weight: data.weight,
            goal: data.goal,
          };

          console.log("Verarbeitete Profildaten:", profileData);
          setUserProfile(profileData);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    }

    fetchUserProfile();
  }, [session]);

  if (!userProfile) {
    // Skeleton Loader
    return (
      <Card className={styles.bioCard}>
        <CardContent>
          <div className={styles.cardContent}>
            <div className={styles.avatarSection}>
              <Skeleton variant="circular" width={80} height={80} />
            </div>

            <div className={styles.infoSection}>
              <Skeleton variant="text" width="60%" height={30} />

              <Grid container spacing={2}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <React.Fragment key={index}>
                    <Grid item xs={6}>
                      <Skeleton variant="text" width="80%" height={20} />
                    </Grid>
                    <Grid item xs={6}>
                      <Skeleton variant="text" width="60%" height={20} />
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className={styles.bioCard}>
        <CardContent>
          <div className={styles.cardContent}>
            <div className={styles.avatarSection}>
              <Avatar className={styles.avatar} />
            </div>

            <div className={styles.infoSection}>
              <Typography className={styles.username}>
                {userProfile.username}
              </Typography>

              <Grid container spacing={2} className={styles.infoGrid}>
                <Grid item xs={6}>
                  <Typography className={styles.infoLabel}>Alter</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className={styles.infoValue}>
                    {userProfile.age !== null
                      ? userProfile.age
                      : "Nicht angegeben"}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography className={styles.infoLabel}>
                    Geschlecht
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className={styles.infoValue}>
                    {userProfile.sex}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography className={styles.infoLabel}>Grösse</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className={styles.infoValue}>
                    {userProfile.height !== null &&
                    userProfile.height !== undefined
                      ? `${userProfile.height} cm`
                      : "Nicht angegeben"}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography className={styles.infoLabel}>Gewicht</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className={styles.infoValue}>
                    {userProfile.weight !== null &&
                    userProfile.weight !== undefined
                      ? `${userProfile.weight} kg`
                      : "Nicht angegeben"}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography className={styles.infoLabel}>Ziel</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography className={styles.infoValue}>
                    {userProfile.goal}
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
