import { create } from "zustand";
import { TAssignment } from "../types/TAssignment";

interface AssigmentState {
  assigments: TAssignment[];
  onDeleteAssignment: (id: string) => void;
  onCreateAssigment: (newAssignment: TAssignment) => void;
  onSetCompleted: (id: string) => void;
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

  onCreateAssigment: (newAssignment) =>
    set((state) => ({
      assigments: [
        ...state.assigments,
        {
          id: crypto.randomUUID(),
          description: newAssignment.description,
          isCompleted: false,
          dueDate: newAssignment.dueDate,
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
}));
