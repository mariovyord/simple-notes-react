import { ChangeEvent, useState } from "react";
import { useNotesService } from "../contexts/NotesContext";

interface ContentProps {
  id: string;
  initialValue: string;
}

export default function Content({ id, initialValue }: ContentProps) {
  const notesService = useNotesService();
  const [text, setText] = useState(initialValue);

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    const title = value.split("\n")[0].substring(0, 20);
    setText(value);
    notesService.update(id, title, value);
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
