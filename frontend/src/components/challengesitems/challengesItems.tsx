"use client";

import { useEffect, useState } from "react";
import { ChallengeCard } from "../Cards/cards";
import { useSession } from "next-auth/react";
import { fetchChallenges } from "@/utils/api";
import { Challenge } from "@/types/challenges";
import { Fab, Modal, TextField, Button } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import styles from "./challengesItems.module.css";
import { CreateChallenge } from "@/types/interfaces/challenges";

const emptyChallenge: CreateChallenge = {
  title: "",
  description: "",
  goal: "",
};

export default function ChallengesItems() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newChallenge, setNewChallenge] =
    useState<CreateChallenge>(emptyChallenge);

  useEffect(() => {
    const loadChallenges = async () => {
      try {
        if (!session?.accessToken) return;
        const challengesData = await fetchChallenges(session.accessToken);
        setChallenges(Array.isArray(challengesData) ? challengesData : []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Ein Fehler ist aufgetreten"
        );
      } finally {
        setLoading(false);
      }
    };

    loadChallenges();
  }, [session]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setNewChallenge(emptyChallenge);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleInputChange = (field: keyof CreateChallenge, value: string) => {
    setNewChallenge((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveChallenge = () => {
    console.log("Challenge saved:", newChallenge);
    setIsModalOpen(false);
  };

  if (loading) return <div>Lädt...</div>;
  if (error) return <div>Fehler: {error}</div>;

  return (
    <>
      <div className={styles.challengesContainer}>
        {challenges.map((challenge) => (
          <ChallengeCard
            key={challenge.id}
            variant="primary"
            challenge={challenge}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={styles.fabButton}
      >
        <Fab
          color="primary"
          aria-label="add challenge"
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
            aria-labelledby="challenge-modal"
            closeAfterTransition
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.modalContent}>
                <h2>Neue Challenge</h2>
                <TextField
                  label="Titel"
                  fullWidth
                  value={newChallenge.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  margin="normal"
                />
                <TextField
                  label="Beschreibung"
                  fullWidth
                  value={newChallenge.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  margin="normal"
                />
                <TextField
                  label="Ziel"
                  fullWidth
                  value={newChallenge.goal}
                  onChange={(e) => handleInputChange("goal", e.target.value)}
                  margin="normal"
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSaveChallenge}
                >
                  Speichern
                </Button>
              </div>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}
