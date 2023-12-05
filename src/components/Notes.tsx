import { useNotes } from "../contexts/NotesContext";
import Content from "./Content";
import Sidenav from "./Sidenav";
import { useSearchParams } from "react-router-dom";

export default function Notes() {
  const notes = useNotes();
  const [searchParams, setSearchParams] = useSearchParams();

  let selectedId = searchParams.get("selected");
  if (!selectedId) {
    selectedId = Object.keys(notes)[0];
    if (selectedId) setSearchParams({ selected: selectedId });
  }

  const selected = notes[selectedId];

  const select = (id: string) => {
    setSearchParams({ selected: id });
  };

  if (Object.keys(notes).length === 0) {
    return "Empty";
  }

  return (
    <div className="h-screen overflow-hidden flex">
      <Sidenav selectedId={selectedId} select={select} notes={notes}></Sidenav>
      <Content
        key={selected.id}
        id={selected.id}
        initialValue={selected.content}
      ></Content>
    </div>
  );
}
