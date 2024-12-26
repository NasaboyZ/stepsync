"use client";

import React, { useState } from "react";
import { WorkoutCard } from "../Cards/cards";
import { Fab, Modal, Box, Grid } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus } from "react-icons/fa";

interface WorkoutData {
  category: string;
  description: string;
  weight: number;
  repetitions: number;
}

export default function WorkoutItems() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savedWorkouts, setSavedWorkouts] = useState<WorkoutData[]>([]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSaveWorkout = (workoutData: WorkoutData) => {
    setSavedWorkouts([...savedWorkouts, workoutData]);
    setIsModalOpen(false);
  };

  return (
    <>
      <Grid container spacing={2}>
        {savedWorkouts.map((workout, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <WorkoutCard
              variant="primary"
              onSave={() => {}} // Für gespeicherte Workouts ist keine Speicherung erforderlich
            />
          </Grid>
        ))}
      </Grid>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{ position: "fixed", bottom: 20, right: 20, zIndex: 1000 }}
      >
        <Fab
          color="primary"
          aria-label="add workout"
          onClick={handleOpenModal}
          component={motion.button}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaPlus />
        </Fab>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <Modal
            open={isModalOpen}
            onClose={handleCloseModal}
            aria-labelledby="workout-modal"
            aria-describedby="workout-card-modal"
            closeAfterTransition
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 400,
                  maxWidth: "90%",
                  bgcolor: "background.paper",
                  boxShadow: 24,
                  p: 4,
                  borderRadius: 2,
                }}
              >
                <WorkoutCard variant="primary" onSave={handleSaveWorkout} />
              </Box>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}
