import styles from "./header.module.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { uppercase } from "../../helpers/stringHelpers";
import { useAssigmentStore } from "../../stores/AssigmentStore";
import { DayPicker } from "react-day-picker";
import { useState } from "react";
import "react-day-picker/dist/style.css";
import { TAssignment } from "../../types/TAssignment";

export function Header() {
  const { onCreateAssigment } = useAssigmentStore();

  const [showDatePicker, setShowDatePicker] = useState(false);

  const [newAssignment, setNewAssignment] = useState<TAssignment>({
    id: "",
    description: "",
    dueDate: new Date(),
    isCompleted: false,
  });

  function handleCreatAssignment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onCreateAssigment(newAssignment);
  }

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    //setAssignmentDesc(e.target.value);
    setNewAssignment(
      (prev) =>
        ({
          ...prev,
          description: e.target.value,
        } as TAssignment)
    );
  }
  function handleDatePicker() {
    setShowDatePicker((prev) => !prev);
  }

  return (
    <header className={styles.header}>
      <h1>{uppercase("bcit")} Assignment Tracker</h1>
      <form
        className={styles.newAssignmentForm}
        onSubmit={handleCreatAssignment}
      >
        <div>
          <input
            placeholder="Add a new assignment"
            type="text"
            // value={assignmentDesc}
            value={newAssignment?.description}
            onChange={handleOnChange}
          />
        </div>
        <div>
          <input
            placeholder="Select the due Date"
            value={newAssignment?.dueDate?.toDateString()}
            onClick={handleDatePicker}
          ></input>
          {showDatePicker && (
            <DayPicker
              animate
              mode="single"
              onSelect={(date) => {
                if (typeof date != "undefined")
                  setNewAssignment(
                    (prev) =>
                      ({
                        ...prev,
                        dueDate: date,
                      } as TAssignment)
                  );
                setShowDatePicker(false);
              }}
              footer={
                newAssignment.dueDate
                  ? `Selected: ${newAssignment.dueDate.toLocaleDateString()}`
                  : "Pick a day."
              }
            />
          )}
        </div>

        <button
          disabled={newAssignment?.description.trim() === "" ? true : false}
        >
          Create <AiOutlinePlusCircle size={20} />
        </button>
      </form>
    </header>
  );
}
