import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, Check, CheckCircle2, ShieldCheck } from 'lucide-react'
import { formatPrice, rooms } from '../data/hotel'
import townshipData from '../data/nrc-townships.json'
import {
  addDays,
  childRate,
  childCapacity,
  validPhone,
  validNrc,
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
  const [guest, setGuest] = useState({
    fullName: '',
    email: '',
    phone: '+95',
    nrcRegion: '',
    nrcTownship: '',
    nrcType: '',
    nrcSerial: '',
    requests: '',
    residency: 'local',
    arrival: '',
    promotion: '',
    children: 0,
    extraBed: false,
    acceptedTerms: false,
  })
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
  const partTime = stay.stayType === 'part-time'
  const townships =
    (townshipData as Record<string, { code: string; name: string }[]>)[guest.nrcRegion] ?? []
  const maxChildren = childCapacity(room.guests, stay.guests)
  const nrc = `${guest.nrcRegion}/${guest.nrcTownship}(${guest.nrcType})${guest.nrcSerial}`
  const identityIssue = !validPhone(guest.phone)
    ? 'Enter a valid phone number with country code, for example +959123456789.'
    : !validNrc(nrc) || !townships.some((township) => township.code === guest.nrcTownship)
      ? 'Complete the NRC in English, including the six-digit serial number.'
      : null
  const termsIssue = guest.acceptedTerms
    ? null
    : 'Please accept the terms and conditions to continue.'
  const issue =
    validateStay(stay) ??
    (stay.guests > room.guests || guest.children > maxChildren
      ? `This room allows up to ${room.guests} adults plus 1 child. Additional children can use unused adult places.`
      : null)
  const nights = issue ? 0 : nightsBetween(stay.checkIn, stay.checkOut)
  const roomTotal = nights * room.price
  const childPrice = childRate(room.price)
  const childTotal = issue ? 0 : childPrice * guest.children * (partTime ? 1 : nights)
  const total = roomTotal + childTotal
  const pricePending = partTime || guest.extraBed
  const duration = partTime
    ? 'Part-time stay · 9am–5pm'
    : `${nights} ${nights === 1 ? 'night' : 'nights'}`
  const party = `${stay.guests} ${stay.guests === 1 ? 'adult' : 'adults'} · ${guest.children} ${guest.children === 1 ? 'child' : 'children'}`
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
          <p>Thank you, {guest.fullName}. Your demo booking is complete.</p>
          <div className="confirmation-summary">
            <span className="eyebrow">DEMO REFERENCE · {reference}</span>
            <h3>{room.name}</h3>
            <p>
              {displayDate(stay.checkIn)} — {displayDate(stay.checkOut)}
            </p>
            <p>
              {duration} · {party}
            </p>
            <p>
              {guest.extraBed ? 'Extra bed requested' : 'No extra bed'} ·{' '}
              {guest.residency === 'local' ? 'Local' : 'Foreigner'}
            </p>
            {guest.arrival && <p>Estimated arrival: {guest.arrival}</p>}
            {guest.promotion && <p>Promotion code: {guest.promotion} (pending verification)</p>}
            {guest.requests && <p>Special request: {guest.requests}</p>}
            <p>Phone: {guest.phone}</p>
            <p>NRC: {nrc}</p>
            {guest.children > 0 && <p>Child charge: {formatPrice(childTotal)} MMK</p>}
            <strong>{pricePending ? 'Price to be confirmed' : `${formatPrice(total)} MMK`}</strong>
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
      <Link
        className="text-link"
        to={`/rooms/${room.id}?${stayQuery(partTime ? { ...stay, stayType: 'overnight', checkOut: addDays(stay.checkIn, 1) } : stay)}`}
      >
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
                setError(issue ?? identityIssue ?? termsIssue)
                if (!issue && !identityIssue && !termsIssue) moveTo('review')
              }}
            >
              <h2>The details of your escape.</h2>
              <div className="form-grid">
                <label className="full-width">
                  Stay option
                  <select
                    value={partTime ? 'part-time' : 'overnight'}
                    onChange={(event) => {
                      const stayType = event.target.value as 'overnight' | 'part-time'
                      setStay({
                        ...stay,
                        stayType,
                        checkOut:
                          stayType === 'part-time' ? stay.checkIn : addDays(stay.checkIn, 1),
                      })
                    }}
                  >
                    <option value="overnight">Overnight stay</option>
                    <option value="part-time">Part-time stay (9am–5pm)</option>
                  </select>
                </label>
                <label>
                  Check-in
                  <input
                    type="date"
                    required
                    min={dateString(new Date())}
                    value={stay.checkIn}
                    onChange={(event) =>
                      setStay({
                        ...stay,
                        checkIn: event.target.value,
                        checkOut: partTime ? event.target.value : stay.checkOut,
                      })
                    }
                  />
                </label>
                <label>
                  Check-out
                  <input
                    type="date"
                    required
                    min={partTime ? stay.checkIn : addDays(stay.checkIn, 1)}
                    readOnly={partTime}
                    value={stay.checkOut}
                    onChange={(event) => setStay({ ...stay, checkOut: event.target.value })}
                  />
                </label>
                <label>
                  Adults
                  <select
                    value={stay.guests}
                    onChange={(event) => setStay({ ...stay, guests: Number(event.target.value) })}
                  >
                    {[1, 2, 3, 4].map((value) => (
                      <option key={value} value={value} disabled={value > room.guests}>
                        {value} {value === 1 ? 'adult' : 'adults'}
                        {value > room.guests ? ' — exceeds room capacity' : ''}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Children
                  <select
                    value={guest.children}
                    onChange={(event) =>
                      setGuest({ ...guest, children: Number(event.target.value) })
                    }
                  >
                    {[0, 1, 2, 3, 4].map((value) => (
                      <option key={value} value={value} disabled={value > maxChildren}>
                        {value} {value === 1 ? 'child' : 'children'}
                      </option>
                    ))}
                  </select>
                  <span className="optional">
                    One child is welcome in addition to the room's adult capacity.{' '}
                    {formatPrice(childPrice)} MMK per child{' '}
                    {partTime ? 'per day stay' : 'per night'} (15% of the nightly room rate).
                  </span>
                </label>
                <label>
                  Extra bed
                  <select
                    value={guest.extraBed ? 'yes' : 'no'}
                    onChange={(event) =>
                      setGuest({ ...guest, extraBed: event.target.value === 'yes' })
                    }
                  >
                    <option value="no">No extra bed</option>
                    <option value="yes">Request an extra bed</option>
                  </select>
                  <span className="optional">Availability and charge to be confirmed.</span>
                </label>
                <label>
                  Estimated arrival time <span className="optional">(optional)</span>
                  <input
                    type="time"
                    min={partTime ? '09:00' : undefined}
                    max={partTime ? '17:00' : undefined}
                    value={guest.arrival}
                    onChange={(event) => setGuest({ ...guest, arrival: event.target.value })}
                  />
                </label>
                <label className="full-width">
                  Full name
                  <input
                    required
                    autoComplete="name"
                    maxLength={120}
                    pattern=".*\S.*"
                    value={guest.fullName}
                    onChange={(event) => setGuest({ ...guest, fullName: event.target.value })}
                  />
                </label>
                <label className="full-width">
                  Guest type
                  <select
                    value={guest.residency}
                    onChange={(event) => setGuest({ ...guest, residency: event.target.value })}
                  >
                    <option value="local">Local</option>
                    <option value="foreigner">Foreigner</option>
                  </select>
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
                  Phone number
                  <input
                    type="tel"
                    autoComplete="tel"
                    required
                    maxLength={25}
                    value={guest.phone}
                    onChange={(event) => setGuest({ ...guest, phone: event.target.value })}
                    placeholder="+959123456789"
                  />
                </label>
                <fieldset className="full-width nrc-fields">
                  <legend>Myanmar NRC (required)</legend>
                  <div className="nrc-row">
                    <label>
                      State
                      <select
                        aria-label="State / region code"
                        required
                        value={guest.nrcRegion}
                        onChange={(event) =>
                          setGuest({ ...guest, nrcRegion: event.target.value, nrcTownship: '' })
                        }
                      >
                        <option value="">—</option>
                        {Array.from({ length: 14 }, (_, index) => String(index + 1)).map((code) => (
                          <option key={code} value={code}>
                            {code}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label>
                      Township
                      <select
                        aria-label="Township code (English)"
                        required
                        disabled={!guest.nrcRegion}
                        value={guest.nrcTownship}
                        onChange={(event) =>
                          setGuest({ ...guest, nrcTownship: event.target.value })
                        }
                      >
                        <option value="">{guest.nrcRegion ? 'Select code' : 'State first'}</option>
                        {townships.map((township) => (
                          <option key={township.code} value={township.code}>
                            {township.code} — {township.name}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label>
                      Type
                      <select
                        aria-label="Registration type"
                        required
                        value={guest.nrcType}
                        onChange={(event) => setGuest({ ...guest, nrcType: event.target.value })}
                      >
                        <option value="">—</option>
                        {['N', 'E', 'P', 'T', 'R', 'S', 'Y'].map((type) => (
                          <option key={type} value={type}>
                            ({type})
                          </option>
                        ))}
                      </select>
                    </label>
                    <label>
                      Number
                      <input
                        aria-label="Six-digit serial number"
                        required
                        type="text"
                        inputMode="numeric"
                        autoComplete="off"
                        pattern="[0-9]{6}"
                        minLength={6}
                        maxLength={6}
                        placeholder="123456"
                        value={guest.nrcSerial}
                        onChange={(event) => setGuest({ ...guest, nrcSerial: event.target.value })}
                      />
                    </label>
                  </div>

                  <p aria-live="polite">
                    NRC: {guest.nrcRegion || '…'}/{guest.nrcTownship || '…'}({guest.nrcType || '…'})
                    {guest.nrcSerial || '…'}
                  </p>
                </fieldset>
                <label className="full-width">
                  Promotion code <span className="optional">(optional)</span>
                  <input
                    maxLength={50}
                    value={guest.promotion}
                    onChange={(event) => setGuest({ ...guest, promotion: event.target.value })}
                    placeholder="Enter your promotion code"
                  />
                </label>
                <label className="full-width">
                  Special request <span className="optional">(optional)</span>
                  <textarea
                    rows={3}
                    maxLength={500}
                    placeholder="Tell us about any special requests…"
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
              <label className="terms-acceptance">
                <input
                  type="checkbox"
                  name="acceptedTerms"
                  required
                  checked={guest.acceptedTerms}
                  onChange={(event) => setGuest({ ...guest, acceptedTerms: event.target.checked })}
                />
                <span>I accept the terms and conditions.</span>
              </label>
          
              <button className="button button-dark" type="submit">
                Review your stay <ArrowUpRight size={18} />
              </button>
            </form>
          ) : (
            <div className="review-details">
              <h2>Everything looking lovely?</h2>
              <dl>
                <div>
                  <dt>Terms and conditions</dt>
                  <dd>{guest.acceptedTerms ? 'Accepted' : 'Not accepted'}</dd>
                </div>
                <div>
                  <dt>Guest</dt>
                  <dd>{guest.fullName}</dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd>{guest.email}</dd>
                </div>
                <div>
                  <dt>Phone number</dt>
                  <dd>{guest.phone}</dd>
                </div>
                <div>
                  <dt>NRC</dt>
                  <dd>{nrc}</dd>
                </div>
                <div>
                  <dt>Child charge</dt>
                  <dd>{formatPrice(childTotal)} MMK</dd>
                </div>
                <div>
                  <dt>Check-in</dt>
                  <dd>
                    {displayDate(stay.checkIn)} · {partTime ? '9:00 AM' : 'from 2:00 PM'}
                  </dd>
                </div>
                <div>
                  <dt>Check-out</dt>
                  <dd>
                    {displayDate(stay.checkOut)} · {partTime ? 'by 5:00 PM' : 'by 12:00 PM'}
                  </dd>
                </div>
                <div>
                  <dt>Guests</dt>
                  <dd>{party}</dd>
                </div>
                <div>
                  <dt>Stay option</dt>
                  <dd>{duration}</dd>
                </div>
                <div>
                  <dt>Guest type</dt>
                  <dd>{guest.residency === 'local' ? 'Local' : 'Foreigner'}</dd>
                </div>
                <div>
                  <dt>Extra bed</dt>
                  <dd>
                    {guest.extraBed
                      ? 'Requested — availability and charge to be confirmed'
                      : 'None'}
                  </dd>
                </div>
                <div>
                  <dt>Estimated arrival</dt>
                  <dd>{guest.arrival || 'Not provided'}</dd>
                </div>
                <div>
                  <dt>Promotion code</dt>
                  <dd>{guest.promotion ? `${guest.promotion} — pending verification` : 'None'}</dd>
                </div>
                {guest.requests && (
                  <div>
                    <dt>Special request</dt>
                    <dd>{guest.requests}</dd>
                  </div>
                )}
              </dl>
              <div className="demo-callout">
              
              </div>
              <div className="review-actions">
                <button className="button button-outline" onClick={() => moveTo('details')}>
                  Edit details
                </button>
                <button
                  className="button button-dark"
                  onClick={() => {
                    if (issue || identityIssue || termsIssue) {
                      setError(issue ?? identityIssue ?? termsIssue)
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
                {partTime ? duration : `${formatPrice(room.price)} MMK × ${nights} nights`}
              </span>
              <span>{partTime ? 'To be confirmed' : formatPrice(roomTotal)}</span>
            </div>
            {guest.children > 0 && (
              <div className="price-row">
                <span>
                  Children ({guest.children} × {formatPrice(childPrice)} MMK ×{' '}
                  {partTime ? '1 day stay' : `${nights} nights`})
                </span>
                <span>{formatPrice(childTotal)}</span>
              </div>
            )}
            {guest.extraBed && (
              <div className="price-row">
                <span>Extra bed</span>
                <span>To be confirmed</span>
              </div>
            )}
            {guest.promotion && (
              <div className="price-row">
                <span>Promotion code</span>
                <span>Pending verification</span>
              </div>
            )}
            <p>{party}</p>
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
                {pricePending ? (
                  'To be confirmed'
                ) : (
                  <>
                    {formatPrice(total)} <small>MMK</small>
                  </>
                )}
              </strong>
            </div>
            {issue && (
              <p className="form-error" role="status">
                {issue}
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}
