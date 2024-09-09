import { GET_PROFILE } from '@/graphql/Queries'
import { useQuery } from '@apollo/client'
import React from 'react'
import { RiSearchLine, RiNotification3Line } from 'react-icons/ri'
import Avvvatars from 'avvvatars-react'
import { Loading } from './ui/loading'
import ErrorMessage from './ui/error-message'

const SearchBar: React.FC = () => {

    // Ejecutamos la consulta GraphQL para obtener el perfil del usuario
    const { loading, error, data } = useQuery(GET_PROFILE)

    if (loading) return <Loading />

    if (error) return <ErrorMessage message={error.message} />

    const { profile } = data

    return (
        <div className="flex  items-center rounded-lg bg-neutral-4 px-4 py-2 text-neutral-2 shadow-md">
            {/* Search Input with Search Icon */}
            <div className="relative flex flex-1 items-center">
                <RiSearchLine
                    className="absolute left-3 text-neutral-2"
                    size={20}
                />
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full rounded-lg bg-neutral-4 py-2 pl-10 pr-4 text-neutral-2 focus:outline-none"
                />
            </div>

            {/* Notification Button */}
            <button className="ml-4 rounded-full p-2 text-neutral-2 hover:bg-gray-700">
                <RiNotification3Line size={20} />
            </button>

            {/* User Profile Button */}
            <button className="ml-4">
                {profile.avatar ? (
                    <img
                        className="h-8 w-8 rounded-full"
                        src={profile?.avatar}
                        alt={profile.fullName || 'Unassigned'}
                    />
                ) : (
                    <Avvvatars value={profile.fullName} />
                )}
            </button>
        </div>
    )
}

export default SearchBar
