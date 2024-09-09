import React from 'react'
import { Route, Routes } from 'react-router-dom'
import routes from '../routes/routes' // Importa las rutas
import SearchBar from '@/components/SearchBar'
import SideBar from '@/components/SideBar'
import Footer from '@/pages/Footer'
import NotFound from './NotFound'

export const Dashboard: React.FC = () => {
    return (
        <div className="flex min-h-screen gap-8 p-8">
            {' '}
            <SideBar routes={routes} />
            <div className="flex flex-1 flex-col rounded-3xl bg-neutral-5">
                <SearchBar />
                <Routes>
                    {routes.map((route) => (
                        <Route
                            key={route.name}
                            path={route.path}
                            element={route.element}
                        />
                    ))}
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
            </div>
        </div>
    )
}
