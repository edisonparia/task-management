import React from 'react'

const Loader: React.FC = () => {
    return (
        <div className="loader h-5 w-32 bg-neutral-1 relative overflow-hidden rounded-md">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-2 to-transparent animate-loader"></div>
        </div>
    )
}

export default Loader
