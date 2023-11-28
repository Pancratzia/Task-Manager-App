import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import List from "./components/List";
import Form from "./components/Form";

function App() {
  const Layout = () => {
    return (
      <div className="layout">
        <h1 className="layout__title">TASK MANAGER</h1>
        <h2 className="layout__subtitle">A Project for AulaCube</h2>
        <Outlet />
      </div>
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<List />} />
          <Route path="edit/:id" element={<Form action="edit" />} />
          <Route path="create" element={<Form action="create" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
