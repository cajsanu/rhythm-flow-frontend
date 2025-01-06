export interface Workspace {
    id: string
    name: string
    ownerId: string
}

export interface CreateWorkspace {
    name: string
    ownerId: string
}