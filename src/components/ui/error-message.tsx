import React from 'react'

interface ErrorMessageProps {
    message: string // El mensaje de error que será mostrado
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    return (
        <p className="text-primary-4">
            <strong>Error:</strong> {message}
        </p>
    )
}

export default ErrorMessage
