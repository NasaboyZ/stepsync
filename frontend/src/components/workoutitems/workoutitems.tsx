"use client";

import React, { useState, useEffect } from "react";
import { Box, Grid, Tabs, Tab, Typography, Button } from "@mui/material";
import { useSession } from "next-auth/react";
import { WorkoutData } from "@/types/interfaces/workoutData";
import { fetchWorkouts } from "@/utils/api";
import { WorkoutCard } from "../workoutCard/workoutCard";
import {
  createWorkout,
  deleteWorkout,
  updateWorkout,
  updateWorkoutStatus,
} from "@/services/servicesWorkout";
import { useRouter } from "next/navigation";
import styles from "./workoutitems.module.css";
import { WorkoutModal } from "../workoutModal/workoutModal";

export default function WorkoutItems() {
  const { data: session } = useSession();
  const router = useRouter();

  const [savedWorkouts, setSavedWorkouts] = useState<WorkoutData[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState<WorkoutData | null>(
    null
  );
  const [modalType, setModalType] = useState<"krafttraining" | "cardio">(
    "krafttraining"
  );
  const [selectedTab, setSelectedTab] = useState(0);

  // Funktion zum Laden der Workouts
  const loadWorkouts = async () => {
    if (session?.accessToken) {
      const workoutsData = await fetchWorkouts(session.accessToken);
      setSavedWorkouts(Array.isArray(workoutsData) ? workoutsData : []);
    }
  };

  // Workouts bei Session-Änderung laden
  useEffect(() => {
    const fetchData = async () => {
      const workoutsData = await fetchWorkouts(session?.accessToken ?? "");
      setSavedWorkouts(Array.isArray(workoutsData) ? workoutsData : []);
    };

    if (session?.accessToken) {
      fetchData();
    }
  }, [session]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingWorkout(null);
    setModalType("krafttraining");
  };

  const handleEdit = (workout: WorkoutData) => {
    setEditingWorkout(workout);
    setModalType(workout.category as "krafttraining" | "cardio");
    setIsModalOpen(true);
  };

  const handleDelete = async (workoutId: number) => {
    try {
      await deleteWorkout(
        workoutId,
        session?.accessToken ?? undefined,
        router,
        () => loadWorkouts() // onSuccess callback hinzugefügt
      );
    } catch (error) {
      console.error("Fehler beim Löschen des Workouts:", error);
    }
  };

  const handleSave = async (workoutData: WorkoutData) => {
    try {
      if (editingWorkout?.id) {
        const updatedWorkoutData = { ...workoutData, id: editingWorkout.id };
        await updateWorkout(
          updatedWorkoutData,
          session?.accessToken ?? undefined,
          router,
          () => loadWorkouts() // onSuccess callback hinzugefügt
        );
      } else {
        await createWorkout(
          workoutData,
          session?.accessToken ?? undefined,
          router,
          () => loadWorkouts() // onSuccess callback auch hier hinzugefügt
        );
      }

      setIsModalOpen(false);
      setEditingWorkout(null);
    } catch (error) {
      console.error("Fehler beim Speichern des Workouts:", error);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleStatusChange = async (
    workoutId: number,
    isCompleted: boolean
  ) => {
    try {
      await updateWorkoutStatus(
        workoutId,
        isCompleted,
        session?.accessToken,
        () => loadWorkouts()
      );
    } catch (error) {
      console.error("Fehler beim Aktualisieren des Status:", error);
    }
  };

  const memoizedFilteredWorkouts = React.useMemo(() => {
    return savedWorkouts.filter((workout) => {
      if (selectedTab === 0) return !workout.is_completed;
      if (selectedTab === 1)
        return workout.category === "krafttraining" && !workout.is_completed;
      if (selectedTab === 2)
        return workout.category === "cardio" && !workout.is_completed;
      if (selectedTab === 3) return workout.is_completed;
      return true;
    });
  }, [savedWorkouts, selectedTab]);

  return (
    <>
      <Typography variant="h4" component="h1" className={styles.workoutHeader}>
        Workouts
      </Typography>

      <Box
        className={styles.tabsContainer}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: { xs: "stretch", sm: "center" },
          width: "100%",
        }}
      >
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          aria-label="workout categories"
          className={styles.tabs}
          variant="scrollable"
          scrollButtons="auto"
          TabIndicatorProps={{
            style: { backgroundColor: "#E31E24", height: "2px" },
          }}
          sx={{
            minHeight: "35px",
            "& .MuiTab-root": {
              minHeight: "35px",
              padding: "6px 16px",
              fontSize: "14px",
            },
          }}
        >
          <Tab
            label="Alle"
            sx={{
              color: selectedTab === 0 ? "#E31E24" : "#000",
              textTransform: "none",
              fontWeight: selectedTab === 0 ? 600 : 400,
              minHeight: "35px",
            }}
          />
          <Tab
            label="Krafttraining"
            sx={{
              color: selectedTab === 1 ? "#E31E24" : "#000",
              textTransform: "none",
              fontWeight: selectedTab === 1 ? 600 : 400,
              minHeight: "35px",
            }}
          />
          <Tab
            label="Cardio"
            sx={{
              color: selectedTab === 2 ? "#E31E24" : "#000",
              textTransform: "none",
              fontWeight: selectedTab === 2 ? 600 : 400,
              minHeight: "35px",
            }}
          />
          <Tab
            label="Erledigt"
            sx={{
              color: selectedTab === 3 ? "#E31E24" : "#000",
              textTransform: "none",
              fontWeight: selectedTab === 3 ? 600 : 400,
              minHeight: "35px",
            }}
          />
        </Tabs>

        <Box sx={{ width: { xs: "100%", sm: "auto" } }}>
          <Button
            variant="contained"
            onClick={() => setIsModalOpen(true)}
            className={styles.newWorkoutButton}
            fullWidth={true}
          >
            Neues Workout
          </Button>
        </Box>
      </Box>

      <Grid container spacing={2}>
        {memoizedFilteredWorkouts && memoizedFilteredWorkouts.length > 0 ? (
          memoizedFilteredWorkouts.map((workout, index) => (
            <Grid item xs={12} key={`${workout.id}-${index}`}>
              <WorkoutCard
                variant="primary"
                initialData={workout}
                onEdit={() => handleEdit(workout)}
                onDelete={() => workout.id && handleDelete(workout.id)}
                onStatusChange={(isCompleted) =>
                  workout.id && handleStatusChange(workout.id, isCompleted)
                }
              />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <p>Keine Workouts gefunden</p>
          </Grid>
        )}
      </Grid>

      <WorkoutModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        editingWorkout={editingWorkout}
        modalType={modalType}
      />
    </>
  );
}
