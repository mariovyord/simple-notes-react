import { updateNote } from "../services/notes.facade";
import { Note } from "../types/types";
import Content from "./Content";
import Sidenav from "./Sidenav";
import { useReducer } from "react";

type ActionType =
  | { type: "GET_NOTES" }
  | { type: "CREATE_NOTE"; payload: Note }
  | { type: "UPDATE_NOTE"; payload: Note }
  | { type: "DELETE_NOTE"; payload: string };

interface State {
  notes: Record<string, Note>;
}

const reducer = (state: State, action: ActionType) => {
  switch (action.type) {
    case "GET_NOTES":
      return state;
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

export default function Notes() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onNoteUpdate = (id: string, content: string) => {
    const updated = structuredClone(state.notes[id]);
    updated.content = content;
    const newNote = updateNote(updated);
    dispatch({ type: "UPDATE_NOTE", payload: newNote });
  };

  return (
    <div className="h-screen overflow-hidden flex">
      <Sidenav notes={state.notes}></Sidenav>
      <Content content={selected.content} onNoteUpdate={onNoteUpdate}></Content>
    </div>
  );
}
