import { ArrowUpRight, Coffee, Leaf, Waves } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Reveal } from '../components/Reveal'
import { images } from '../data/hotel'

const experiences = [
  {
    title: 'A slower kind of pool day.',
    eyebrow: 'TAKE A DIP. TAKE YOUR TIME.',
    image: images.pool,
    alt: 'Outdoor pool surrounded by greenery',
    icon: Waves,
    copy: 'Trade a busy afternoon for a poolside pause. A little sunshine, a cool drink, and nothing on the agenda. Sometimes, that is the whole plan.',
    detail: 'Outdoor pool · Towels provided · A place to unwind',
  },
  {
    title: 'Good food. Great company.',
    eyebrow: 'A TASTE OF THE STAY',
    image: images.dining,
    alt: 'Intimate dining space with carefully set tables',
    icon: Coffee,
    copy: 'Begin with a leisurely breakfast and let the conversation carry on. Our imagined dining experience brings local inspiration and familiar comforts to the same table.',
    detail: 'Daily breakfast · Local inspiration · Relaxed dining',
  },
  {
    title: 'Find a moment for yourself.',
    eyebrow: 'BREATHE A LITTLE DEEPER',
    image: images.spa,
    alt: 'Calm spa space with warm natural materials',
    icon: Leaf,
    copy: 'Step away from the everyday and ease into a quieter rhythm. Peaceful spaces and gentle rituals make it easy to come back to yourself.',
    detail: 'Wellness spaces · Quiet corners · Mindful moments',
  },
]
export default function ExperiencesPage() {
  return (
    <div className="container page-space">
      <Reveal className="page-heading">
        <span className="eyebrow">STAY A LITTLE. FEEL A LOT.</span>
        <h1>
          The art of <em>doing less.</em>
        </h1>
        <p>There’s more to a lovely stay than a beautiful room.</p>
      </Reveal>
      <div className="experiences-list">
        {experiences.map((item, index) => (
          <Reveal key={item.title} className={`experience-row ${index % 2 ? 'reverse' : ''}`}>
            <img src={item.image} alt={item.alt} loading="lazy" />
            <div>
              <item.icon className="experience-symbol" strokeWidth={1.3} />
              <span className="eyebrow">{item.eyebrow}</span>
              <h2>{item.title}</h2>
              <p>{item.copy}</p>
              <span className="experience-detail">{item.detail}</span>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="inline-cta">
        <h2>
          Make a little time <em>for yourself.</em>
        </h2>
        <Link to="/rooms" className="button button-dark">
          Find your stay <ArrowUpRight size={18} />
        </Link>
      </div>
    </div>
  )
}
