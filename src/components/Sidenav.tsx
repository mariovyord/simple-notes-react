import { Note } from "../types/types";

interface SidenavProps {
  notes: Record<string, Note>;
  select: (id: string) => void;
  create: () => void;
  selectedId: string;
}

export default function Sidenav({
  create,
  select,
  notes,
  selectedId,
}: SidenavProps) {
  return (
    <div className="w-[320px] p-2">
      {Object.values(notes).map((x) => (
        <div key={x.id} className="mb-2">
          <NoteCard
            isSelected={x.id === selectedId}
            select={select}
            note={x}
          ></NoteCard>
        </div>
      ))}
      <button onClick={create} className="btn w-full">
        Create note
      </button>
    </div>
  );
}

interface NoteCard {
  note: Note;
  select: (id: string) => void;
  isSelected: boolean;
}

function NoteCard({ note, select, isSelected }: NoteCard) {
  return (
    <button
      onClick={() => select(note.id)}
      className={`btn btn-primary w-full ${
        isSelected ? "btn-accent" : "btn-primary"
      }`}
    >
      {note.title}
    </button>
  );
}
