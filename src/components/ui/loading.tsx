import React from 'react'
import {
    Atom,
    Commet,
    LifeLine,
    Mosaic,
    OrbitProgress,
    ThreeDot,
} from 'react-loading-indicators'

type LoaderType =
    | 'ThreeDot'
    | 'OrbitProgress'
    | 'Atom'
    | 'Mosaic'
    | 'LifeLine'
    | 'Commet'

interface LoaderProps {
    type?: LoaderType
    color?: string
    text?: string
    textColor?: string
    size?: 'small' | 'medium' | 'large'
}

export const Loading: React.FC<LoaderProps> = ({
    type = 'ThreeDot',
    color = 'var(--color-tertiary-3)',
    text = 'Loading...',
    textColor = 'var(--color-tertiary-3)',
    size = 'small',
}) => {
    const loaderMap = {
        ThreeDot: (
            <ThreeDot
                color={color}
                size={size}
                text={text}
                textColor={textColor}
            />
        ),
        OrbitProgress: (
            <OrbitProgress
                color={color}
                size={size}
                text={text}
                textColor={textColor}
            />
        ),
        Atom: (
            <Atom color={color} size={size} text={text} textColor={textColor} />
        ),
        Mosaic: (
            <Mosaic
                color={color}
                size={size}
                text={text}
                textColor={textColor}
            />
        ),
        LifeLine: (
            <LifeLine
                color={color}
                size={size}
                text={text}
                textColor={textColor}
            />
        ),
        Commet: (
            <Commet
                color={color}
                size={size}
                text={text}
                textColor={textColor}
            />
        ),
    }

    return loaderMap[type] || loaderMap.ThreeDot
}
