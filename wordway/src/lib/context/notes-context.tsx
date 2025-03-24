"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import { Verse } from "../db/schema";

type NotesContext = {
  toggleNoteCreation: (verse: Verse | undefined) => void;
  newNoteVerse: Verse | undefined;
};

const notesContext = createContext<NotesContext | undefined>(undefined);

const { Provider } = notesContext;

type NotesContextProviderProps = {
  children: ReactNode;
};

export function NotesContextProvider({ children }: NotesContextProviderProps) {
  const [newNoteVerse, setNewNoteVerse] = useState<Verse | undefined>();

  const toggleNoteCreation = (verse: Verse | undefined) => {
    setNewNoteVerse(verse);
  };

  return (
    <Provider value={{ toggleNoteCreation, newNoteVerse }}>{children}</Provider>
  );
}

export function useNotesContext() {
  const context = useContext(notesContext);
  if (!context) {
    throw new Error(
      "useNotesContext must be used inside of an NotesContextProvider"
    );
  }
  return context;
}
