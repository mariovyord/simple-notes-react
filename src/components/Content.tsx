import debounce from "lodash.debounce";
import { ChangeEvent, useState } from "react";

interface ContentProps {
  onNoteUpdate: (id: string, content: string) => void;
  id: string;
  initialValue: string;
}

export default function Content({
  onNoteUpdate,
  id,
  initialValue,
}: ContentProps) {
  const [text, setText] = useState(initialValue);

  const debouncedOnChange = debounce((e: ChangeEvent<HTMLTextAreaElement>) => {
    console.log("hello");
    const value = e.target.value;
    setText(value);
    onNoteUpdate(id, value);
  }, 300);

  return (
    <div className="w-full h-full">
      <textarea
        value={text}
        onChange={debouncedOnChange}
        className="w-full h-full p-4"
        placeholder="Write your note"
      ></textarea>
    </div>
  );
}
