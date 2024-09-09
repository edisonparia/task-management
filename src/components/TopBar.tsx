import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { RiAddFill, RiFunctionLine, RiMenuFill } from 'react-icons/ri'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { TaskModal } from './TaskModal'
import { AlertDialog, AlertDialogTrigger } from './ui/alert-dialog'

const TopBar: React.FC = () => {
    const location = useLocation()
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleSave = () => {
        console.log('Task created successfully!!!')
    }

    return (
        <div className="flex w-full items-center justify-between bg-neutral-5 p-4">
            <div className="flex space-x-4">
                <Link to="/dashboard">
                    <Button
                        variant="ghost"
                        className={cn(
                            'p-2',
                            location.pathname === '/dashboard/home'
                                ? 'text-primary-4'
                                : 'text-neutral-1'
                        )}
                    >
                        <RiFunctionLine size={24} />
                    </Button>
                </Link>

                <Link to="/dashboard/my-tasks">
                    <Button
                        variant="ghost"
                        className={cn(
                            'p-2',
                            location.pathname === '/dashboard/my-tasks'
                                ? 'text-primary-4'
                                : 'text-neutral-1'
                        )}
                    >
                        <RiMenuFill size={24} />
                    </Button>
                </Link>
            </div>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button
                        variant="destructive"
                        className="p-2 text-neutral-1 bg-primary-4"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <RiAddFill size={24} />
                    </Button>
                </AlertDialogTrigger>

                {isModalOpen && (
                    <TaskModal
                        task={undefined}
                        onSave={handleSave}
                        // onClose={() => setIsModalOpen(false)}
                    />
                )}
            </AlertDialog>
        </div>
    )
}

export default TopBar
