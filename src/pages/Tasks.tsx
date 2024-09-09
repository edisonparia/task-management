import React from 'react'
import { useQuery } from '@apollo/client'
import { Task } from '../graphql/Types'
import { GET_TASKS } from '@/graphql/Queries'
import TaskCard from '@/components/TaskCard'
import TopBar from '@/components/TopBar'
// import Loader from '@/components/ui/loader'
import { capitalizeWords, groupTasksByStatus, statusOrder } from '@/utils/Utils'
import { Loading } from '@/components/ui/loading'
import ErrorMessage from '@/components/ui/error-message'

interface GetTasksData {
    tasks: Task[]
}

const Tasks: React.FC = () => {
    const { loading, error, data } = useQuery<GetTasksData>(GET_TASKS)

    if (loading) {
        return <Loading />
    }
    if (error) return <ErrorMessage message={error.message} />

    if (data?.tasks.length === 0) {
        return <p className="text-neutral-2">No tasks found for this status.</p>
    }

    // Agrupar las tareas por estado
    const groupedTasks = groupTasksByStatus(data?.tasks ?? [])

    return (
        <>
            <TopBar />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {statusOrder.map((status) => (
                    <div key={status} className="rounded-lg bg-neutral-5">
                        <h2 className="mb-4 text-body-l font-bold text-neutral-1">
                            {capitalizeWords(status)} (
                            {groupedTasks[status]?.length})
                        </h2>

                        {groupedTasks[status]?.length === 0 ? (
                            <p className="text-neutral-2">
                                No tasks in this status.
                            </p>
                        ) : (
                            groupedTasks[status]?.map((task) => (
                                <TaskCard key={task.id} task={task} />
                            ))
                        )}
                    </div>
                ))}
            </div>
        </>
    )
}

export default Tasks
