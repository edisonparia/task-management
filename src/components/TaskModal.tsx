import {
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { RiIncreaseDecreaseFill, RiProgress6Line } from 'react-icons/ri'

import { cn } from '@/lib/utils'
import { DatePicker } from './DatePicker'
import { Input } from './ui/input'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from './ui/select'
import { MultiSelect } from './MultiSelect'
import { useEffect, useState } from 'react'
import { Assignee, PointEstimate, Status, Task, TaskTag } from '@/graphql/Types'
import { capitalizeWords, pointEstimateToNumber } from '@/utils/Utils'
import { UserSelect } from './UserSelect'
import { useMutation } from '@apollo/client'
import { CREATE_TASK, UPDATE_TASK } from '@/graphql/Mutations'
import { GET_TASKS } from '@/graphql/Queries'

interface TaskProps {
    task?: Task
    onSave?: (task: Task) => void
}
interface TasksData {
    tasks: Task[]
}
export const TaskModal = ({ task, onSave = () => {} }: TaskProps) => {
    // Detect if it's an edit or create mode
    const isEditMode = !!task

    // Estado local para los campos del formulario
    const [name, setName] = useState(task?.name || '')
    const [pointEstimate, setPointEstimate] = useState<
        PointEstimate | undefined
    >(task?.pointEstimate || undefined)
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(
        task ? new Date(task.dueDate) : undefined
    )
    const [assignee, setAssignee] = useState<Assignee | undefined>(
        task?.assignee || undefined
    )
    const [selectedTags, setSelectedTags] = useState<TaskTag[]>(
        task?.tags || []
    )
    const [status, setStatus] = useState<Status | undefined>(
        task?.status || undefined
    )

    // Usa el hook useMutation para la mutación createTask y updateTask
    const [createTask, { loading: creating, error: createError }] = useMutation(
        CREATE_TASK,
        {
            onCompleted: (data) => {
                if (onSave) {
                    onSave(data.createTask) // Llama a onSave con los datos de la tarea creada
                } else {
                    console.error('Error creando la tarea: ', createError)
                }
            },
            update: (cache, { data: { createTask } }) => {
                try {
                    // Leemos los datos actuales del cache
                    const existingTasks = cache.readQuery<TasksData>({
                        query: GET_TASKS,
                    })
                    if (existingTasks) {
                        // Escribimos el nuevo estado en el cache, agregando la nueva tarea a la lista
                        cache.writeQuery({
                            query: GET_TASKS,
                            data: {
                                tasks: [...existingTasks.tasks, createTask],
                            },
                        })
                    }
                } catch (error) {
                    console.error('Error actualizando el cache: ', error)
                }
            },
        }
    )

    const [updateTask, { loading: updating, error: updateError }] = useMutation(
        UPDATE_TASK,
        {
            onCompleted: (data) => {
                if (onSave) {
                    onSave(data.updateTask)
                } else {
                    console.error('Error creando la tarea: ', updateError)
                }
            },
        }
    )

    // UseEffect para cargar los datos
    useEffect(() => {
        if (isEditMode && task) {
            console.log('useEffect', task)
            setName(task.name)
            setPointEstimate(task.pointEstimate)
            setSelectedDate(new Date(task.dueDate))
            setAssignee(task.assignee)
            setSelectedTags(task.tags)
            setStatus(task.status)
        }
    }, [task, isEditMode])

    // Reset Form
    const resetForm = () => {
        if (isEditMode) return

        setName('')
        setPointEstimate(undefined)
        setSelectedDate(undefined)
        setAssignee(undefined)
        setSelectedTags([])
        setStatus(undefined)
    }
    // Función para manejar la creación de la tarea
    const handleSave = () => {
        if (
            !name ||
            !pointEstimate ||
            !status ||
            !selectedDate ||
            selectedTags.length === 0
        ) {
            console.error('Por favor, completa todos los campos obligatorios.')
            return
        }
        const taskInput = {
            name,
            pointEstimate,
            status,
            dueDate: selectedDate.toISOString(), // Convertimos la fecha a formato ISO
            assigneeId: assignee?.id,
            tags: selectedTags,
        }
        console.log(taskInput)
        if (isEditMode) {
            // Actualizar tarea
            updateTask({
                variables: {
                    input: {
                        id: task.id, // Necesitamos el ID
                        ...taskInput,
                    },
                },
            })
        } else {
            //  nueva tarea
            createTask({
                variables: {
                    input: taskInput,
                },
            })
        }
    }
    const isSaveDisabled =
        !name || !pointEstimate || !status || selectedTags.length === 0

    return (
        <>
            <AlertDialogContent className="max-w-6xl rounded-lg bg-neutral-4 p-6">
                <AlertDialogTitle className="mb-4">
                    <Input
                        type="text"
                        name="name"
                        className="w-full border-neutral-3 bg-neutral-3 text-neutral-1 placeholder-neutral-2 hover:bg-neutral-4 focus:border-neutral-2"
                        placeholder="Task Title"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </AlertDialogTitle>

                {/* Fila 2: 4 Text Inputs y DatePicker */}
                <AlertDialogDescription className="mb-4 flex flex-1 flex-wrap gap-4 text-body-m">
                    {/* Estimate */}

                    <Select
                        onValueChange={(value: string) =>
                            setPointEstimate(value as PointEstimate)
                        }
                        value={pointEstimate}
                    >
                        <SelectTrigger className="min-w-[200px] flex-1 border-neutral-3 bg-neutral-3 text-neutral-1 hover:bg-neutral-4 focus:border-neutral-2">
                            <SelectValue
                                placeholder={
                                    <div className="flex space-x-2 text-neutral-2">
                                        <RiIncreaseDecreaseFill size={20} />{' '}
                                        <span>Estimate</span>
                                    </div>
                                }
                            />
                        </SelectTrigger>
                        <SelectContent className="bg-neutral-3 text-neutral-1">
                            <SelectGroup>
                                <SelectLabel className="text-neutral-2">
                                    Estimate
                                </SelectLabel>
                                {Object.values(PointEstimate).map((points) => (
                                    <SelectItem
                                        key={points}
                                        value={points}
                                        className="space-x-2 focus:bg-neutral-4 focus:text-neutral-1"
                                    >
                                        <div className="flex space-x-2">
                                            <RiIncreaseDecreaseFill
                                                size={20}
                                                className="text-neutral-1"
                                            />{' '}
                                            <span>
                                                {pointEstimateToNumber[points]}{' '}
                                                Points
                                            </span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    {/* Status */}
                    <Select
                        onValueChange={(value: string) =>
                            setStatus(value as Status)
                        }
                        value={status}
                    >
                        <SelectTrigger className="min-w-[200px] flex-1 border-neutral-3 bg-neutral-3 text-neutral-1 hover:bg-neutral-4 focus:border-neutral-2">
                            <SelectValue
                                placeholder={
                                    <div className="flex space-x-2 text-neutral-2">
                                        <RiProgress6Line size={20} />{' '}
                                        <span>Status</span>
                                    </div>
                                }
                            />
                        </SelectTrigger>
                        <SelectContent className="bg-neutral-3 text-neutral-1">
                            <SelectGroup>
                                <SelectLabel className="text-neutral-2">
                                    Status
                                </SelectLabel>
                                {Object.values(Status).map((status) => (
                                    <SelectItem
                                        key={status}
                                        value={status}
                                        className="space-x-2 focus:bg-neutral-4 focus:text-neutral-1"
                                    >
                                        <div className="flex space-x-2">
                                            <RiProgress6Line
                                                size={20}
                                                className="text-neutral-1"
                                            />{' '}
                                            <span>
                                                {capitalizeWords(status)}
                                            </span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    {/* Assignate */}
                    <UserSelect
                        onUserChange={setAssignee}
                        value={assignee?.id}
                    />

                    {/* Tags */}
                    <MultiSelect
                        selectedTags={selectedTags}
                        setSelectedTags={setSelectedTags}
                    />
                    {/* Due date (DatePicker) */}
                    <DatePicker
                        onDateChange={setSelectedDate}
                        value={selectedDate}
                    />
                </AlertDialogDescription>

                {/* Fila 3: Botones */}
                <AlertDialogFooter className="mt-6 flex justify-end space-x-2">
                    <AlertDialogCancel
                        className="rounded-md border border-neutral-4 bg-neutral-3 px-4 py-2 text-neutral-1 hover:border-neutral-3 hover:bg-neutral-4 hover:text-neutral-1"
                        onClick={resetForm}
                    >
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        className={cn(
                            'rounded-md px-4 py-2',
                            isSaveDisabled
                                ? 'cursor-not-allowed bg-primary-2 text-neutral-1'
                                : 'bg-primary-4 text-neutral-1 hover:bg-primary-3'
                        )}
                        onClick={handleSave}
                        disabled={isSaveDisabled}
                    >
                        {isEditMode
                            ? updating
                                ? 'Updating...'
                                : 'Update'
                            : creating
                              ? 'Creating...'
                              : 'Create'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </>
    )
}
