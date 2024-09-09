import React from 'react'
import { getRelativeDate } from '@/utils/Utils'

interface DateInfoProps {
  date: Date
}

export const DateInfo: React.FC<DateInfoProps> = ({ date }) => {
  const relativeDate = getRelativeDate(date)

  return (
    <span className="" title={date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}>
      {relativeDate}
    </span>
  )
}
