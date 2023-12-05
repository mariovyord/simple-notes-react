import { ChangeEvent, useMemo, useState } from "react";
import { useNotesService } from "../contexts/NotesContext";
import debounce from "lodash.debounce";

interface ContentProps {
  id: string;
  initialValue: string;
}

export default function Content({ id, initialValue }: ContentProps) {
  const notesService = useNotesService();
  const [text, setText] = useState(initialValue);

  const updateNote = useMemo(
    () =>
      debounce((value: string) => {
        const title = value.split("\n")[0].substring(0, 20);
        notesService.update(id, title, value);
        console.log("updated", value);
      }, 300),
    [id, notesService]
  );

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    setText(value);
    updateNote(value);
  };

  return (
    <div className="w-full h-full">
      <textarea
        value={text}
        onChange={onChange}
        className="w-full h-full p-4"
        placeholder="Write your note"
      ></textarea>
    </div>
  );
}
