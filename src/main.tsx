import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Provider } from "react-redux"
import { store } from "./store"

import "./index.css"
import { Home, Login, Signup, WorkspaceView, ProjectView } from "./pages"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <div>"Not found"</div>
  },
  {
    path: "/home/:userId",
    element: <Home />,
    errorElement: <div>"Not found"</div>
  },
  {
    path: "/signup",
    element: <Signup />,
    errorElement: <div>"Not found"</div>
  },
  {
    path: "/workspace/:wsId",
    element: <WorkspaceView />,
    errorElement: <div>"Not found"</div>
  },
  {
    path: "workspace/:wsId/project/:projectId",
    element: <ProjectView />,
    errorElement: <div>"Not found"</div>
  }
])

const handleUnauthorized = () => {
  window.location.href = "/"
}

// Create the QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    },
    mutations: {
      retry: false
    }
  },
  queryCache: new QueryCache({
    onError: (_: any, query: any) => {
      if (query?.state?.error?.status === 401) {
        handleUnauthorized()
      }
    }
  })
})

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
)
