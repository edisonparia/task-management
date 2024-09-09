import React from 'react'
import { TaskTag, TaskProps } from '../graphql/Types'
import {
    RiNodeTree,
    RiDeleteBin6Line,
    RiPencilLine,
    RiAlarmLine,
    RiMoreFill,
    RiChat3Line,
    RiAttachment2,
} from 'react-icons/ri'

import * as Popover from '@radix-ui/react-popover'
import { TaskModal } from './TaskModal'
import {
    getDueDateColor,
    getTagColors,
    pointEstimateToNumber,
} from '@/utils/Utils'
import { DateInfo } from './ui/date-info'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle,
    AlertDialogTrigger,
} from './ui/alert-dialog'
import { useMutation } from '@apollo/client'
import { GET_TASKS } from '@/graphql/Queries'
import { DELETE_TASK } from '@/graphql/Mutations'
import Avvvatars from 'avvvatars-react'

const TaskCard: React.FC<TaskProps> = ({ task }) => {
    const pointEstimateNumber = pointEstimateToNumber[task.pointEstimate]

    const [deleteTask, { loading: deleting }] = useMutation(DELETE_TASK, {
        onCompleted: () => {
            // mutación se completa con éxito
            console.log('Task deleted:', task.id)
        },
        update: (cache, { data: { deleteTask } }) => {
            const existingTasks: any = cache.readQuery({ query: GET_TASKS })

            // Actualizamos el cache p
            if (existingTasks) {
                cache.writeQuery({
                    query: GET_TASKS,
                    data: {
                        tasks: existingTasks.tasks.filter(
                            (t: any) => t.id !== deleteTask.id
                        ),
                    },
                })
            }
        },
    })

    const handleDelete = () => {
        deleteTask({
            variables: { input: { id: task.id } },
        })
    }
    const handleSave = () => {
        console.log('Task updated successfully!!!')
    }

    return (
        <div className="mb-4 rounded-lg bg-neutral-4 p-4 text-neutral-1">
            <div className="flex items-center justify-between">
                <h3 className="text-body-l font-bold">{task.name}</h3>

                <Popover.Root>
                    <Popover.Trigger asChild>
                        <button>
                            <RiMoreFill className="h-6 w-6 text-neutral-2" />
                        </button>
                    </Popover.Trigger>
                    <Popover.Content className="rounded-lg bg-neutral-3 p-2 shadow-lg">
                        <div className="flex flex-col space-y-2">
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <div className="flex w-full cursor-pointer items-center space-x-2 rounded-lg p-2 hover:bg-neutral-4">
                                        <RiPencilLine className="h-5 w-5" />
                                        <span>Edit</span>
                                    </div>
                                </AlertDialogTrigger>

                                <TaskModal task={task} onSave={handleSave} />
                            </AlertDialog>

                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <button className="flex items-center space-x-2 rounded-lg p-2 hover:bg-neutral-4">
                                        <RiDeleteBin6Line className="h-5 w-5" />
                                        <span>Delete</span>
                                    </button>
                                </AlertDialogTrigger>

                                {/* Cuadro de diálogo de confirmación */}
                                <AlertDialogContent className="border-neutral-4 bg-neutral-4 p-6 text-neutral-1">
                                    <AlertDialogTitle>
                                        Delete Task: {task.name}
                                    </AlertDialogTitle>
                                    <AlertDialogDescription className="text-neutral-1">
                                        Are you sure you want to delete this
                                        task? This action cannot be undone.
                                    </AlertDialogDescription>
                                    <div className="flex justify-end space-x-2">
                                        <AlertDialogCancel className="rounded-md border border-neutral-4 bg-neutral-3 px-4 py-2 text-neutral-1 hover:border-neutral-3 hover:bg-neutral-4 hover:text-neutral-1">
                                            Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={handleDelete}
                                            className="rounded-md bg-red-600 px-4 py-2 text-neutral-1 hover:bg-red-500"
                                        >
                                            {deleting
                                                ? 'Deleting...'
                                                : 'Delete'}
                                        </AlertDialogAction>
                                    </div>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </Popover.Content>
                </Popover.Root>
            </div>

            <div className="mt-2 flex justify-between text-body-m font-bold">
                <p>{pointEstimateNumber} Points</p>

                <div
                    className={`flex items-center space-x-1 rounded-md uppercase ${getDueDateColor(
                        task.dueDate
                    )}`}
                >
                    <RiAlarmLine />
                    <DateInfo date={new Date(task.dueDate)} />
                </div>
            </div>

            <div className="mt-2 flex space-x-2">
                {task.tags.map((tag) => {
                    return (
                        <span
                            key={tag}
                            className={`rounded-md p-1 text-body-m font-bold ${getTagColors(tag as TaskTag)}`}
                        >
                            {TaskTag[tag as keyof typeof TaskTag]}
                        </span>
                    )
                })}
            </div>

            <div className="mt-2 flex items-center justify-between">
                {/* Avatar */}
                <div className="flex items-center space-x-2">
                    {task.assignee?.avatar ? (
                        <img
                            className="h-8 w-8 rounded-full"
                            src={task.assignee?.avatar}
                            alt={task.assignee?.fullName || 'Unassigned'}
                        />
                    ) : (
                        <Avvvatars value={task.assignee?.fullName} />
                    )}
                </div>

                <div className="flex space-x-4">
                    <div className="flex items-center space-x-1">
                        <RiAttachment2 className="h-4 w-4" />
                    </div>

                    <div className="flex items-center space-x-1">
                        <span className="text-body-m">3</span>
                        <RiNodeTree className="h-4 w-4" />
                    </div>

                    <div className="flex items-center space-x-1">
                        <span className="text-body-m">5</span>
                        <RiChat3Line className="h-4 w-4" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskCard
