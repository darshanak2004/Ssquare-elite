import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { categories } from '../data.js'
import SectionHeading from './SectionHeading.jsx'

export default function CategoryGrid() {
  return <section className="section page-container categories-section">
    <SectionHeading eyebrow="A LITTLE SOMETHING FOR EVERYONE" title="Find your kind of fun" description="Explore little favourites and lovely surprises." />
    <div className="category-grid">{categories.map(category => <Link to={`/category/${category.slug}`} className="category-card" key={category.slug}>
      <div className="category-icon-box"><span>{category.icon}</span><ArrowUpRight size={17} className="category-arrow" /></div>
      <h3>{category.name}</h3><p>{category.description}</p>
    </Link>)}</div>
  </section>
}
