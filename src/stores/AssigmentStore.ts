import { create } from "zustand";
import { TAssignment } from "../types/TAssignment";

interface AssigmentState {
  assigments: TAssignment[];
  onDeleteAssignment: (id: string) => void;
  onCreateAssigment: (text: string, date: Date) => void;
  onSetCompleted: (id: string) => void;
  assignmentDesc: string;
  setAssignmentDesc: (description: string) => void;
  dueDate: Date ;
  setDueDate: (date: Date) => void;
}

export const useAssigmentStore = create<AssigmentState>((set) => ({
  assigments: [
    {
      id: "1",
      description: "some assigment",
      isCompleted: false,
      dueDate: new Date(),
    },
  ],

  onDeleteAssignment: (id) =>
    set((state) => ({
      assigments: state.assigments.toSpliced(
        state.assigments.findIndex((i) => i.id === id),
        1
      ),
    })),

  onCreateAssigment: (description, dueDate) =>
    set((state) => ({
      assigments: [
        ...state.assigments,
        {
          id: crypto.randomUUID(),
          description: description,
          isCompleted: false,
          dueDate: dueDate,
        },
      ],
      assignmentDesc: "",
    })),
  onSetCompleted: (id) =>
    set((state) => ({
      assigments: state.assigments.map((asi) =>
        asi.id === id ? { ...asi, isCompleted: true } : asi
      ),
    })),

  assignmentDesc: "",
  setAssignmentDesc: (description) => set({ assignmentDesc: description }),

  dueDate: new Date(),
  setDueDate: (date) => set({ dueDate: date }),
}));
