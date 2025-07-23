'use client'

import * as React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { motion } from 'framer-motion'

interface TimePickerInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  picker: 'hours' | 'minutes' | 'seconds' | 'period'
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  onRightFocus?: () => void
  onLeftFocus?: () => void
}

const TimePickerInput = React.forwardRef<HTMLInputElement | HTMLButtonElement, TimePickerInputProps>(
  ({
    picker,
    date,
    setDate,
    onRightFocus,
    onLeftFocus,
    ...props
  }, ref) => {
    React.useEffect(() => {
      if (ref && 'current' in ref && ref.current) {
        ref.current.addEventListener('keydown', (e) => handleKeyDown(e as KeyboardEvent))
      }
      return () => {
        if (ref && 'current' in ref && ref.current) {
          ref.current.removeEventListener('keydown', (e) => handleKeyDown(e as KeyboardEvent))
        }
      }
    }, [date, ref])

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        onRightFocus && onRightFocus()
      } else if (e.key === 'ArrowLeft') {
        onLeftFocus && onLeftFocus()
      }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      if (!date) return

      const newDate = new Date(date)
      if (picker === 'hours') {
        const hours = parseInt(value)
        if (!isNaN(hours) && hours >= 0 && hours <= 23) {
          newDate.setHours(hours)
          setDate(newDate)
        }
      } else if (picker === 'minutes') {
        const minutes = parseInt(value)
        if (!isNaN(minutes) && minutes >= 0 && minutes <= 59) {
          newDate.setMinutes(minutes)
          setDate(newDate)
        }
      } else if (picker === 'seconds') {
        const seconds = parseInt(value)
        if (!isNaN(seconds) && seconds >= 0 && seconds <= 59) {
          newDate.setSeconds(seconds)
          setDate(newDate)
        }
      }
    }

    const displayedValue = React.useMemo(() => {
      if (!date) return ''

      if (picker === 'hours') {
        return date.getHours().toString().padStart(2, '0')
      } else if (picker === 'minutes') {
        return date.getMinutes().toString().padStart(2, '0')
      } else if (picker === 'seconds') {
        return date.getSeconds().toString().padStart(2, '0')
      }
      return ''
    }, [date, picker])

    return (
      <div className="grid gap-1 text-center">
        {picker !== 'period' && (
          <Label htmlFor={picker} className="text-xs text-black">
            {picker.charAt(0).toUpperCase() + picker.slice(1)}
          </Label>
        )}
        {picker === 'period' ? (
          <Select
            onValueChange={(value) => {
              if (!date) return
              const newDate = new Date(date)
              const currentHours = newDate.getHours()
              if (value === 'PM' && currentHours < 12) {
                newDate.setHours(currentHours + 12)
              } else if (value === 'AM' && currentHours >= 12) {
                newDate.setHours(currentHours - 12)
              }
              setDate(newDate)
            }}
            value={date ? (date.getHours() >= 12 ? 'PM' : 'AM') : 'AM'}
          >
            <SelectTrigger ref={ref as React.Ref<HTMLButtonElement>} className="w-[60px] bg-white text-black border-black focus:border-[#A6033F] focus:ring-[#A6033F]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white text-black border border-black shadow-lg">
              <SelectItem value="AM" className="hover:bg-gray-100 cursor-pointer">AM</SelectItem>
              <SelectItem value="PM" className="hover:bg-gray-100 cursor-pointer">PM</SelectItem>
            </SelectContent>
          </Select>
        ) : (
          <Input
            ref={ref as React.Ref<HTMLInputElement>}
            id={picker}
            name={picker}
            className="w-[48px] text-center bg-white text-black border-black focus:border-[#A6033F] focus:ring-[#A6033F]"
            value={displayedValue}
            onChange={handleChange}
            {...props}
          />
        )}
      </div>
    )
  }
)
TimePickerInput.displayName = 'TimePickerInput'

interface TimePickerProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
}

export function TimePicker({
  date,
  setDate,
}: TimePickerProps) {
  const minuteRef = React.useRef<HTMLInputElement>(null)
  const secondRef = React.useRef<HTMLInputElement>(null)
  const periodRef = React.useRef<HTMLButtonElement>(null)

  return (
    <div className="flex items-center gap-2">
      <TimePickerInput
        picker="hours"
        date={date}
        setDate={setDate}
        onRightFocus={() => minuteRef.current?.focus()}
      />
      <div className="text-xl font-bold">:</div>
      <TimePickerInput
        picker="minutes"
        date={date}
        setDate={setDate}
        ref={minuteRef}
        onLeftFocus={() => {}}
        onRightFocus={() => secondRef.current?.focus()}
      />
      <div className="text-xl font-bold">:</div>
      <TimePickerInput
        picker="seconds"
        date={date}
        setDate={setDate}
        ref={secondRef}
        onLeftFocus={() => minuteRef.current?.focus()}
        onRightFocus={() => periodRef.current?.focus()}
      />
      <TimePickerInput
        picker="period"
        date={date}
        setDate={setDate}
        ref={periodRef}
        onLeftFocus={() => secondRef.current?.focus()}
      />
    </div>
  )
}