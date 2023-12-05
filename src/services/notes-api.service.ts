import { db } from "../db/db";
import { Note } from "../types/types";

export async function getAllNotes(): Promise<Record<string, Note>> {
  const notes = await db.notes.toArray();
  const obj: Record<string, Note> = {};
  notes.forEach((x) => (obj[x.id] = x));
  return obj;
}

export async function getNoteById(id: string): Promise<Note> {
  const note = await db.notes.where({ id: id }).toArray();
  return note[0];
}

export async function createNote(): Promise<Note> {
  const newNote: Partial<Note> = {
    title: "",
    content: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const id = await db.notes.add(newNote as Note);
  const updated = { ...newNote, id };
  return updated as Note;
}

export async function updateNote(note: Note): Promise<Note> {
  note.updatedAt = new Date();
  await db.notes.put(note);
  return note;
}

export async function deleteNote(id: string): Promise<void> {
  await db.notes.delete(id);
}
