import React from 'react'
import { useQuery } from '@apollo/client'
import { RiArrowDownSFill } from 'react-icons/ri'
import Avvvatars from 'avvvatars-react'
import { Task, TaskTag } from '../graphql/Types'
import { format, isBefore, differenceInDays } from 'date-fns'
import { GET_TASKS } from '@/graphql/Queries'
import { capitalizeWords, getDueDateColor, getTagColors, groupTasksByStatus, pointEstimateToNumber, statusOrder } from '@/utils/Utils'
import TopBar from '@/components/TopBar'
import ErrorMessage from '@/components/ui/error-message'
import { Loading } from '@/components/ui/loading'

interface GetTasksData {
    tasks: Task[]
}

const MyTasks: React.FC = () => {
    const { loading, error, data } = useQuery<GetTasksData>(GET_TASKS)

    if (loading) return <Loading />

    if (error) return <ErrorMessage message={error.message} />
    
    if (!data || data.tasks.length === 0) return <p>No tasks found.</p>

    // Agrupar las tareas por su estado
    const groupedTasks = groupTasksByStatus(data?.tasks ?? [])

   
    // Función para determinar el color del borde izquierdo de la tarea según la urgencia
    const getDueDateColorBorder = (dueDate: string) => {
        const now = new Date()
        const dueDateObj = new Date(dueDate)

        if (isBefore(dueDateObj, now)) return 'border-primary-4'
        const daysDifference = differenceInDays(dueDateObj, now)
        if (daysDifference <= 2) return 'border-tertiary-4'

        return 'border-neutral-1' // On time (blanco)
    }

    return (
        <div>
            <TopBar />

            {/* Tabla de Títulos */}
            <div className="mb-4 rounded-lg border border-neutral-3 bg-neutral-4">
                <table className="h-14 w-full table-auto text-left text-body-m text-neutral-1">
                    <thead className="border-b border-neutral-3 bg-neutral-4 p-2">
                        <tr>
                            <th className="w-1/3 border-r border-neutral-3 p-2"># Task Name</th>
                            <th className="w-1/6 border-r border-neutral-3 p-2">Task Tags</th>
                            <th className="w-1/6 border-r border-neutral-3 p-2">Estimate</th>
                            <th className="w-1/6 border-r border-neutral-3 p-2">Task Assign Name</th>
                            <th className="w-1/6 p-2">Due Date</th>
                        </tr>
                    </thead>
                </table>
            </div>

            {/* Iterar sobre cada grupo de tareas por estado en el orden definido */}
            {statusOrder.map((status) => (
                <div key={status} className="mb-8">
                    <div className="overflow-x-auto rounded-lg">
                        <table className="h-14 w-full border-collapse">
                            <thead className="border-b border-neutral-3 bg-neutral-4 p-2">
                                <tr className="h-14">
                                    <th className="mb-4 p-2 text-left text-body-l font-bold text-neutral-1" colSpan={5}>
                                        <div className="flex items-center">
                                            <RiArrowDownSFill className="mr-2 h-6 w-6" />
                                            {capitalizeWords(status)} ({groupedTasks[status]?.length ?? 0})
                                        </div>
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="w-full table-auto text-left text-body-m text-neutral-1">
                                {groupedTasks[status]?.map((task, index) => {
                                    return (
                                        <tr key={task.id} className={`border-l-4 ${getDueDateColorBorder(task.dueDate)} h-14 border-neutral-3 bg-neutral-4`}>
                                            <td className="border border-neutral-3 p-2">{index + 1} {task.name}</td>

                                            <td className="w-1/6 border border-neutral-3 p-2">
                                                <div className="mt-2 flex space-x-2">
                                                    {task.tags.map((tag) => (
                                                        <span key={tag} className={`rounded-md p-1 text-body-m font-bold ${getTagColors(tag as TaskTag)}`}>
                                                            {TaskTag[tag as keyof typeof TaskTag]}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>

                                            <td className="w-1/6 border border-neutral-3 p-2">
                                                {pointEstimateToNumber[task.pointEstimate]} Points
                                            </td>

                                            <td className="w-1/6 border border-neutral-3 p-2">
                                                <div className="flex items-center space-x-2">
                                                    {task.assignee?.avatar ? (
                                                        <img className="h-8 w-8 rounded-full" src={task.assignee?.avatar} alt={task.assignee?.fullName || 'Unassigned'} />
                                                    ) : (
                                                        <div className="h-8 w-8">
                                                            <Avvvatars value={task.assignee?.fullName} />
                                                        </div>
                                                    )}
                                                    <span>{capitalizeWords(task.assignee?.fullName) || 'Unassigned'}</span>
                                                </div>
                                            </td>

                                            <td className="w-1/6 border border-neutral-3 p-2">
                                                <span className={`flex items-center space-x-1 text-body-m font-bold uppercase ${getDueDateColor(task.dueDate)}`}>
                                                    {format(new Date(task.dueDate), 'MMMM dd, yyyy')}
                                                </span>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MyTasks
