export interface Stay {
  checkIn: string
  checkOut: string
  guests: number
  stayType?: 'overnight' | 'part-time'
}

export const childRate = (roomPrice: number) => Math.round(roomPrice * 0.15)
export const childCapacity = (adultCapacity: number, adults: number) =>
  Math.max(1, adultCapacity - adults + 1)

export function validPhone(phone: string) {
  return /^\+[1-9][0-9]{6,14}$/.test(phone.replace(/[\s()-]/g, ''))
}

export function validNrc(nrc: string) {
  return /^(?:[1-9]|1[0-4])\/[A-Z]{3,12}\([A-Z]{1,3}\)[0-9]{6}$/.test(nrc)
}

export function dateString(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}
export function addDays(value: string, days: number) {
  const date = new Date(`${value}T12:00:00`)
  date.setDate(date.getDate() + days)
  return dateString(date)
}
export function defaultStay(): Stay {
  const checkIn = dateString(new Date())
  return { checkIn, checkOut: addDays(checkIn, 2), guests: 2 }
}
function validDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const parsed = new Date(`${value}T12:00:00`)
  return !Number.isNaN(parsed.getTime()) && dateString(parsed) === value
}
export function nightsBetween(checkIn: string, checkOut: string) {
  return Math.round(
    (Date.parse(`${checkOut}T00:00:00Z`) - Date.parse(`${checkIn}T00:00:00Z`)) / 86400000,
  )
}
export function validateStay(stay: Stay, today = dateString(new Date())): string | null {
  if (!validDate(stay.checkIn) || !validDate(stay.checkOut))
    return 'Please choose valid check-in and check-out dates.'
  if (stay.checkIn < today) return 'Check-in cannot be in the past.'
  if (stay.stayType === 'part-time') {
    if (stay.checkOut !== stay.checkIn) return 'Part-time stays must begin and end on the same day.'
  } else if (stay.checkOut <= stay.checkIn) return 'Check-out must be after check-in.'
  if (nightsBetween(stay.checkIn, stay.checkOut) > 30)
    return 'Please choose a stay of 30 nights or fewer.'
  if (!Number.isInteger(stay.guests) || stay.guests < 1 || stay.guests > 4)
    return 'Please select between 1 and 4 guests.'
  return null
}
export function stayFromParams(params: URLSearchParams): Stay {
  const fallback = defaultStay()
  return {
    checkIn: params.get('checkIn') ?? fallback.checkIn,
    checkOut: params.get('checkOut') ?? fallback.checkOut,
    guests: Number(params.get('guests') ?? fallback.guests),
  }
}
export function stayQuery(stay: Stay, room?: string) {
  const params = new URLSearchParams({
    checkIn: stay.checkIn,
    checkOut: stay.checkOut,
    guests: String(stay.guests),
  })
  if (room) params.set('room', room)
  return params.toString()
}
export function displayDate(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
