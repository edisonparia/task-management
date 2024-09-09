// import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import MyTasks from '@/pages/MyTasks'
import Profile from '@/pages/Profile'
import Settings from '@/pages/Settings'
import Tasks from '@/pages/Tasks'
import {
    RiFunctionLine,
    RiUser3Line,
    RiSettingsLine,
    RiMenuFill,
} from 'react-icons/ri'

const routes = [
    {
        icon: <RiFunctionLine />,
        name: 'Dashboard',
        path: '/home',
        element: <Tasks />,
    },
    {
        icon: <RiMenuFill />,
        name: 'My Tasks',
        path: '/my-tasks',
        element: <MyTasks />,
    },
    {
        icon: <RiUser3Line />,
        name: 'Profile',
        path: '/profile',
        element: <Profile />,
    },
    {
        icon: <RiSettingsLine />,
        name: 'Settings',
        path: '/settings',
        element: <Settings />,
    },
]

export default routes
