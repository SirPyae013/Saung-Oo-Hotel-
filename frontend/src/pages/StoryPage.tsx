import { ArrowUpRight, Heart, Leaf, Sun } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Reveal } from '../components/Reveal'
import { images } from '../data/hotel'

export default function StoryPage() {
  return (
    <div className="page-space container">
      <Reveal className="page-heading">
        <span className="eyebrow">THE SAUNG OO SPIRIT</span>
        <h1>
          A warm welcome.
          <br />
          <em>A sense of belonging.</em>
        </h1>
        <p>Imagined in Mandalay. Inspired by the feeling of home.</p>
      </Reveal>
      <Reveal className="story-image">
        <img src={images.hero} alt="Welcoming hotel grounds and a sunlit swimming pool" />
      </Reveal>
      <section className="story-copy">
        <Reveal>
          <span className="eyebrow">HOSPITALITY, FROM THE HEART</span>
          <h2>
            Some of the best things
            <br />
            are <em>the simplest.</em>
          </h2>
        </Reveal>
        <Reveal>
          <p>
            A sincere welcome. A comfortable bed. Someone remembering how you take your tea. Saung
            Oo Hotel is built around these small, meaningful moments.
          </p>
          <p>
            Our vision brings a contemporary sense of calm to Mandalay’s rich cultural setting.
            Natural materials, thoughtful spaces, and a generous spirit create a place where each
            day unfolds at your pace.
          </p>
          <p>
            Whether you’re discovering a new city or simply taking a little time away, there’s a
            place for you here.
          </p>
        </Reveal>
      </section>
      <div className="values-grid">
        {[
          {
            Icon: Heart,
            title: 'Warmth, always',
            text: 'A thoughtful welcome and a human touch in everything we do.',
          },
          {
            Icon: Leaf,
            title: 'Comfort in the details',
            text: 'Inviting spaces, natural textures, and everyday pleasures.',
          },
          {
            Icon: Sun,
            title: 'A little local soul',
            text: 'A love for Mandalay, shared through the spirit of our stay.',
          },
        ].map(({ Icon, title, text }) => (
          <Reveal key={title}>
            <Icon size={30} strokeWidth={1.3} />
            <h3>{title}</h3>
            <p>{text}</p>
          </Reveal>
        ))}
      </div>
      <div className="inline-cta">
        <h2>
          We saved a little <em>space for you.</em>
        </h2>
        <Link to="/rooms" className="button button-dark">
          Discover our rooms <ArrowUpRight size={18} />
        </Link>
      </div>
    </div>
  )
}
