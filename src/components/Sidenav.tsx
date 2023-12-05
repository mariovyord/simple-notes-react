import { useState } from "react";
import { useNotes } from "../contexts/NotesContext";
import { Note } from "../types/types";

interface SidenavProps {
  notes: Record<string, Note>;
  select: (id: string) => void;
  remove: (id: string) => void;
  create: () => void;
  selectedId: string;
}

export default function Sidenav({
  create,
  select,
  selectedId,
  remove,
}: SidenavProps) {
  const notes = useNotes();

  return (
    <div className="w-[320px] p-2">
      {Object.values(notes).map((x) => (
        <div key={x.id} className="mb-2">
          <NoteCard
            isSelected={x.id === selectedId}
            select={select}
            remove={remove}
            note={x}
          ></NoteCard>
        </div>
      ))}
      {Object.keys(notes).length <= 10 && (
        <button onClick={create} className="btn w-full justify-start">
          Create note
        </button>
      )}
    </div>
  );
}

interface NoteCard {
  note: Note;
  select: (id: string) => void;
  remove: (id: string) => void;
  isSelected: boolean;
}

function NoteCard({ note, select, isSelected, remove }: NoteCard) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex gap-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={() => select(note.id!)}
        className={`btn btn-primary flex-1 justify-start ${
          isSelected ? "btn-accent" : "btn-primary"
        }`}
      >
        {note.title}
      </button>
      {isHovered && (
        <div
          className="tooltip tooltip-open tooltip-right flex justify-center items-center"
          data-tip="Delete"
        >
          <button onClick={() => remove(note.id)}>&#10006;</button>
        </div>
      )}
    </div>
  );
}
