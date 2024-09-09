import { PointEstimate, Status, Task, TaskTag } from '@/graphql/Types'
import { isBefore, differenceInDays, format, differenceInYears } from 'date-fns'

// Function to determine the due date color based on urgency
export const getDueDateColor = (dueDate: string) => {
    const now = new Date()
    const dueDateObj = new Date(dueDate)
    const daysDifference = differenceInDays(dueDateObj, now)

    // If the task is late
    if (isBefore(dueDateObj, now)) return 'text-primary-4 bg-primary-5'

    // If the task is due in 2 days or less
    if (daysDifference <= 2) return 'text-tertiary-4 bg-tertiary-5'

    // If the task is on time
    return 'text-neutral-1 bg-neutral-3'
}

// Function to return color classes based on task tags
export const getTagColors = (tag: TaskTag) => {
    switch (tag) {
        case TaskTag.ANDROID:
        case TaskTag.NODE_JS:
            return 'bg-secondary-5 text-secondary-4' // Secondary color for specific tags
        case TaskTag.REACT:
        case TaskTag.IOS:
        case TaskTag.RAILS:
            return 'bg-tertiary-5 text-tertiary-4' // Tertiary color for specific tags
        default:
            return 'text-neutral-1 bg-neutral-3' // Default neutral color for others
    }
}

// Function to get a relative description of a date (e.g., "Today", "Yesterday")
export function getRelativeDate(targetDate: Date): string {
    const now = new Date()
    const diffInDays = differenceInDays(targetDate, now)
    const diffInYears = differenceInYears(targetDate, now)

    // Format date if no relative description applies
    const formattedDate = format(targetDate, 'MMMM dd, yyyy')

    if (diffInDays === 0) return `Today`
    if (diffInDays === 1) return `Tomorrow`
    if (diffInDays === -1) return `Yesterday`
    if (diffInDays < -1 && diffInDays > -7)
        return `${Math.abs(diffInDays)} days ago`
    if (diffInDays <= -7 && diffInDays > -14)
        return `${Math.floor(Math.abs(diffInDays) / 7)} week ago`
    if (diffInDays <= -14 && diffInDays > -30)
        return `${Math.floor(Math.abs(diffInDays) / 7)} weeks ago`
    if (diffInYears < -1) return `${Math.abs(diffInYears)} years ago`
    if (diffInYears === -1) return `1 year ago`

    return formattedDate // Fallback to formatted date
}

// Map PointEstimate enum to numbers
export const pointEstimateToNumber = {
    [PointEstimate.ZERO]: 0,
    [PointEstimate.ONE]: 1,
    [PointEstimate.TWO]: 2,
    [PointEstimate.FOUR]: 4,
    [PointEstimate.EIGHT]: 8,
}

// Function to capitalize the first letter of each word
export const capitalizeWords = (str: string) => {
    return str
        .split(/[\s_]+/)
        .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(' ')
}

// Function to group tasks by their status
export const groupTasksByStatus = (tasks: Task[]) => {
    return {
        [Status.BACKLOG]: tasks.filter(
            (task) => task.status === Status.BACKLOG
        ),
        [Status.IN_PROGRESS]: tasks.filter(
            (task) => task.status === Status.IN_PROGRESS
        ),
        [Status.TODO]: tasks.filter((task) => task.status === Status.TODO),
        [Status.DONE]: tasks.filter((task) => task.status === Status.DONE),
        [Status.CANCELLED]: tasks.filter(
            (task) => task.status === Status.CANCELLED
        ),
    }
}

// Array to define the desired order of task statuses
export const statusOrder = [
    Status.TODO,
    Status.IN_PROGRESS,
    Status.DONE,
    Status.BACKLOG,
    Status.CANCELLED,
]
