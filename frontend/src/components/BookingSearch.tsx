import { useState } from 'react'
import { ArrowUpRight, CalendarDays, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { addDays, dateString, defaultStay, stayQuery, validateStay } from '../lib/booking'
import type { Stay } from '../lib/booking'

export function BookingSearch({ initial, compact = false }: { initial?: Stay; compact?: boolean }) {
  const [stay, setStay] = useState(initial ?? defaultStay())
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  return (
    <form
      className={`booking-search ${compact ? 'compact' : ''}`}
      onSubmit={(event) => {
        event.preventDefault()
        const issue = validateStay(stay)
        setError(issue)
        if (!issue) navigate(`/rooms?${stayQuery(stay)}`)
      }}
    >
      <label className="search-field">
        <CalendarDays size={20} />
        <span>
          <span className="field-label">Check-in</span>
          <input
            aria-label="Check-in"
            type="date"
            required
            min={dateString(new Date())}
            value={stay.checkIn}
            onChange={(event) => {
              const checkIn = event.target.value
              setStay({
                ...stay,
                checkIn,
                checkOut: checkIn >= stay.checkOut ? addDays(checkIn, 2) : stay.checkOut,
              })
            }}
          />
        </span>
      </label>
      <label className="search-field">
        <CalendarDays size={20} />
        <span>
          <span className="field-label">Check-out</span>
          <input
            aria-label="Check-out"
            type="date"
            required
            min={addDays(stay.checkIn, 1)}
            value={stay.checkOut}
            onChange={(event) => setStay({ ...stay, checkOut: event.target.value })}
          />
        </span>
      </label>
      <label className="search-field guests-field">
        <Users size={20} />
        <span>
          <span className="field-label">Guests</span>
          <select
            aria-label="Guests"
            value={stay.guests}
            onChange={(event) => setStay({ ...stay, guests: Number(event.target.value) })}
          >
            {[1, 2, 3, 4].map((count) => (
              <option key={count} value={count}>
                {count} {count === 1 ? 'guest' : 'guests'}
              </option>
            ))}
          </select>
        </span>
      </label>
      <button className="button button-dark" type="submit">
        Find your stay <ArrowUpRight size={19} />
      </button>
      {error && (
        <p className="form-error search-error" role="alert">
          {error}
        </p>
      )}
    </form>
  )
}
