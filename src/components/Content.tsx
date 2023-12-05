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

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setText(value);
    onNoteUpdate(id, value);
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
