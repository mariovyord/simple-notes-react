import { useNotes, useNotesService } from "../contexts/NotesContext";
import Content from "./Content";
import Sidenav from "./Sidenav";
import useSelectedId from "../hooks/useSelectedId";

export default function Notes() {
  const notes = useNotes();
  const notesService = useNotesService();
  const [selectedId, setSelectedId] = useSelectedId();

  if ((!selectedId || !notes?.[selectedId]) && Object.keys(notes).length > 0) {
    setSelectedId(Object.keys(notes)[0]);
  }

  const select = (id: string) => {
    setSelectedId(id);
  };

  const create = async () => {
    const note = await notesService.create();
    setSelectedId(note.id);
  };

  const remove = async (id: string) => {
    await notesService.remove(id);
    if (selectedId === id) {
      if (
        (!selectedId || !notes?.[selectedId]) &&
        Object.keys(notes).length > 0
      ) {
        setSelectedId(Object.keys(notes)[0]);
        return;
      }

      setSelectedId();
    }
  };

  return (
    <div className="h-screen overflow-hidden flex">
      <Sidenav
        create={create}
        remove={remove}
        selectedId={selectedId || ""}
        select={select}
        notes={notes}
      ></Sidenav>
      {Object.keys(notes).length && selectedId ? (
        <Content
          key={selectedId}
          id={selectedId}
          initialValue={notes[selectedId].content}
        ></Content>
      ) : (
        <div className="w-full h-full">"Create new note"</div>
      )}
    </div>
  );
}
