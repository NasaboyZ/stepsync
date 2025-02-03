import { useChallengeStore } from "../../store/challengeStore";
import styles from "./challengeCounter.module.css";

export function PassedChallenges() {
  const passedChallenges = useChallengeStore((state) => state.passedChallenges);

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Not completed challenges</h3>
      <p className={styles.count}>{passedChallenges}</p>
    </div>
  );
}
