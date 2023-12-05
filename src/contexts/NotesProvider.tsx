import { ReactNode, useEffect, useReducer, useState } from "react";
import { Note } from "../types/types";
import * as notesApiService from "../services/notes-api.service";
import { NotesContext, NotesServiceContext } from "./NotesContext";

type ActionType =
  | { type: "GET_NOTES"; payload: Record<string, Note> }
  | { type: "CREATE_NOTE"; payload: Note }
  | { type: "UPDATE_NOTE"; payload: Note }
  | { type: "DELETE_NOTE"; payload: string };

interface State {
  notes: Record<string, Note>;
}

const reducer = (state: State, action: ActionType) => {
  switch (action.type) {
    case "GET_NOTES":
      return { ...state, notes: action.payload };
    case "CREATE_NOTE": {
      const created = { ...state.notes };
      created[action.payload.id] = action.payload;
      return { ...state, notes: created };
    }
    case "UPDATE_NOTE": {
      const updated = { ...state.notes };
      updated[action.payload.id] = action.payload;
      return { ...state, notes: updated };
    }
    case "DELETE_NOTE": {
      const deleted = { ...state.notes };
      delete deleted[action.payload];
      return { ...state, notes: deleted };
    }
    default: {
      return state;
    }
  }
};

const initialState: State = {
  notes: {},
};

export default function NotesProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      const notes = await notesApiService.getAllNotes();
      dispatch({ type: "GET_NOTES", payload: notes });
      setLoading(false);
    };
    fetchNotes();
  }, []);

  const update = async (id: string, content: string) => {
    const updated = structuredClone(state.notes[id]);
    updated.content = content;
    const newNote = await notesApiService.updateNote(updated);
    dispatch({ type: "UPDATE_NOTE", payload: newNote });
  };

  const create = async () => {
    const n = await notesApiService.createNote();
    dispatch({ type: "CREATE_NOTE", payload: n });
    return n;
  };

  const remove = async (id: string) => {
    await notesApiService.deleteNote(id);
    dispatch({ type: "DELETE_NOTE", payload: id });
  };

  return (
    <NotesContext.Provider value={state.notes}>
      <NotesServiceContext.Provider value={{ update, create, remove }}>
        {loading ? "Loading..." : children}
      </NotesServiceContext.Provider>
    </NotesContext.Provider>
  );
}
