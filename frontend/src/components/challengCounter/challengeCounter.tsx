"use client";
import { CompletedChallenges } from "./completedChallenges";
import { OpenChallenges } from "./openChallenges";
import { RemainingChallenges } from "./remainigChallenges";
import styles from "./challengeCounter.module.css";

export default function ChallengeCounter() {
  return (
    <div className={styles.container}>
      <CompletedChallenges />
      <OpenChallenges />
      <RemainingChallenges />
    </div>
  );
}
