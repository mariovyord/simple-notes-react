import Dexie, { Table } from "dexie";
import { Note } from "../types/types";

export class DexieExt extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  notes!: Table<Note>;

  constructor() {
    super("simple-notes");
    this.version(1).stores({
      notes: "++id, title, content, createdAt, updatedAt", // Primary key and indexed props
    });
  }
}

export const db = new DexieExt();
