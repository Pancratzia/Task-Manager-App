import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import List from "./components/List";
import Form from "./components/Form";

function App() {
  const Layout = () => {
    return (
      <div>
        <h1>
          TASK MANAGER
        </h1>

        <h2>
          An AulaCube Project
        </h2>

        <Outlet />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <List />,
        },
        {
          path: "/edit/:id",
          element: <Form action="edit" />,
        },
        {
          path: "/create",
          element: <Form action="create" />,
        }
      ],
    }
  ])

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
