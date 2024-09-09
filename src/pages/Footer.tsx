import React from 'react'
import { RiHeart3Fill } from 'react-icons/ri'

const Footer: React.FC = () => {
    const year = new Date().getFullYear()

    return (
        <footer className="w-full p-4 absolute bottom-0 right-0 sm:relative sm:mt-auto flex justify-end">
            <p className="text-body-s font-normal text-neutral-2 text-right">
                &copy; {year}, made with{' '}
                <RiHeart3Fill className="-mt-0.5 inline-block h-3.5 w-3.5 text-primary-4" />{' '}
                for a better web.
            </p>
        </footer>
    )
}

export default Footer
