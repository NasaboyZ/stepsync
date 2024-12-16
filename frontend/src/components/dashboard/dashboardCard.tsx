import { FC } from "react";
import styles from "./dashboardCard.module.css";

interface UserData {
  name: string;
  biography: string;
  age: number;
  gender: string;
  weight: number;
  goal: "lose weight" | "lifting";
  imageUrl: string;
}

interface DashboardCardProps {
  variant: "user-info" | "other";
  userData: UserData;
}

const DashboardCard: FC<DashboardCardProps> = ({ variant, userData }) => {
  if (variant === "user-info") {
    return (
      <div className={styles['dashboard-card']}>
        <div className={styles['card-header']}>
          <h2>{userData.name}</h2>
        </div>

        <div className={styles['card-content']}>
          <div className={styles['user-image']}>
           
          </div>

          <div className={styles['user-info']}>
            <p className={styles.biography}>{userData.biography}</p>

            <div className={styles['user-stats']}>
              <div className={styles['stat-item']}>
                <span className={styles.label}>Alter:</span>
                <span className={styles.value}>{userData.age}</span>
              </div>

              <div className={styles['stat-item']}>
                <span className={styles.label}>Geschlecht:</span>
                <span className={styles.value}>{userData.gender}</span>
              </div>

              <div className={styles['stat-item']}>
                <span className={styles.label}>Gewicht:</span>
                <span className={styles.value}>{userData.weight} kg</span>
              </div>

              <div className={styles['stat-item']}>
                <span className={styles.label}>Ziel:</span>
                <span className={styles.value}>{userData.goal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div>Andere Variante der Card</div>;
};

export default DashboardCard;
