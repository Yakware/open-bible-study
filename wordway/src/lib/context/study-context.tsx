"use client";
import { createContext, ReactNode, useContext } from "react";
import { Book, Chapter, Verse, Version } from "../db/schema";

type StudyContext = {
  versions: Version[];
  books: Book[];
  chapters: Chapter[];
  verses: Verse[];
  currentChapter: Chapter | null;
};

const studyContext = createContext<StudyContext | undefined>(undefined);

const { Provider } = studyContext;

type StudyContextProviderProps = {
  versions: Version[];
  books: Book[];
  chapters: Chapter[];
  verses: Verse[];
  children: ReactNode;
  currentChapter: Chapter | null;
};

export function StudyContextProvider({
  children,
  versions,
  books,
  chapters,
  verses,
  currentChapter,
}: StudyContextProviderProps) {
  return (
    <Provider value={{ versions, books, chapters, verses, currentChapter }}>
      {children}
    </Provider>
  );
}

export function useVersions() {
  const context = useContext(studyContext);
  if (!context) {
    throw new Error(
      "useVersions must be used inside of an StudyContextProvider"
    );
  }
  return context.versions;
}

export function useBooks() {
  const context = useContext(studyContext);
  if (!context) {
    throw new Error("useBooks must be used inside of an StudyContextProvider");
  }
  return context.books;
}

export function useChapters() {
  const context = useContext(studyContext);
  if (!context) {
    throw new Error(
      "useChapters must be used inside of an StudyContextProvider"
    );
  }
  return context.chapters;
}

export function useVerses() {
  const context = useContext(studyContext);
  if (!context) {
    throw new Error("useVerses must be used inside of an StudyContextProvider");
  }
  return context.verses;
}

export function useCurrentChapter() {
  const context = useContext(studyContext);
  if (!context) {
    throw new Error(
      "useCurrentChapter must be used inside of an StudyContextProvider"
    );
  }
  return context.currentChapter;
}
