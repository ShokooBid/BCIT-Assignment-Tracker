import { Assignment } from "../Assignment";
import styles from "./assignments.module.css";
import { useAssigmentStore } from "../../stores/AssigmentStore";

export function Assignments() {
  const { assigments } = useAssigmentStore();
  return (
    <section className={styles.assignments}>
      <header className={styles.header}>
        <div>
          <p>Created Assignments</p>
          <span>{assigments.length}</span>
        </div>

        <div>
          <p className={styles.textPurple}>Completed Assignments</p>
          <span>{`${assigments.filter((i) => i.isCompleted).length} of ${
            assigments.length
          }`}</span>
        </div>
      </header>

      <div className={styles.list}>
        {assigments.map((asi) => (
          <Assignment assignment={asi} />
        ))}
      </div>
    </section>
  );
}
