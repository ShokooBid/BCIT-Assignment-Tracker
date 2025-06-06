import styles from "./assignment.module.css";
import { TbTrash } from "react-icons/tb";
import { TAssignment } from "../../types/TAssignment";
import { useAssigmentStore } from "../../stores/AssigmentStore";
import { BsFillCheckCircleFill, BsCircle } from "react-icons/bs";
import { differenceInCalendarDays } from "date-fns";

export function Assignment({ assignment }: { assignment: TAssignment }) {
  const { onDeleteAssignment, onSetCompleted } = useAssigmentStore();

  function calculateDueDate() {
    const remainDays = differenceInCalendarDays(assignment.dueDate, new Date());
    if (remainDays === 1) return { label: "tomorrow", days: remainDays };
    if (remainDays <= 0) return { label: "now", days: remainDays };
    return { label: `${remainDays} days`, days: remainDays };
  }

  const dueInfo = calculateDueDate();

  return (
    <div className={styles.assignment}>
      <button
        className={styles.checkContainer}
        onClick={() => onSetCompleted(assignment.id)}
      >
        {assignment.isCompleted ? (
          <BsFillCheckCircleFill color="purple" size={24} />
        ) : (
          <BsCircle color="blue" size={24} />
        )}
      </button>

      <p
        className={
          assignment.isCompleted
            ? styles.textCompleted
            : styles.textNotCompleted
        }
        key={assignment.id}
      >
        {assignment.description}
      </p>
      <label
        className={
          dueInfo.days <= 0
            ? styles.now
            : dueInfo.days === 1
            ? styles.tomorrow
            : styles.future
        }
      >
        Duo: {dueInfo.label}
      </label>

      <button
        className={styles.deleteButton}
        onClick={() => onDeleteAssignment(assignment.id)}
      >
        <TbTrash size={20} />
      </button>
    </div>
  );
}
