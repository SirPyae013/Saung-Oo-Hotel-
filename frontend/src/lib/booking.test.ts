import { describe, expect, it } from 'vitest'
import {
  addDays,
  nightsBetween,
  stayFromParams,
  stayQuery,
  validateStay,
  childRate,
  childCapacity,
  validNrc,
  validPhone,
} from './booking'
import { rooms } from '../data/hotel'

describe('children and guest identification', () => {
  it('allows one additional child in every fully occupied room', () => {
    for (const room of rooms) expect(childCapacity(room.guests, room.guests)).toBe(1)
    expect(childCapacity(2, 1)).toBe(2)
  })
  it('charges 15% of each room rate per child per night', () => {
    expect(rooms.map((room) => childRate(room.price))).toEqual([27000, 36000, 57000])
    expect((180000 + childRate(180000)) * 2).toBe(414000)
  })
  it('accepts English NRC format and preserves leading zeroes', () => {
    expect(validNrc('8/PAKHAKA(N)001234')).toBe(true)
    for (const value of [
      '0/PAKHAKA(N)123456',
      '15/PAKHAKA(N)123456',
      '8/PAKHAKA(N)12345',
      '8/PAKHAKA(N)1234567',
      '',
    ])
      expect(validNrc(value)).toBe(false)
  })
  it('requires a phone number with country code', () => {
    expect(validPhone('+95 9 123456789')).toBe(true)
    expect(validPhone('+44 7700 900123')).toBe(true)
    for (const value of ['', '+95', '09123456789', '+959abcdefgh', '+1234567890123456'])
      expect(validPhone(value)).toBe(false)
  })
})

describe('stay validation and totals', () => {
  const stay = { checkIn: '2026-09-20', checkOut: '2026-09-22', guests: 2 }
  it('accepts a valid stay', () => expect(validateStay(stay, '2026-09-16')).toBeNull())
  it('allows only same-day dates for part-time stays', () => {
    expect(
      validateStay({ ...stay, stayType: 'part-time', checkOut: stay.checkIn }, '2026-09-16'),
    ).toBeNull()
    expect(validateStay({ ...stay, stayType: 'part-time' }, '2026-09-16')).toMatch(/same day/)
    expect(
      validateStay({ ...stay, stayType: 'part-time', checkOut: stay.checkIn }, '2026-09-21'),
    ).toMatch(/past/)
  })
  it('rejects past, reversed and impossible dates', () => {
    expect(validateStay(stay, '2026-09-21')).toMatch(/past/)
    expect(validateStay({ ...stay, checkOut: stay.checkIn }, '2026-09-16')).toMatch(/after/)
    expect(validateStay({ ...stay, checkIn: '2026-02-30' }, '2026-01-01')).toMatch(/valid/)
  })
  it('rejects malformed URLs and invalid guest counts', () => {
    expect(validateStay(stayFromParams(new URLSearchParams('checkIn=nope&guests=NaN')))).toMatch(
      /valid/,
    )
    for (const guests of [0, 5, 1.5, NaN])
      expect(validateStay({ ...stay, guests }, '2026-09-16')).toMatch(/guests/)
  })
  it('limits stays to 30 nights', () =>
    expect(validateStay({ ...stay, checkOut: '2026-10-25' }, '2026-09-16')).toMatch(/30/))
  it('calculates nights over month boundaries independently of DST', () => {
    expect(nightsBetween('2026-03-07', '2026-03-10')).toBe(3)
    expect(addDays('2026-12-31', 2)).toBe('2027-01-02')
    expect(nightsBetween(stay.checkIn, stay.checkOut) * 180000).toBe(360000)
  })
  it('round-trips dates and guests through room navigation', () =>
    expect(stayFromParams(new URLSearchParams(stayQuery(stay, 'deluxe-retreat')))).toEqual(stay))
})
