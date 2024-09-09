import React from 'react'
import { Link } from 'react-router-dom'

const NotFound: React.FC = () => {
    return (
        <div className="flex h-screen flex-col items-center justify-center">
            <h1 className="mb-4 text-4xl font-bold text-neutral-1">404 - Page Not Found</h1>
            <p className="text-neutral-2 mb-8 text-lg">
                Sorry, the page you are looking for does not exist.
            </p>
            <Link
                to="/dashboard/home"
                className="bg-primary-4 hover:bg-primary-3 rounded-lg px-6 py-2 text-white"
            >
                Go Back to Home
            </Link>
        </div>
    )
}

export default NotFound
