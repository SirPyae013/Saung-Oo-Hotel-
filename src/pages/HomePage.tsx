import { ArrowDown, ArrowUpRight, Coffee, Leaf, MapPin, Sparkles, Waves } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { BookingSearch } from '../components/BookingSearch'
import { Reveal } from '../components/Reveal'
import { RoomCard } from '../components/RoomCard'
import { images, rooms } from '../data/hotel'

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <motion.img
          className="hero-image"
          src={images.hero}
          alt="Sunlit hotel pool framed by lush palms and welcoming architecture"
          fetchPriority="high"
          initial={{ scale: 1.07 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.5, ease: 'easeOut' }}
        />
        <div className="hero-shade" />
        <div className="hero-content container">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
          >
            <span className="eyebrow hero-eyebrow">
              <span /> A WARM WELCOME TO MANDALAY
            </span>
            <h1>
              A little escape.
              <br />
              <em>A lasting feeling.</em>
            </h1>
            <p>
              Find your quiet corner in the heart of Myanmar.
              <br />
              Thoughtful stays. Genuine warmth. Beautiful moments.
            </p>
            <Link to="/rooms" className="button button-light">
              Discover your stay <ArrowUpRight size={18} />
            </Link>
          </motion.div>
        </div>
        <div className="hero-note">
          <span className="note-icon">
            <Leaf size={22} strokeWidth={1.3} />
          </span>
          <div>
            A slower pace.
            <br />
            <em>A richer experience.</em>
          </div>
        </div>
        <div className="hero-bottom container">
          <span>
            <MapPin size={15} /> MANDALAY, MYANMAR
          </span>
          <a href="#welcome">
            A little more to discover <ArrowDown size={15} />
          </a>
        </div>
      </section>
      <div className="search-container container">
        <BookingSearch />
        <div className="booking-assurances">
          <span>
            <Sparkles size={13} /> A stay that feels like you
          </span>
          <span>Breakfast, always included</span>
          <span>Space to slow down</span>
        </div>
      </div>
      <section id="welcome" className="intro-section container">
        <Reveal>
          <span className="eyebrow">MINGALARBAR. MAKE YOURSELF AT HOME.</span>
          <h2>
            Rooted in Mandalay.
            <br />
            <em>Made for you.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.12} className="intro-copy">
          <p>
            Some places make you feel welcome.
            <br />
            Others make you feel you belong.
          </p>
          <p>
            At Saung Oo, we bring together the warmth of Myanmar hospitality and the simple
            pleasures of a beautiful stay. Come for the city. Stay for the feeling.
          </p>
          <Link to="/our-story" className="text-link">
            A little about us <ArrowUpRight size={17} />
          </Link>
        </Reveal>
      </section>
      <section className="rooms-section container">
        <Reveal className="section-heading">
          <div>
            <span className="eyebrow">REST COMES NATURALLY</span>
            <h2>
              A room for <em>your kind of stay.</em>
            </h2>
          </div>
          <Link to="/rooms" className="button button-outline">
            All rooms & suites <ArrowUpRight size={17} />
          </Link>
        </Reveal>
        <div className="room-grid">
          {rooms.map((room, index) => (
            <Reveal key={room.id} delay={index * 0.1}>
              <RoomCard room={room} />
            </Reveal>
          ))}
        </div>
      </section>
      <section className="experience-section container">
        <Reveal className="experience-image">
          <img
            src={images.pool}
            loading="lazy"
            alt="A peaceful outdoor swimming pool surrounded by palms"
          />
          <div className="floating-note">
            <Waves size={24} />
            <span>
              No rush.
              <br />
              <strong>Just this moment.</strong>
            </span>
          </div>
        </Reveal>
        <Reveal className="experience-copy">
          <span className="eyebrow">MORE THAN A PLACE TO STAY</span>
          <h2>
            Little moments.
            <br />
            <em>Lovely memories.</em>
          </h2>
          <p>
            A refreshing dip. A long, lazy breakfast. A quiet pause before the city wakes. Make room
            for the things that make a stay special.
          </p>
          <div className="experience-features">
            <span>
              <Waves size={21} /> Poolside daydreams
            </span>
            <span>
              <Coffee size={21} /> Flavours to remember
            </span>
            <span>
              <Leaf size={21} /> Time just for you
            </span>
          </div>
          <Link to="/experiences" className="button button-dark">
            Explore the experience <ArrowUpRight size={17} />
          </Link>
        </Reveal>
      </section>
      <section className="stay-banner">
        <Reveal className="container stay-banner-inner">
          <div>
            <span className="eyebrow">LET THE EVERYDAY WAIT</span>
            <h2>
              Your Mandalay chapter
              <br />
              <em>starts here.</em>
            </h2>
          </div>
          <Link className="button button-light" to="/rooms">
            Let’s find your stay <ArrowUpRight size={18} />
          </Link>
          <SunDecoration />
        </Reveal>
      </section>
    </>
  )
}

function SunDecoration() {
  return (
    <div className="sun-decoration" aria-hidden="true">
      ✳
    </div>
  )
}
