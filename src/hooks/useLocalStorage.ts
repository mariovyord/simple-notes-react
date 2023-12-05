import { useState } from "react";

export default function useSelectedId() {
  const [state, setState] = useState(() => {
    try {
      const selected = localStorage.getItem("selectedId");
      if (selected) {
        return JSON.parse(selected);
      }
      return null;
    } catch (err) {
      return null;
    }
  });

  const setItem = (selectedId: string) => {
    try {
      if (selectedId === null) {
        localStorage.removeItem("selectedId");
        setState(null);
      } else {
        localStorage.setItem("selectedId", JSON.stringify(selectedId));
        setState(selectedId);
      }
    } catch (err) {
      return null;
    }
  };

  return [state, setItem];
}
