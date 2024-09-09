import { useState } from 'react'
import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'

// Props: Añadimos la función de callback onDateChange
interface DatePickerProps {
    value?: Date; // Fecha seleccionada actual
    onDateChange: (date: Date | undefined) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({ value, onDateChange }) => {
    const [date, setDate] = useState<Date | undefined>(value)

    // Llamamos a la función de callback cada vez que cambia la fecha
    const handleDateChange = (selectedDate: Date | undefined) => {
        setDate(selectedDate);
        onDateChange(selectedDate); // Pasamos la fecha seleccionada al padre
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    className={cn(
                        'min-w-[200px] flex-1 justify-start text-left',
                        !date && 'text-neutral-1',
                        'border-neutral-3 bg-neutral-3 text-neutral-1', 
                        'hover:bg-neutral-4 hover:text-neutral-1'
                        
                    )}
                >
                    <CalendarIcon className={cn('mr-2 h-4 w-4', date? 'text-neutral-1':'text-neutral-2')} />{' '}
                    {/* Icono de calendario */}
                    {date ? (
                        format(date, 'MMMM dd, yyyy')
                    ) : (
                        <span className='text-neutral-2'>Due date</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateChange} 
                    className="bg-neutral-4 text-neutral-1" 
                />
            </PopoverContent>
        </Popover>
    )
}
