import Content from "./Content";
import Sidenav from "./Sidenav";

export default function Notes() {
  return (
    <div className="h-screen overflow-hidden flex">
      <Sidenav></Sidenav>
      <Content></Content>
    </div>
  );
}
