import { createContext, useContext } from "react";
import { Note } from "../types/types";

type NotesServiceContextProps = {
  create: () => Promise<Note>;
  update: (id: string, title: string, content: string) => Promise<void>;
  remove: (id: string) => Promise<void>;
} | null;

export const NotesContext = createContext<Record<string, Note>>({});
export const NotesServiceContext =
  createContext<NotesServiceContextProps>(null);

export const useNotes = () => useContext(NotesContext);

export const useNotesService = () => {
  const ctx = useContext(NotesServiceContext);
  if (ctx === null) {
    throw new Error("useNotesService must be within NotesProvider");
  }
  return ctx;
};
