import { useQuery } from '@apollo/client'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { GET_USERS } from '@/graphql/Queries'
import { RiUser3Fill } from 'react-icons/ri'
import { capitalizeWords } from '@/utils/Utils'
import { Assignee } from '@/graphql/Types'
import Avvvatars from 'avvvatars-react'

export const UserSelect = ({
    value,
    onUserChange,
}: {
    value?: string
    onUserChange: (user: Assignee) => void
}) => {
    const { loading, error, data } = useQuery(GET_USERS)

    if (loading) return null
    if (error) return null

    const users = data?.users || []

    // Handle user selection change
    const handleValueChange = (value: string) => {
        const selectedUser = users.find((user: Assignee) => user.id === value)
        if (selectedUser) {
            // Trigger the onUserChange callback with the selected user's data
            onUserChange({
                id: selectedUser.id,
                fullName: selectedUser.fullName,
            })
        }
    }

    return (
        <Select onValueChange={handleValueChange} value={value}>
            <SelectTrigger className="min-w-[200px] flex-1 border-neutral-3 bg-neutral-3 text-neutral-1 hover:bg-neutral-4 focus:border-neutral-2">
                <SelectValue
                    placeholder={
                        <div className="flex space-x-2 text-neutral-2">
                            <RiUser3Fill size={20} /> <span>Assignee</span>
                        </div>
                    }
                />
            </SelectTrigger>
            <SelectContent className="bg-neutral-3 text-neutral-1">
                {users.map((user: Assignee) => (
                    <SelectItem
                        key={user.id}
                        value={user.id}
                        className="space-x-2 focus:bg-neutral-4 focus:text-neutral-1"
                    >
                        <div className="flex items-center space-x-2">
                            {user.avatar ? (
                                <img
                                    className="h-8 w-8 rounded-full"
                                    src={user.avatar}
                                    alt={user.fullName || 'Unassigned'}
                                />
                            ) : (
                                <div className="h-8 w-8">
                                    <Avvvatars value={user.fullName} />
                                </div>
                            )}
                            <span>{capitalizeWords(user.fullName)}</span>{' '}
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
