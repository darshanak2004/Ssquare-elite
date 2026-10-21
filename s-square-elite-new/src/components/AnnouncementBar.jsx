
import { useEffect, useState } from 'react'
import { Truck, Gift, Star } from 'lucide-react'

const banners = [
  {
    text: 'Loved by our customers',
    icon: Star,
  },
  {
    text: 'Free delivery on 4+ products',
    icon: Gift,
  },
  {
    text: 'Delivery within 2–3 days',
    icon: Truck,
  },
]

export default function AnnouncementBar() {
  const [current, setCurrent] = useState(0)
  const BannerIcon = banners[current].icon

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % banners.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="announcement-bar">
      <div className="announcement-inner">
        <span className="announcement-side">S SQUARE ELITE</span>

        <div className="announcement-message" key={current}>
          <BannerIcon size={15} strokeWidth={1.8} />
          <span>{banners[current].text}</span>
        </div>

        <span className="announcement-side announcement-right">
          THOUGHTFUL FINDS
        </span>
      </div>
    </div>
  )
}
