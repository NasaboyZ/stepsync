"use client";

import React, { useState, useEffect } from "react";
import { Tabs, Tab, Typography } from "@mui/material";
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
import { Button, ButtonStyle } from "../button/Button";

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

  const loadWorkouts = async () => {
    if (session?.accessToken) {
      const workoutsData = await fetchWorkouts(session.accessToken);
      setSavedWorkouts(Array.isArray(workoutsData) ? workoutsData : []);
    }
  };

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
        () => loadWorkouts()
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
          () => loadWorkouts()
        );
      } else {
        await createWorkout(
          workoutData,
          session?.accessToken ?? undefined,
          router,
          () => loadWorkouts()
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
    <div className={styles.container}>
      <Typography component="h1" className={styles.workoutHeader}>
        Workouts
      </Typography>

      <div className={styles.tabsContainer}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          aria-label="workout categories"
          className={styles.tabs}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab
            label="Alle"
            className={`${styles.tab} ${
              selectedTab === 0 ? styles.selected : ""
            }`}
          />
          <Tab
            label="Krafttraining"
            className={`${styles.tab} ${
              selectedTab === 1 ? styles.selected : ""
            }`}
          />
          <Tab
            label="Cardio"
            className={`${styles.tab} ${
              selectedTab === 2 ? styles.selected : ""
            }`}
          />
          <Tab
            label="Erledigt"
            className={`${styles.tab} ${
              selectedTab === 3 ? styles.selected : ""
            }`}
          />
        </Tabs>

        <div className={styles.buttonContainer}>
          <Button
            label="Neues Workout"
            onClick={() => setIsModalOpen(true)}
            style={ButtonStyle.PRIMARY_DARK}
          />
        </div>
      </div>

      <div className={styles.workoutList}>
        {memoizedFilteredWorkouts && memoizedFilteredWorkouts.length > 0 ? (
          memoizedFilteredWorkouts.map((workout, index) => (
            <div className={styles.workoutItem} key={`${workout.id}-${index}`}>
              <WorkoutCard
                variant="primary"
                initialData={workout}
                onEdit={() => handleEdit(workout)}
                onDelete={() => workout.id && handleDelete(workout.id)}
                onStatusChange={(isCompleted) =>
                  workout.id && handleStatusChange(workout.id, isCompleted)
                }
              />
            </div>
          ))
        ) : (
          <div className={styles.noWorkouts}>
            <p>Keine Workouts gefunden</p>
          </div>
        )}
      </div>

      <WorkoutModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        editingWorkout={editingWorkout}
        modalType={modalType}
      />
    </div>
  );
}
