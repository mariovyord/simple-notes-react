import { Note } from "../types/types";
import api from "./api.service";

export function getAllNotes(): Record<string, Note> | null {
  const notes = api.get(null);
  if (!notes) return null;
  return notes as Record<string, Note> | null;
}

export function getNoteById(id: string) {
  return api.get(id);
}

export function createNote() {
  const newNote: Note = {
    id: generateId(),
    title: "",
    content: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return api.create(newNote);
}

export function updateNote(note: Note) {
  note.updatedAt = new Date();
  return api.put(note);
}

export function deleteNote(id: string) {
  return api.remove(id);
}

function generateId(): string {
  // 1. Generate random ID
  // 2. Validate that it does not exist
  // 3. Return valid id

  return "kjb" + String(Math.random() + 1000);
}
