import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import "./index.css"
import { Home, Login, Signup, WorkspaceView, ProjectView } from "./pages"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <div>"Not found"</div>
  },
  {
    path: "/home/:id",
    element: <Home />,
    errorElement: <div>"Not found"</div>
  },
  {
    path: "/signup",
    element: <Signup />,
    errorElement: <div>"Not found"</div>
  },
  {
    path: "/workspace/:id", 
    element: <WorkspaceView />,
    errorElement: <div>"Not found"</div>
  },
  {
    path: "/project/:id", 
    element: <ProjectView />,
    errorElement: <div>"Not found"</div>
  }
])

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
)
