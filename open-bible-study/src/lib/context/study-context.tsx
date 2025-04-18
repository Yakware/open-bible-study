"use client";
import { createContext, ReactNode, useContext } from "react";
import { Book, Chapter, Verse, Version } from "../db/schema";

type StudyContext = {
  versions: Version[];
  books: Book[];
  chapters: Chapter[];
  verses: Verse[];
  currentVersion: Version | null;
  currentBook: Book | null;
  currentChapter: Chapter | null;
};

const studyContext = createContext<StudyContext | undefined>(undefined);

const { Provider } = studyContext;

type StudyContextProviderProps = {
  versions: Version[];
  books: Book[];
  chapters: Chapter[];
  verses: Verse[];
  currentVersion: Version | null;
  currentBook: Book | null;
  currentChapter: Chapter | null;
  children: ReactNode;
};

export function StudyContextProvider({
  children,
  versions,
  books,
  chapters,
  verses,
  currentVersion,
  currentBook,
  currentChapter,
}: StudyContextProviderProps) {
  return (
    <Provider
      value={{
        versions,
        books,
        chapters,
        verses,
        currentBook,
        currentChapter,
        currentVersion,
      }}
    >
      {children}
    </Provider>
  );
}

export function useStudyContext() {
  const context = useContext(studyContext);
  if (!context) {
    throw new Error(
      "useStudyContext must be used inside of an StudyContextProvider"
    );
  }

  const { currentBook, currentChapter, currentVersion } = context;

  return { currentBook, currentChapter, currentVersion };
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
