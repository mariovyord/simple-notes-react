import { Note } from "../types/types";

const mockDB: Record<string, Note> = {
  sasd: {
    id: "sasd",
    title: "Hello World",
    content: "Hello World",
    updatedAt: new Date(),
    createdAt: new Date(),
  },
  s4sd: {
    id: "s4sd",
    title: "Hello World 2",
    content: "Hello World 2",
    updatedAt: new Date(),
    createdAt: new Date(),
  },
};

function get(id: string | null): Record<string, Note> | Note | undefined {
  if (typeof id === "string") {
    // get note by id
    return mockDB[id];
  }

  // if id is not passed, return all
  return mockDB;
}

function create(note: Note): Note {
  mockDB[note.id] = note;
  return note;
}

function put(note: Note): Note {
  mockDB[note.id] = note;
  return note;
}

function remove(noteId: string) {
  delete mockDB[noteId];
}

export default {
  get,
  create,
  put,
  remove,
};
