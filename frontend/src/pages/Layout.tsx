import SharedAppBar from "./SharedAppBar";
import { Outlet } from "react-router-dom";

const Layout = () => (
  <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
    <SharedAppBar />
    <main style={{ flex: 1, padding: "20px", width: '100vw', height: '100%' }}>
      <Outlet />
    </main>
  </div>
);

export default Layout;
