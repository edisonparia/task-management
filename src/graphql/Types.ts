// DateTime generalmente es un string en formato ISO
export type DateTime = string

// Interface para la entidad User
export interface User {
    id: string
    fullName: string
    email: string
    avatar: string
    createdAt: DateTime
    updatedAt: DateTime
    type: UserType
}

// Enum para el tipo de usuario
export enum UserType {
    ADMIN = 'ADMIN',
    CANDIDATE = 'CANDIDATE',
}

// Interface para la entidad Task
export interface Task {
    id: string
    name: string
    status: Status
    dueDate: DateTime
    pointEstimate: PointEstimate
    tags: TaskTag[]
    assignee: User // Assignee puede ser null si no está asignada la tarea
    creator: User
    createdAt: DateTime
    position: number
}

// Enum para los puntos de estimación de tareas
export enum PointEstimate {
    ZERO = 'ZERO',
    ONE = 'ONE',
    TWO = 'TWO',
    FOUR = 'FOUR',
    EIGHT = 'EIGHT',
}

// Enum para los estados de las tareas
export enum Status {
    BACKLOG = 'BACKLOG',
    CANCELLED = 'CANCELLED',
    DONE = 'DONE',
    IN_PROGRESS = 'IN_PROGRESS',
    TODO = 'TODO',
}

// Enum para los tags de las tareas
export enum TaskTag {
    ANDROID = 'ANDROID',
    IOS = 'IOS',
    NODE_JS = 'NODE_JS',
    RAILS = 'RAILS',
    REACT = 'REACT',
}

// Input para la creación de tareas
export interface CreateTaskInput {
    name: string
    assigneeId?: string
    dueDate: DateTime
    pointEstimate: PointEstimate
    status: Status
    tags: TaskTag[]
}

// Input para la actualización de tareas
export interface UpdateTaskInput {
    id: string
    name?: string
    assigneeId?: string
    dueDate?: DateTime
    pointEstimate?: PointEstimate
    status?: Status
    position?: number
    tags?: TaskTag[]
}

// Input para eliminar una tarea
export interface DeleteTaskInput {
    id: string
}

// Input para filtrar las tareas
export interface FilterTaskInput {
    assigneeId?: string
    dueDate?: DateTime
    name?: string
    ownerId?: string
    pointEstimate?: PointEstimate
    status?: Status
    tags?: TaskTag[]
}

export type Profile = User

export interface TaskProps {
    task: Task
}

export interface Assignee {
    id: string
    fullName: string
    avatar?: string
}