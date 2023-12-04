import { useSearchParams } from "react-router-dom";
import { Note } from "../types/types";

const mockNotes: Note[] = [
  {
    id: "asd2312",
    title: "Hello World",
    content: "Hello World. Lorem ipsum",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "avas2312",
    title: "100$",
    content: "100$. Dollar ammunts",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "asd2ba2",
    title: "Should buy milk",
    content: "Should buy milk. Lorem ipsum vrum dasum gaks.",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function Sidenav() {
  return (
    <div className="w-[320px] p-2">
      {mockNotes.map((x) => (
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
  return <button className="btn w-full">Create note</button>;
}
