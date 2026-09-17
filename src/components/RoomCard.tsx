import { ArrowUpRight, BedDouble, Maximize, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatPrice } from '../data/hotel'
import type { Room } from '../data/hotel'
import type { Stay } from '../lib/booking'
import { stayQuery } from '../lib/booking'

export function RoomCard({ room, stay }: { room: Room; stay?: Stay }) {
  const href = `/rooms/${room.id}${stay ? `?${stayQuery(stay)}` : ''}`
  return (
    <article className="room-card">
      <Link to={href} className="room-image-link" aria-label={`Explore ${room.name}`}>
        <img src={room.image} alt={room.alt} loading="lazy" />
        <span className="image-pill">
          {room.category === 'Suites' ? 'The signature stay' : 'Breakfast included'}
        </span>
        <span className="image-arrow">
          <ArrowUpRight size={22} />
        </span>
      </Link>
      <div className="room-card-body">
        <p className="room-tagline">{room.tagline}</p>
        <h3>
          <Link to={href}>{room.name}</Link>
        </h3>
        <div className="room-facts">
          <span>
            <Maximize size={14} />
            {room.size} m²
          </span>
          <span>
            <BedDouble size={15} />
            {room.bed}
          </span>
          <span>
            <Users size={15} />
            {room.guests} guests
          </span>
        </div>
        <div className="room-card-bottom">
          <span>
            <strong>{formatPrice(room.price)}</strong>{' '}
            <span className="price-currency">MMK / night</span>
          </span>
          <Link to={href} className="text-link">
            Explore <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  )
}
