import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import NotFound from './layout/NotFound'
import { Dashboard } from './layout/Dashboard'

const App: React.FC = () => {
    return (
        <Routes>
            {/* Redirect */}
            <Route path="/" element={<Navigate to="/dashboard/home" replace />} />

            {/* Dashboard layout */}
            <Route path="/dashboard/*" element={<Dashboard />} />

            {/* 404 Page */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default App
