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
        <button onClick={create} className="btn w-full">
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
  return (
    <>
      <button
        onClick={() => select(note.id!)}
        className={`btn btn-primary w-full ${
          isSelected ? "btn-accent" : "btn-primary"
        }`}
      >
        {note.title}
      </button>
      <button className="btn" onClick={() => remove(note.id)}>
        X
      </button>
    </>
  );
}
