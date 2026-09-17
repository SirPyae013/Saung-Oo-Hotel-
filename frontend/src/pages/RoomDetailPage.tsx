import { Link, useParams, useSearchParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, BedDouble, Check, Maximize, Users } from 'lucide-react'
import { rooms, formatPrice } from '../data/hotel'
import { Reveal } from '../components/Reveal'
import { stayFromParams, stayQuery, validateStay } from '../lib/booking'
import NotFoundPage from './NotFoundPage'

export default function RoomDetailPage() {
  const { slug } = useParams()
  const [params] = useSearchParams()
  const room = rooms.find((item) => item.id === slug)
  const stay = stayFromParams(params)
  if (!room) return <NotFoundPage />
  const issue =
    validateStay(stay) ??
    (stay.guests > room.guests
      ? `This room accommodates up to ${room.guests} guests. Please choose a larger room.`
      : null)
  return (
    <div className="container page-space detail-page">
      <Link to={`/rooms?${stayQuery(stay)}`} className="text-link">
        <ArrowLeft size={16} /> Back to rooms & suites
      </Link>
      <Reveal className="detail-heading">
        <span className="eyebrow">{room.tagline}</span>
        <h1>{room.name}</h1>
      </Reveal>
      <Reveal className="detail-image">
        <img src={room.image} alt={room.alt} />
      </Reveal>
      <div className="detail-columns">
        <Reveal>
          <span className="eyebrow">A SPACE TO CALL YOUR OWN</span>
          <h2>
            Slow mornings.
            <br />
            <em>Restful nights.</em>
          </h2>
          <p className="body-copy">{room.description}</p>
          <div className="detail-facts">
            <span>
              <Maximize />
              {room.size} m² of space
            </span>
            <span>
              <BedDouble />
              {room.bed}
            </span>
            <span>
              <Users />
              Up to {room.guests} guests
            </span>
          </div>
          <h3>The little things, taken care of.</h3>
          <div className="amenities">
            {room.features.map((feature) => (
              <span key={feature}>
                <Check size={17} />
                {feature}
              </span>
            ))}
          </div>
        </Reveal>
        <aside className="reservation-card">
          <span className="eyebrow">MAKE THIS YOUR NEXT STAY</span>
          <p className="large-price">
            {formatPrice(room.price)} <span>MMK / night</span>
          </p>
          <p>Breakfast and a warm welcome included.</p>
          <hr />
          <p>
            Check-in from 2:00 PM
            <br />
            Check-out by 12:00 PM
          </p>
          {issue ? (
            <>
              <p className="form-error">{issue}</p>
              <Link to="/rooms" className="button button-dark">
                Update your stay
              </Link>
            </>
          ) : (
            <Link to={`/booking?${stayQuery(stay, room.id)}`} className="button button-dark">
              Reserve this room <ArrowUpRight size={18} />
            </Link>
          )}
          <small>Preview your stay. No payment required.</small>
        </aside>
      </div>
    </div>
  )
}
