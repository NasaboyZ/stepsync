import { useChallengeStore } from "../../store/challengeStore";
import styles from "./challengeCounter.module.css";

export function CompletedChallenges() {
  const completedChallenges = useChallengeStore(
    (state) => state.completedChallenges
  );

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Completed challenges</h3>
      <p className={styles.count}>{completedChallenges}</p>
    </div>
  );
}
