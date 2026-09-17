import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, Check, CheckCircle2, ShieldCheck } from 'lucide-react'
import { formatPrice, rooms } from '../data/hotel'
import {
  addDays,
  dateString,
  displayDate,
  nightsBetween,
  stayFromParams,
  stayQuery,
  validateStay,
} from '../lib/booking'
import { Reveal } from '../components/Reveal'

export default function BookingPage() {
  const [params] = useSearchParams()
  const room = rooms.find((item) => item.id === params.get('room'))
  const [stay, setStay] = useState(() => stayFromParams(params))
  const [step, setStep] = useState<'details' | 'review' | 'complete'>('details')
  const [guest, setGuest] = useState({ firstName: '', lastName: '', email: '', requests: '' })
  const [error, setError] = useState<string | null>(null)
  const [reference, setReference] = useState('')
  if (!room)
    return (
      <div className="container empty-state not-found">
        <h1>
          First, find <em>your favourite room.</em>
        </h1>
        <p>Choose your own little sanctuary before planning your stay.</p>
        <Link className="button button-dark" to="/rooms">
          Explore rooms <ArrowUpRight size={18} />
        </Link>
      </div>
    )
  const issue =
    validateStay(stay) ??
    (stay.guests > room.guests ? `This room accommodates up to ${room.guests} guests.` : null)
  const nights = issue ? 0 : nightsBetween(stay.checkIn, stay.checkOut)
  const total = nights * room.price
  const moveTo = (next: typeof step) => {
    setStep(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  if (step === 'complete')
    return (
      <div className="container confirmation page-space">
        <Reveal>
          <CheckCircle2 size={56} strokeWidth={1.2} />
          <span className="eyebrow">A LITTLE SOMETHING TO LOOK FORWARD TO</span>
          <h1>
            Your lovely stay,
            <br />
            <em>all imagined.</em>
          </h1>
          <p>Thank you, {guest.firstName}. Your demo booking is complete.</p>
          <div className="confirmation-summary">
            <span className="eyebrow">DEMO REFERENCE · {reference}</span>
            <h3>{room.name}</h3>
            <p>
              {displayDate(stay.checkIn)} — {displayDate(stay.checkOut)}
            </p>
            <p>
              {nights} {nights === 1 ? 'night' : 'nights'} · {stay.guests}{' '}
              {stay.guests === 1 ? 'guest' : 'guests'}
            </p>
            <strong>{formatPrice(total)} MMK</strong>
          </div>
          <p className="demo-note">
            This is a frontend demonstration. No room has been reserved,
            <br />
            no payment was taken, and no email was sent.
          </p>
          <Link to="/" className="button button-dark">
            Back to Saung Oo <ArrowUpRight size={18} />
          </Link>
        </Reveal>
      </div>
    )
  return (
    <div className="container page-space booking-page">
      <Link className="text-link" to={`/rooms/${room.id}?${stayQuery(stay)}`}>
        <ArrowLeft size={16} /> Back to your room
      </Link>
      <div className="page-heading">
        <span className="eyebrow">SOMETHING LOVELY AWAITS</span>
        <h1>
          {step === 'details' ? (
            <>
              Make yourself <em>at home.</em>
            </>
          ) : (
            <>
              One last <em>little look.</em>
            </>
          )}
        </h1>
        <div className="booking-steps">
          <span className={step === 'details' ? 'current' : 'done'}>
            <b>{step === 'review' ? <Check size={14} /> : '1'}</b> Your details
          </span>
          <i />
          <span className={step === 'review' ? 'current' : ''}>
            <b>2</b> Review your stay
          </span>
        </div>
      </div>
      <div className="booking-columns">
        <section className="booking-form-card">
          {step === 'details' ? (
            <form
              onSubmit={(event) => {
                event.preventDefault()
                setError(issue)
                if (!issue) moveTo('review')
              }}
            >
              <h2>The details of your escape.</h2>
              <div className="form-grid">
                <label>
                  Check-in
                  <input
                    type="date"
                    required
                    min={dateString(new Date())}
                    value={stay.checkIn}
                    onChange={(event) => setStay({ ...stay, checkIn: event.target.value })}
                  />
                </label>
                <label>
                  Check-out
                  <input
                    type="date"
                    required
                    min={addDays(stay.checkIn, 1)}
                    value={stay.checkOut}
                    onChange={(event) => setStay({ ...stay, checkOut: event.target.value })}
                  />
                </label>
                <label className="full-width">
                  Guests
                  <select
                    value={stay.guests}
                    onChange={(event) => setStay({ ...stay, guests: Number(event.target.value) })}
                  >
                    {[1, 2, 3, 4].map((value) => (
                      <option key={value} value={value} disabled={value > room.guests}>
                        {value} {value === 1 ? 'guest' : 'guests'}
                        {value > room.guests ? ' — exceeds room capacity' : ''}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  First name
                  <input
                    required
                    autoComplete="given-name"
                    maxLength={60}
                    pattern=".*\S.*"
                    value={guest.firstName}
                    onChange={(event) => setGuest({ ...guest, firstName: event.target.value })}
                  />
                </label>
                <label>
                  Last name
                  <input
                    required
                    autoComplete="family-name"
                    maxLength={60}
                    pattern=".*\S.*"
                    value={guest.lastName}
                    onChange={(event) => setGuest({ ...guest, lastName: event.target.value })}
                  />
                </label>
                <label className="full-width">
                  Email address
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    maxLength={254}
                    value={guest.email}
                    onChange={(event) => setGuest({ ...guest, email: event.target.value })}
                  />
                </label>
                <label className="full-width">
                  Anything we should know? <span className="optional">(optional)</span>
                  <textarea
                    rows={3}
                    maxLength={500}
                    placeholder="An occasion, an arrival time, a little request…"
                    value={guest.requests}
                    onChange={(event) => setGuest({ ...guest, requests: event.target.value })}
                  />
                </label>
              </div>
              {error && (
                <p className="form-error" role="alert">
                  {error}
                </p>
              )}
              <p className="privacy-note">
                <ShieldCheck size={17} /> Your details stay in this page and are cleared on refresh.
              </p>
              <button className="button button-dark" type="submit">
                Review your stay <ArrowUpRight size={18} />
              </button>
            </form>
          ) : (
            <div className="review-details">
              <h2>Everything looking lovely?</h2>
              <dl>
                <div>
                  <dt>Guest</dt>
                  <dd>
                    {guest.firstName} {guest.lastName}
                  </dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd>{guest.email}</dd>
                </div>
                <div>
                  <dt>Check-in</dt>
                  <dd>{displayDate(stay.checkIn)} · from 2:00 PM</dd>
                </div>
                <div>
                  <dt>Check-out</dt>
                  <dd>{displayDate(stay.checkOut)} · by 12:00 PM</dd>
                </div>
                <div>
                  <dt>Guests</dt>
                  <dd>{stay.guests}</dd>
                </div>
                {guest.requests && (
                  <div>
                    <dt>Special requests</dt>
                    <dd>{guest.requests}</dd>
                  </div>
                )}
              </dl>
              <div className="demo-callout">
                <ShieldCheck size={22} />
                <p>
                  This is a demo reservation. No payment or real booking will be made. Your details
                  will not be sent to a hotel.
                </p>
              </div>
              <div className="review-actions">
                <button className="button button-outline" onClick={() => moveTo('details')}>
                  Edit details
                </button>
                <button
                  className="button button-dark"
                  onClick={() => {
                    if (issue) {
                      setError(issue)
                      moveTo('details')
                      return
                    }
                    setReference(`SO-${crypto.randomUUID().slice(0, 8).toUpperCase()}`)
                    moveTo('complete')
                  }}
                >
                  Complete demo booking <Check size={18} />
                </button>
              </div>
            </div>
          )}
        </section>
        <aside className="booking-summary">
          <img src={room.image} alt={room.alt} />
          <div>
            <span className="eyebrow">YOUR LITTLE SANCTUARY</span>
            <h3>{room.name}</h3>
            <p>
              {room.size} m² · {room.bed}
            </p>
            <hr />
            <div className="price-row">
              <span>
                {formatPrice(room.price)} MMK × {nights} nights
              </span>
              <span>{formatPrice(total)}</span>
            </div>
            <div className="price-row">
              <span>Breakfast</span>
              <span className="included">Included</span>
            </div>
            <div className="price-row">
              <span>Demo taxes & fees</span>
              <span>Included</span>
            </div>
            <hr />
            <div className="price-row total">
              <span>Total</span>
              <strong>
                {formatPrice(total)} <small>MMK</small>
              </strong>
            </div>
            {issue && (
              <p className="form-error" role="status">
                {issue}
              </p>
            )}
            <p className="demo-note">
              Sample pricing for this preview.
              <br />
              No payment required.
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}
