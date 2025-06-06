import styles from "./header.module.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { uppercase } from "../../helpers/stringHelpers";
import { useAssigmentStore } from "../../stores/AssigmentStore";
import { DayPicker } from "react-day-picker";
import { useState } from "react";
import "react-day-picker/dist/style.css";

export function Header() {
  const {
    onCreateAssigment,
    assignmentDesc,
    setAssignmentDesc,
    setDueDate,
    dueDate,
  } = useAssigmentStore();

  const [showDatePicker, setShowDatePicker] = useState(false);

  function handleCreatAssignment(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    onCreateAssigment(assignmentDesc, dueDate);
  }

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAssignmentDesc(e.target.value);
  }
  function handleDatePicker() {
    setShowDatePicker((prev) => !prev);
  }

  return (
    <header className={styles.header}>
      <h1>{uppercase("bcit")} Assignment Tracker</h1>
      <form className={styles.newAssignmentForm}>
        <div>
          <input
            placeholder="Add a new assignment"
            type="text"
            value={assignmentDesc}
            onChange={handleOnChange}
          />
        </div>
        <div>
          <input
            placeholder="Select the due Date"
            value={dueDate?.toDateString()}
            onClick={handleDatePicker}
          ></input>
          {showDatePicker && (
            <DayPicker
              animate
              mode="single"
              onSelect={(date) => {
                if (typeof date != "undefined") setDueDate(date);
                setShowDatePicker(false);
              }}
              footer={
                dueDate
                  ? `Selected: ${dueDate.toLocaleDateString()}`
                  : "Pick a day."
              }
            />
          )}
        </div>

        <button
          onClick={handleCreatAssignment}
          disabled={assignmentDesc.trim() === "" ? true : false}
        >
          Create <AiOutlinePlusCircle size={20} />
        </button>
      </form>
    </header>
  );
}
