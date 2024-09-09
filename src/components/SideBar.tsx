import React from 'react'
import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'

interface Route {
    name: string
    path: string
    icon?: JSX.Element // icon is optional, but it will be a JSX element if provided
}
interface SideBarProps {
    routes: Route[] // Update to specify an array of Route objects
}

const SideBar: React.FC<SideBarProps> = ({ routes }) => {
    return (
        <aside className="flex h-[calc(100vh-64px)] w-[232px] flex-col items-center rounded-3xl bg-neutral-4 pt-4 text-neutral-2">
            <div className="mb-10 items-center">
                <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M30.4218 26.5565C35.7216 25.1082 39.6183 20.2592 39.6183 14.5C39.6183 7.71624 34.214 2.1948 27.477 2.0066V2H8.06627H0L6.69512 10.3311H8.06627V10.3333H27.181C29.4535 10.3664 31.2857 12.2186 31.2857 14.4989C31.2857 16.8002 29.4204 18.6656 27.1194 18.6656H24.0811H13.3913L28.9285 38H39.6172L30.4218 26.5565Z"
                        fill="white"
                    />
                    <path
                        d="M9 38C12.0376 38 14.5 35.5376 14.5 32.5C14.5 29.4624 12.0376 27 9 27C5.96243 27 3.5 29.4624 3.5 32.5C3.5 35.5376 5.96243 38 9 38Z"
                        fill="white"
                    />
                </svg>
            </div>

            {/* Navigation Buttons */}
            <nav className="flex w-full flex-col space-y-4">
                {routes.map((route) => {
                    return (
                        <NavLink
                            to={`/dashboard${route.path}`}
                            key={route.name}
                            className={({ isActive }) =>
                                cn(
                                    'flex w-full items-center justify-start px-4 py-2 transition-colors duration-200', // General styles
                                    isActive
                                        ? 'border-r-4 border-primary-4 bg-primary-5 text-primary-4'
                                        : 'text-neutral-2' // Active styles
                                )
                            }
                        >
                            {route.icon && (
                                <span className="mr-2">{route.icon}</span>
                            )}
                            <span className="uppercase">{route.name}</span>
                        </NavLink>
                    )
                })}
            </nav>
        </aside>
    )
}

export default SideBar
