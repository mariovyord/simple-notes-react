interface ContentProps {
  onNoteUpdate: (content: string) => void;
  content: string;
}

export default function Content({ onNoteUpdate, content }: ContentProps) {
  return (
    <div className="w-full h-full">
      <textarea
        className="w-full h-full p-4"
        placeholder="Write your note"
      ></textarea>
    </div>
  );
}
