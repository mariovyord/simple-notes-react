import { useSearchParams } from "react-router-dom";
import { Note } from "../types/types";
import { createNote } from "../services/notes.facade";

interface SidenavProps {
  notes: Record<string, Note>;
}

export default function Sidenav({ notes }: SidenavProps) {
  return (
    <div className="w-[320px] p-2">
      {Object.values(notes).map((x) => (
        <div className="mb-2">
          <NoteCard note={x}></NoteCard>
        </div>
      ))}
      <CreateNoteBtn></CreateNoteBtn>
    </div>
  );
}

function NoteCard({ note }: { note: Note }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleNoteSelect = (id: string) => {
    setSearchParams({ selected: id });
  };

  return (
    <button
      onClick={() => handleNoteSelect(note.id)}
      className={`btn btn-primary w-full ${
        searchParams.get("selected") === note.id ? "btn-accent" : "btn-primary"
      }`}
    >
      {note.title}
    </button>
  );
}

function CreateNoteBtn() {
  const onCreate = () => createNote();

  return (
    <button onClick={onCreate} className="btn w-full">
      Create note
    </button>
  );
}
