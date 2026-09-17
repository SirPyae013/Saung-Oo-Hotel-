import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { BedDouble } from 'lucide-react'
import { BookingSearch } from '../components/BookingSearch'
import { Reveal } from '../components/Reveal'
import { RoomCard } from '../components/RoomCard'
import { rooms } from '../data/hotel'
import { stayFromParams, validateStay } from '../lib/booking'

export default function RoomsPage() {
  const [params] = useSearchParams()
  const stay = stayFromParams(params)
  const [category, setCategory] = useState('All stays')
  const error = validateStay(stay)
  const filtered = rooms.filter(
    (room) =>
      (category === 'All stays' || room.category === category) &&
      (!params.has('guests') || room.guests >= stay.guests),
  )
  return (
    <div className="page-space container">
      <Reveal className="page-heading">
        <span className="eyebrow">YOUR PERSONAL SANCTUARY</span>
        <h1>
          Settle into <em>something lovely.</em>
        </h1>
        <p>Warm spaces. Thoughtful details. A very good night’s sleep.</p>
      </Reveal>
      <BookingSearch key={params.toString()} initial={stay} compact />
      <div className="rooms-toolbar">
        <div className="filter-pills" role="group" aria-label="Filter room types">
          {['All stays', 'Rooms', 'Suites'].map((item) => (
            <button
              aria-pressed={category === item}
              className={category === item ? 'selected' : ''}
              onClick={() => setCategory(item)}
              key={item}
            >
              {item}
            </button>
          ))}
        </div>
        <span>
          {filtered.length} {filtered.length === 1 ? 'stay' : 'stays'} to make your own
        </span>
      </div>
      {error && (
        <p className="form-error" role="alert">
          {error} Update your search to continue.
        </p>
      )}
      <div className="room-grid">
        {filtered.map((room, index) => (
          <Reveal key={room.id} delay={index * 0.08}>
            <RoomCard room={room} stay={stay} />
          </Reveal>
        ))}
      </div>
      {!filtered.length && (
        <div className="empty-state">
          <BedDouble size={38} />
          <h2>A little more room?</h2>
          <p>Try suites for up to four guests, or change your search.</p>
          <button className="button button-dark" onClick={() => setCategory('All stays')}>
            Show all room types
          </button>
        </div>
      )}
      <p className="demo-note">
        Explore sample rooms and nightly rates. Availability and reservations are simulated in this
        frontend preview.
      </p>
    </div>
  )
}
