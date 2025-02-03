import { useChallengeStore } from "../../store/challengeStore";
import styles from "./challengeCounter.module.css";

export function TotalChallenges() {
  const totalChallenges = useChallengeStore((state) => state.totalChallenges);

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Total challenges</h3>
      <p className={styles.count}>{totalChallenges}</p>
    </div>
  );
}
