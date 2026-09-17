export interface Room {
  id: string
  name: string
  category: 'Rooms' | 'Suites'
  tagline: string
  description: string
  price: number
  size: number
  guests: number
  bed: string
  image: string
  alt: string
  features: string[]
}

// Illustrative photography for the fictional hotel; replace with hotel-owned assets.
export const images = {
  hero: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2400&q=85',
  pool: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1400&q=85',
  dining:
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=85',
  spa: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85',
}

export const rooms: Room[] = [
  {
    id: 'deluxe-retreat',
    name: 'Deluxe Retreat',
    category: 'Rooms',
    tagline: 'Your own little sanctuary',
    description:
      'Soft linens, warm timber, and room to slow down. Our Deluxe Retreat brings a little extra calm to your Mandalay days, with a generous king bed and a quiet corner to make your own.',
    price: 180000,
    size: 32,
    guests: 2,
    bed: 'King bed',
    image:
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=85',
    alt: 'Inviting bedroom with a king bed, upholstered headboard, and warm lighting',
    features: [
      'Rain shower',
      'Breakfast included',
      'High-speed Wi-Fi',
      'Air conditioning',
      'Tea & coffee',
      'Smart TV',
    ],
  },
  {
    id: 'premier-garden',
    name: 'Premier Garden',
    category: 'Rooms',
    tagline: 'A breath of fresh air',
    description:
      'Wake slowly in a light-filled room with a private balcony. Natural textures, thoughtful details, and space to linger make this an easy place to settle into your own rhythm.',
    price: 240000,
    size: 42,
    guests: 2,
    bed: 'King bed',
    image:
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85',
    alt: 'Light-filled guest room with a large bed and comfortable seating',
    features: [
      'Private balcony',
      'Breakfast included',
      'High-speed Wi-Fi',
      'Rain shower',
      'Air conditioning',
      'Coffee machine',
    ],
  },
  {
    id: 'saung-oo-suite',
    name: 'Saung Oo Suite',
    category: 'Suites',
    tagline: 'A little more of everything',
    description:
      'Our most spacious escape, made for unhurried stays. A separate lounge, a deep soaking tub, and a king bedroom bring everyone together while leaving room for a moment of your own.',
    price: 380000,
    size: 68,
    guests: 4,
    bed: 'King + sofa bed',
    image:
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=85',
    alt: 'Spacious suite with a soft neutral palette and a large comfortable bed',
    features: [
      'Separate living area',
      'Breakfast included',
      'Soaking bathtub',
      'High-speed Wi-Fi',
      'Coffee machine',
      'Air conditioning',
    ],
  },
]

export const formatPrice = (value: number) => new Intl.NumberFormat('en-US').format(value)
