import styles from "./ProConList.module.css";

interface ProConListProps {
  benefits: string[];
  limitations: string[];
}

export default function ProConList({ benefits, limitations }: ProConListProps) {
  return (
    <div className={styles.proConList}>
      {benefits.length > 0 && (
        <div className={styles.section}>
          <h3 className={`${styles.heading} ${styles.headingBenefits}`}>
            <span className={styles.emoji}>✅</span> Benefits
          </h3>
          <ul className={`${styles.list} ${styles.benefitsList}`}>
            {benefits.map((benefit) => (
              <li key={benefit} className={styles.item}>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      )}
      {limitations.length > 0 && (
        <div className={styles.section}>
          <h3 className={`${styles.heading} ${styles.headingLimitations}`}>
            <span className={styles.emoji}>❌</span> Limitations
          </h3>
          <ul className={`${styles.list} ${styles.limitationsList}`}>
            {limitations.map((limitation) => (
              <li key={limitation} className={styles.item}>
                {limitation}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}