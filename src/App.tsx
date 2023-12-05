import Notes from "./components/Notes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotesProvider from "./contexts/NotesProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Notes></Notes>,
  },
]);

function App() {
  return (
    <>
      <NotesProvider>
        <RouterProvider router={router} />
      </NotesProvider>
    </>
  );
}

export default App;
