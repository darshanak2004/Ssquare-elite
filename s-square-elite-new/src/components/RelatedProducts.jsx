import { useShop } from '../context/ShopContext.jsx'
import ProductGrid from './ProductGrid.jsx'
import SectionHeading from './SectionHeading.jsx'
export default function RelatedProducts({ product, title = 'More little favourites' }) {
  const { related } = useShop()
  const items = product ? related(product) : []
  return items.length ? <section className="section page-container"><SectionHeading eyebrow="YOU MIGHT ALSO LOVE" title={title} description="A few more lovely finds chosen for you." /><ProductGrid products={items} /></section> : null
}
