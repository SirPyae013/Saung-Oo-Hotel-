import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, MapPin, Menu, Sun, X } from 'lucide-react'

export function Brand() {
  return (
    <Link className="brand" to="/" aria-label="Saung Oo Hotel home">
      <Sun className="brand-mark" strokeWidth={1.2} />
      <span>
        SAUNG OO<small>H O T E L · M A N D A L A Y</small>
      </span>
    </Link>
  )
}
export function Layout() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const home = location.pathname === '/'
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    document.getElementById('main-content')?.focus({ preventScroll: true })
    const section = location.pathname.split('/')[1]
    const titles: Record<string, string> = {
      rooms: 'Rooms & Suites',
      experiences: 'Experiences',
      'our-story': 'Our Story',
      booking: 'Plan Your Stay',
    }
    document.title = `${titles[section] ?? 'A quieter kind of escape'} — Saung Oo Hotel`
  }, [location.pathname])
  useEffect(() => {
    if (!menuOpen) return
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', close)
    return () => document.removeEventListener('keydown', close)
  }, [menuOpen])
  const links = [
    { to: '/', label: 'Home' },
    { to: '/rooms', label: 'Rooms & suites' },
    { to: '/experiences', label: 'Experiences' },
    { to: '/our-story', label: 'Our story' },
  ]
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className={`site-header ${home ? 'over-hero' : ''}`}>
        <div className="header-inner">
          <Brand />
          <nav className="desktop-nav" aria-label="Main navigation">
            {links.map((link) => (
              <NavLink end={link.to === '/'} key={link.to} to={link.to}>
                {link.label}
              </NavLink>
            ))}
          </nav>
          <Link className="button header-book" to="/rooms">
            Book your stay <ArrowUpRight size={17} />
          </Link>
          <button
            className="menu-toggle"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              id="mobile-navigation"
              className="mobile-nav"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  end={link.to === '/'}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
              <Link to="/rooms" onClick={() => setMenuOpen(false)}>
                Book your stay <ArrowUpRight size={17} />
              </Link>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
      <main id="main-content" tabIndex={-1}>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Outlet />
        </motion.div>
      </main>
      <footer className="site-footer">
        <div className="footer-main container">
          <div>
            <Brand />
            <p>
              A little warmth. A slower pace.
              <br />A place to feel at home in Mandalay.
            </p>
            <span className="footer-location">
              <MapPin size={16} /> Mandalay, Myanmar
            </span>
          </div>
          <div className="footer-links">
            <span className="eyebrow">MAKE YOURSELF AT HOME</span>
            <Link to="/rooms">Rooms & suites</Link>
            <Link to="/experiences">The Saung Oo experience</Link>
            <Link to="/our-story">Our story</Link>
          </div>
          <div className="footer-invitation">
            <span className="eyebrow">YOUR NEXT CHAPTER</span>
            <h3>
              Good days begin
              <br />
              with a lovely stay.
            </h3>
            <Link className="text-link" to="/rooms">
              Find your room <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
        <div className="footer-bottom container">
          <span>© {new Date().getFullYear()} Saung Oo Hotel</span>
          <span>Made for unhurried moments.</span>
        </div>
      </footer>
    </>
  )
}
