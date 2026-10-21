
import { useEffect, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Truck,
  PackageCheck,
  Gift,
  Star,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const slides = [
  {
    eyebrow: 'GIFTS FOR EVERY OCCASION',
    title: ['Thoughtful gifts.', 'Memorable moments.'],
    text: 'Explore toys, keepsakes and gifts for birthdays, celebrations and everyday surprises.',
    button: 'Shop all gifts',
    href: '/shop',
    label: 'FIND SOMETHING SPECIAL',
    detail: 'Gifts for every occasion',
    icon: Gift,
    theme: 'mint',
    tag: 'EXPLORE THE COLLECTION',
  },
  {
    eyebrow: 'A LITTLE MORE VALUE',
    title: ['Shop 4 or more.', 'Delivery is free.'],
    text: 'Find more of what you love. Get free delivery when you purchase 4 or more products.',
    button: 'Shop the collection',
    href: '/shop',
    label: 'YOUR NEXT FINDS',
    detail: 'Free delivery on 4+ products',
    icon: PackageCheck,
    theme: 'pink',
    tag: 'SHOP MORE, SAVE ON DELIVERY',
  },
  {
    eyebrow: 'DELIVERY INFORMATION',
    title: ['Your picks,', 'delivered in 2–3 days.'],
    text: 'Found the perfect gift? Get your order delivered to your doorstep in 2–3 days.',
    button: 'Browse products',
    href: '/shop',
    label: 'DELIVERY MADE SIMPLE',
    detail: 'Estimated delivery: 2–3 days',
    icon: Truck,
    theme: 'lavender',
    tag: 'READY FOR YOUR NEXT ORDER',
  },
]

export default function Hero() {
  const [active, setActive] = useState(0)
  const [rating, setRating] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const slide = slides[active]
  const FeatureIcon = slide.icon

  useEffect(() => {
    const timer = setInterval(() => {
      setActive(current => (current + 1) % slides.length)
    }, 6000)

    return () => clearInterval(timer)
  }, [])

  const move = amount => {
    setActive(current =>
      (current + amount + slides.length) % slides.length
    )
  }

  const submitRating = () => {
    if (rating === 0) return

    try {
      const existingRatings = JSON.parse(
        localStorage.getItem('sSquareCustomerRatings') || '[]'
      )

      existingRatings.push({
        rating,
        date: new Date().toISOString(),
      })

      localStorage.setItem(
        'sSquareCustomerRatings',
        JSON.stringify(existingRatings)
      )

      setSubmitted(true)
    } catch (error) {
      console.error('Could not save rating:', error)
    }
  }

  return (
    <section className={`hero hero-${slide.theme}`}>
      <div className="hero-inner page-container">
        <div className="hero-copy" key={slide.eyebrow}>
          <span className="hero-eyebrow">{slide.eyebrow}</span>

          <h1>
            {slide.title.map(line => (
              <span key={line}>{line}</span>
            ))}
          </h1>

          <p>{slide.text}</p>

          <Link className="button button-primary" to={slide.href}>
            {slide.button}
            <ArrowRight size={18} />
          </Link>

          {active === 0 ? (
            <div className="hero-trust">
              <div className="hero-customer-count">
                <strong>2,000+</strong>
                <span>trusted customers</span>
              </div>

              <div className="hero-rating-info">
                <div
                  className="hero-rating-stars"
                  aria-label="Five-star customer ratings"
                >
                  ★★★★★
                </div>
                <span>1,000+ five-star ratings</span>
              </div>

              <div className="hero-rating-prompt">
                {submitted ? (
                  <p>Thank you for sharing your rating!</p>
                ) : (
                  <>
                    <span>Enjoyed your shopping experience?</span>
                    <strong> Give us your rating</strong>

                    <div
                      className="hero-rating-input"
                      role="group"
                      aria-label="Choose your rating"
                    >
                      {[1, 2, 3, 4, 5].map(value => (
                        <button
                          key={value}
                          type="button"
                          aria-label={`${value} star${value > 1 ? 's' : ''}`}
                          aria-pressed={rating === value}
                          onClick={() => setRating(value)}
                          className={value <= rating ? 'selected' : ''}
                        >
                          <Star
                            size={19}
                            fill={value <= rating ? 'currentColor' : 'none'}
                          />
                        </button>
                      ))}

                      <button
                        type="button"
                        className="hero-rating-submit"
                        onClick={submitRating}
                        disabled={rating === 0}
                      >
                        Submit
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="hero-trust">
              <span>THOUGHTFULLY SELECTED</span>
              <span>Gifts, toys & everyday finds</span>
            </div>
          )}
        </div>

        <div className="hero-art">
          <div className="hero-promo-card">
            <span className="hero-promo-kicker">{slide.tag}</span>

            <div className="hero-promo-icon">
              <FeatureIcon size={34} strokeWidth={1.5} />
            </div>

            <div className="hero-promo-rule" />

            <span className="hero-promo-label">{slide.label}</span>
            <h2>{slide.detail}</h2>

            <Link to={slide.href} className="hero-promo-link">
              Explore now <ArrowRight size={16} />
            </Link>
          </div>

          <span className="hero-art-index">
            0{active + 1} <span>/ 0{slides.length}</span>
          </span>
        </div>
      </div>

      <button
        type="button"
        className="hero-arrow hero-prev"
        aria-label="Previous banner"
        onClick={() => move(-1)}
      >
        <ArrowLeft size={18} />
      </button>

      <button
        type="button"
        className="hero-arrow hero-next"
        aria-label="Next banner"
        onClick={() => move(1)}
      >
        <ArrowRight size={18} />
      </button>

      <div className="hero-dots">
        {slides.map((item, index) => (
          <button
            type="button"
            key={item.eyebrow}
            className={index === active ? 'active' : ''}
            aria-label={`Show banner ${index + 1}`}
            aria-current={index === active ? 'true' : undefined}
            onClick={() => setActive(index)}
          />
        ))}
      </div>
    </section>
  )
}
