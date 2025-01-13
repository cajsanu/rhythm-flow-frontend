export type Role = "WorkspaceOwner" | "ProjectManager" | "User";

export const RoleMap: Record<Role, number> = {
  WorkspaceOwner: 0,
  ProjectManager: 1,
  User: 2,
};
