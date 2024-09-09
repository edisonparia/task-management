import chroma from 'chroma-js'
import Select, { StylesConfig, components } from 'react-select'
import { TaskTag } from '../graphql/Types' // Importa tu enum TaskTag
import { RiPriceTag3Fill } from 'react-icons/ri'
import { capitalizeWords } from '@/utils/Utils'

interface Option {
    value: TaskTag
    label: string
    background: string
    color: string
}

const getTagColors = (tag: TaskTag) => {
    switch (tag) {
        case TaskTag.ANDROID:
        case TaskTag.NODE_JS:
            return { background: '#70b252', color: '#58a700' } // secondary-5 y secondary-4

        case TaskTag.REACT:
        case TaskTag.IOS:
        case TaskTag.RAILS:
            return { background: '#e5b454', color: '#d99f0e' } // tertiary-5 y tertiary-4

        default:
            return { background: '#d1d1d1', color: '#a1a1a1' } // neutral
    }
}

// Mapea el enum TaskTag a las opciones que usa react-select
const taskTagOptions: Option[] = Object.values(TaskTag).map((tag) => ({
    value: tag,
    label: capitalizeWords(tag),
    ...getTagColors(tag),
}))

// Estilos personalizados para react-select
const colourStyles: StylesConfig<(typeof taskTagOptions)[0], true> = {
    control: (styles, { isFocused }) => ({
        ...styles,
        backgroundColor: 'var(--color-neutral-3)',
        borderColor: isFocused
            ? 'var(--color-neutral-2)'
            : 'var(--color-neutral-3)',
        color: 'var(--color-neutral-1)',
        minWidth: '200px !important',
        width: '100%',
        flexGrow: 1,

        // height: '36px !important',
        minHeight: '36px',
        borderRadius: '6px',
        display: 'flex',
        flex: '1 1 0%',
        alignItems: 'center',
        boxShadow: 'none', // Elimina el shadow predeterminado de react-select
        '&:hover': {
            backgroundColor: 'var(--color-neutral-4)', // Al hover, cambia de color
        },
    }),
    option: (styles, { data, isFocused, isSelected }) => {
        const color = chroma(data.background)
        return {
            ...styles,
            backgroundColor: isSelected
                ? data.background
                : isFocused
                  ? color.alpha(0.1).css()
                  : undefined,
            color: isSelected ? 'var(--color-neutral-1)' : data.color,
            ':active': {
                ...styles[':active'],
                backgroundColor: data.background,
            },
        }
    },
    multiValue: (styles, { data }) => ({
        ...styles,
        backgroundColor: chroma(data.background).alpha(0.1).css(),
    }),
    multiValueLabel: (styles, { data }) => ({
        ...styles,
        color: data.color,
    }),
    multiValueRemove: (styles, { data }) => ({
        ...styles,
        color: data.color,
        ':hover': {
            backgroundColor: data.background,
            color: 'white',
        },
    }),
    menu: (styles) => ({
        ...styles,
        backgroundColor: '#393d41',
    }),
    indicatorSeparator: (styles) => ({
        ...styles,
        backgroundColor: '#393d41',
    }),
    dropdownIndicator: (styles) => ({
        ...styles,
    }),
}

const DropdownIndicator = (props) => {
    return (
        <components.DropdownIndicator {...props}>
            <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 opacity-50"
                aria-hidden="true"
            >
                <path
                    d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                ></path>
            </svg>
        </components.DropdownIndicator>
    )
}

// Componente MultiSelect que usa los TaskTags
export const MultiSelect = ({
    selectedTags,
    setSelectedTags,
}: {
    selectedTags: TaskTag[]
    setSelectedTags: (tags: TaskTag[]) => void
}) => {
    const handleChange = (selected: Option[] | null) => {
        // Si hay opciones seleccionadas, mapea a sus valores
        if (selected) {
            setSelectedTags(selected.map((option) => option.value))
        } else {
            setSelectedTags([]) // Si no hay seleccionados, resetea los tags
        }
    }

    return (
        <Select
            closeMenuOnSelect={false}
            defaultValue={selectedTags.map((tag) =>
                taskTagOptions.find((option) => option.value === tag)
            )}
            isMulti
            options={taskTagOptions} // Usamos las opciones mapeadas del enum TaskTag
            styles={colourStyles} // Aplicamos los estilos personalizados
            onChange={handleChange}
            components={{ DropdownIndicator }}
            placeholder={
                <span className="flex space-x-2 text-neutral-2">
                    <RiPriceTag3Fill size={20} /> <span>Tags</span>
                </span>
            }
        />
    )
}
