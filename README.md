# RhythmFlow frontend

## Overview

This is a **Task Management Application** designed to help users manage tasks. The application allows users to manage their workspaces, projects, and tickets effectively. Roles are handled at the workspace level, and creators of workspaces can assign users to their workspace. A dynamic Kanban drag-and-drop feature ensures efficient ticket management within projects.

## Features

- **Workspaces**
  - Users can create and manage their own workspaces.
  - Role-based access control with three distinct roles.
  - Assign users within your own workspace.

- **Projects**
  - Projects are organized within workspaces.
  - Users can be assigned to specific projects.
  - Search projects by name
  - Tickets are managed within projects.

- **Tickets**
  - Kanban-style drag-and-drop interface for ticket management.
  - Manage tickets in projects. 
  - Assign users to tickets and update ticket statuses.

- **Authentication**
  - Secure login and signup using JWT-based authentication.

## Workflow 
- Signu up or login to start managing your tasks. 
- On the home page users can see all the workspaces they are part of. They can aslo create a new workspace or add others to join their workspace, giving them a role inside the workspace. 
- If users are not part of the workspace they can't access inforamtion abotu the workspace or projects inside it. 
- When clicking on a workspace the app will take the user to the workspace view where they can see all the projects inside the workspace, search project by name and if the user has been assigned the role of project manager within the workspace they can create and delete projects. 
- By clicking on a project the user is taken to the project view (if the user is part of the project), where the kanban board for tickets withing the project exists. 
- Tickets can be created by anyone who has been assigned to the project and tickets can be assigned to users in the project. 

## Technologies Used

The application leverages modern web development tools and frameworks:

- **React**: For building the user interface.
- **TypeScript**: Ensuring type safety and reducing runtime errors.
- **shadcn**: For reusable UI components.
- **TailwindCSS**: For styling and responsive design.
- **TanStack Query**: For server state management and API interaction.
- **Redux Toolkit**: For global state management.
- **JWT**: For secure authentication.

### Prerequisites

Ensure you have the following installed:

- Node.js (>=16.x)
- Yarn (preferred) or npm




