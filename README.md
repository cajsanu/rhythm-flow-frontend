# RhythmFlow frontend

## Overview

This is a **Task Management Application** designed to help users manage tasks. The application allows users to manage their workspaces, projects, and tickets effectively. Roles are handled at the workspace level, and creators of workspaces can assign users to their workspace. A dynamic Kanban drag-and-drop feature ensures efficient ticket management within projects.

The project is a React + TypeScript frontend that integrates with this backend: *https://github.com/cajsanu/rhythm-flow-backend*. The project was made during three weeks of intense keyboard abuse and neglect of human nature. The focus was on not touching the already existing backend and to implement as many features as possible.

## Get started

### Prerequisites

Ensure you have the following installed:

- Node.js (>=16.x)
- Yarn 

### Follow these steps to get your project up and running locally:

1. **Clone the Repository**  
   Clone the project to your local machine:  
   ```bash
   git clone https://github.com/cajsanu/rhythm-flow-frontend

2. Use Yarn to **install packages** with
  `yarn install`

3. **Run** the frontend locally with `yarn dev`


## Features

- **Workspaces**
  - Users can create and manage their own workspaces.
  - Role-based access control with three distinct roles.
  - Add users to your own workspace and assign roles to them.

- **Projects**
  - Projects are organized within workspaces.
  - Users can be added to and removed from projects.
  - Search projects by name

- **Tickets**
  - Tickets are managed within projects.
  - Kanban-style drag-and-drop interface for ticket management. 
  - Assign users to tickets and update ticket statuses.

- **Authentication**
  - Secure login and signup using JWT-based authentication.

## Workflow 
- Signu up or login to start managing your tasks. 
- On the home page users can see all the workspaces they are part of. They can aslo create a new workspace or add other users to join their workspace, giving them a role inside the workspace. 
- If users are not part of the workspace they can't access inforamtion abotu the workspace or projects inside it. 
- When clicking on a workspace the app will take the user to the workspace view where they can see all the projects inside the workspace, search project by name and if the user has been assigned the role of project manager within the workspace they can create, update and delete projects. 
- By clicking on a project the user is taken to the project view (if the user is part of the project), where the kanban board for tickets withing the project exists. 
- Tickets can be created by anyone who has been added to the project and tickets can be assigned to users in the project. 

## Information about roles
- Users have roles on the workspace level.
- When a user creates a workspace they are automatically assigned the role of owner (of the workspace).
- The other possible roles are User and Project Manager. 
- Project managers can create, delete and update projects in a workspace and also assign users to those projects. 
- Users who have the role of basic User can create and assign tickets in a project that they have been added to. 

## Technologies Used

The application leverages modern web development tools and frameworks:

- **React**: For building the user interface.
- **TypeScript**: Ensuring type safety and reducing runtime errors.
- **shadcn**: For reusable UI components.
- **TailwindCSS**: For styling and responsive design.
- **TanStack Query**: For server state management and API interaction.
- **Redux Toolkit**: For global state management.
- **React Hook Form** Integrated with **Zod**

## Testing


## Future features and improvements
- Implement more robust error handling
- The whole workflow to remove users from workspaces




