import { createNote, getAllNotes, updateNote } from "../services/notes.service";
import { Note } from "../types/types";
import Content from "./Content";
import Sidenav from "./Sidenav";
import { useReducer, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

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

export default function Notes() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const notes = getAllNotes();
    dispatch({ type: "GET_NOTES", payload: notes || {} });
  }, []);

  const onNoteUpdate = useCallback(
    (id: string, content: string) => {
      const updated = structuredClone(state.notes[id]);
      updated.content = content;
      const newNote = updateNote(updated);
      dispatch({ type: "UPDATE_NOTE", payload: newNote });
    },
    [state.notes]
  );

  if (Object.entries(state.notes).length === 0) return "Loading...";

  let selectedId = searchParams.get("selected");
  if (!selectedId) {
    selectedId = Object.keys(state.notes)[0];
    if (selectedId) setSearchParams({ selected: selectedId });
  }

  const selected = state.notes[selectedId];

  const select = (id: string) => {
    setSearchParams({ selected: id });
  };

  const create = () => {
    const n = createNote();
    dispatch({ type: "CREATE_NOTE", payload: n });
  };

  return (
    <div className="h-screen overflow-hidden flex">
      <Sidenav
        selectedId={selectedId}
        select={select}
        create={create}
        notes={state.notes}
      ></Sidenav>
      <Content
        key={selected.id}
        id={selected.id}
        initialValue={selected.content}
        onNoteUpdate={onNoteUpdate}
      ></Content>
    </div>
  );
}
