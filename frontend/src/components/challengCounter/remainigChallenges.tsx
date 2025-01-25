import { useChallengeStore } from "../../store/challengeStore";
import styles from "./challengeCounter.module.css";

export function RemainingChallenges() {
  const remainingChallenges = useChallengeStore(
    (state) => state.remainingChallenges
  );

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Challenges left to complete</h3>
      <p className={styles.count}>{remainingChallenges}</p>
    </div>
  );
}
